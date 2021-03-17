import React, { useState } from "react";
import { IFileInputContainer } from "../containers/FileInputContainer";
import { geUsdRatesForDatesRangeInJson } from "../services/bankApis/poland";
import { buildRatesMap } from "../services/buildRatesMap";
import { extendGenericDataWithPln } from "../services/extendGenericDataWithPln";
import { getFileContents } from "../services/fileParser";
import { getTimeRange, splitTimeRangeIfNecessary } from "../services/time";
import {
  getDividendsWithTotalSum,
  prepareDividendToCsv,
} from "../services/transactionTypeAggregators/dividends";
import {
  getTradesWithTotalSum,
  prepareTradesToCsv,
} from "../services/transactionTypeAggregators/trades";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";

type Props = IFileInputContainer;

export const FileInput: React.FunctionComponent<Props> = ({
  updateDataStore,
}) => {
  const [excludedOperations, setExcludedOperations] = useState<string[]>([]);
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (file) {
      const text = await getFileContents(file);
      const { items, excludedOperations } = transformRevolutCsvToGeneric(text);
      const { endDate, startDate } = getTimeRange(items);
      const yearLongTimeRanges = splitTimeRangeIfNecessary({
        endDate,
        startDate,
      });
      const rates = await geUsdRatesForDatesRangeInJson(yearLongTimeRanges);
      const ratesMap = buildRatesMap(rates);
      const genericDataWithPlns = extendGenericDataWithPln(items, ratesMap);

      const dividendsWithSum = getDividendsWithTotalSum(genericDataWithPlns);
      const tradesWithSum = getTradesWithTotalSum(genericDataWithPlns);
      const dividends = prepareDividendToCsv(dividendsWithSum.dividendRows);
      const trades = prepareTradesToCsv(tradesWithSum.tradesRows);

      updateDataStore({
        dividends,
        trades,
        tradesTotal: tradesWithSum.totalTradesProfitPln,
        dividendsTotal: dividendsWithSum.totalDividendsPln,
      });
      setExcludedOperations(excludedOperations);
    }
  };

  return (
    <>
      <label htmlFor="main-file-input">
        Drop file, or chose one by clicking here
      </label>
      <div>
        <input type="file" id="main-file-input" onChange={onChange} />
      </div>
      {excludedOperations.length ? (
        <p>Excluded operations: {excludedOperations.join(", ")}</p>
      ) : null}
    </>
  );
};
