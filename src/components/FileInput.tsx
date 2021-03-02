import React from "react";
import { getFileContents } from "../services/fileParser";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";

export const FileInput: React.FunctionComponent = () => {
  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (file) {
      const text = await getFileContents(file);
      console.log(transformRevolutCsvToGeneric(text));
    }
  };
  return <input type="file" onChange={onChange} />;
};
