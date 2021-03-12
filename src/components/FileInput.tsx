import React from "react";
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
import { ContextInterface } from "../types";

interface Props {
  onInput: (context: ContextInterface) => void;
}

export const FileInput: React.FunctionComponent<Props> = ({ onInput }) => {
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

      onInput({
        dividends,
        trades,
      });
    }
  };
  return (
    <>
      <input type="file" onChange={onChange} />
    </>
  );
};
