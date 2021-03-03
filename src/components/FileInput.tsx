import React from "react";
import { geUsdRatesForDatesRangeInJson } from "../services/bankApis/poland";
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
      const rates = await geUsdRatesForDatesRangeInJson({ endDate, startDate });
      console.log(endDate, startDate, rates);
    }
  };
  return <input type="file" onChange={onChange} />;
};
