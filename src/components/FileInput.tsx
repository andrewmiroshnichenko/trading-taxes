import React from "react";
import { geUsdRatesForDatesRangeInJson } from "../services/bankApis/poland";
import { buildRatesMap } from "../services/buildRatesMap";
import { getFileContents } from "../services/fileParser";
import { getTimeRange } from "../services/getTimeRange";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";

export const FileInput: React.FunctionComponent = () => {
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (file) {
      const text = await getFileContents(file);
      const genericData = transformRevolutCsvToGeneric(text);
      const { endDate, startDate } = getTimeRange(genericData);
      const rates = await geUsdRatesForDatesRangeInJson({ endDate, startDate }); // TODO test this on a time range > 1year (400 will be returned by NBP API)
      const ratesMap = buildRatesMap(rates);

      console.log(endDate, startDate, rates, ratesMap);
    }
  };
  return <input type="file" onChange={onChange} />;
};
