import { isNpbResponse } from "../../typeGuards";
import { ITimeRange, NbpResponse, Rate } from "../../types";

// http://api.nbp.pl/
const API_STRING = "https://api.nbp.pl/api/exchangerates/rates";

export const geUsdRatesForDatesRangeInJson = async (
  ranges: ITimeRange[]
): Promise<Rate[]> => {
  const queryPromises = ranges.map(({ startDate, endDate }) =>
    fetch(`${API_STRING}/a/usd/${startDate}/${endDate}/?format=json`)
  );
  const queryData = (await Promise.all(queryPromises)).map((promise) =>
    promise.json()
  );
  const rawRateRanges = await Promise.all(queryData);

  const jsonData = rawRateRanges
    // Type guard
    .map((rateRange) => {
      if (isNpbResponse(rateRange)) {
        return rateRange;
      } else {
        throw new Error("NBP response format changed dramatically ");
      }
    })
    .reduce((acc, range) => {
      if (!range) {
        return acc;
      }

      acc.code = range.code; // TODO this isn't very smart
      acc.rates = (acc.rates || []).concat(range.rates);

      return acc;
    }, {} as NbpResponse);

  return jsonData.rates.map((rate) => ({
    date: rate.effectiveDate,
    value: rate.mid,
    currencyCode: jsonData.code,
  }));
};
