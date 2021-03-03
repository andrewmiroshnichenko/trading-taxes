import { isNpbResponse } from "../../typeGuards";
import { Rate } from "../../types";

// http://api.nbp.pl/
const API_STRING = "http://api.nbp.pl/api/exchangerates/rates";

interface RateQueryParameters {
  startDate: string;
  endDate: string;
}

export const geUsdRatesForDatesRangeInJson = async ({
  startDate,
  endDate,
}: RateQueryParameters): Promise<Rate[]> => {
  const data = await fetch(
    `${API_STRING}/a/usd/${startDate}/${endDate}/?format=json`
  );

  const jsonData = await data.json().then((response) => {
    if (isNpbResponse(response)) {
      return response;
    } else {
      throw new Error("NBP response format changed dramatically ");
    }
  });

  return jsonData.rates.map((rate) => ({
    date: rate.effectiveDate,
    value: rate.mid,
    currencyCode: jsonData.code,
  }));
};
