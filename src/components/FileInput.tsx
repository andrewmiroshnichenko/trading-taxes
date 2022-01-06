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
  getFeesWithTotalSum,
  prepareFeeToCsv,
} from "../services/transactionTypeAggregators/fees";
import {
  getTradesWithTotalSum,
  prepareTradesToCsv,
} from "../services/transactionTypeAggregators/trades";

type Props = IFileInputContainer;

export const FileInput: React.FunctionComponent<Props> = ({
  updateData,
  customEndDate,
  customStartDate,
  csvTransformationFunction,
}) => {
  const [excludedOperations, setExcludedOperations] = useState<string[]>([]);
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (file) {
      const now = Date.now();
      const text = await getFileContents(file);
      const { items, excludedOperations } = csvTransformationFunction(text);
      const { endDate, startDate } = getTimeRange(items);
      const yearLongTimeRanges = splitTimeRangeIfNecessary({
        endDate,
        startDate,
      });
      const rates = await geUsdRatesForDatesRangeInJson(yearLongTimeRanges);
      const ratesMap = buildRatesMap(rates);
      const genericDataWithPlns = extendGenericDataWithPln(items, ratesMap);

      // TODO merge this data retrieval into one function, in the shape of reduce
      const dividendsWithSum = getDividendsWithTotalSum(genericDataWithPlns);
      const tradesWithSum = getTradesWithTotalSum(
        genericDataWithPlns,
        customStartDate,
        customEndDate
      );
      const feesWithSum = getFeesWithTotalSum(genericDataWithPlns);
      const dividends = prepareDividendToCsv(dividendsWithSum.dividendRows);
      const trades = prepareTradesToCsv(tradesWithSum.tradesRows);
      const fees = prepareFeeToCsv(feesWithSum.feeRows);

      console.log(Date.now() - now);

      updateData({
        dividends,
        trades,
        fees,
        tradesTotal: tradesWithSum.totalTradesProfitPln,
        dividendsTotal: dividendsWithSum.totalDividendsPln,
        feesTotal: feesWithSum.totalFeesPln,
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
