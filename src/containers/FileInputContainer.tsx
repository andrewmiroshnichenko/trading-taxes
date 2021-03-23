import { connect, ConnectedProps } from "react-redux";
import { FileInput } from "../components/FileInput";
import { updateData } from "../redux/slices/data";
import { BROKERS } from "../redux/slices/ui";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";
import { IBrokerTypes } from "../types/types";
import { IRootState } from "../redux/store";

const mapBrokerToTransformFunction = (broker: IBrokerTypes) => {
  if (broker === BROKERS.EXANTE) {
    return transformRevolutCsvToGeneric;
  }

  return transformRevolutCsvToGeneric;
};

const mapStateToFileInputProps = ({ ui }: IRootState) => {
  const { broker } = ui;

  const csvTransformationFunction = mapBrokerToTransformFunction(broker);

  return {
    csvTransformationFunction,
  };
};

const connector = connect(mapStateToFileInputProps, { updateData });

export type IFileInputContainer = ConnectedProps<typeof connector>;

export const FileInputContainer = connector(FileInput);
