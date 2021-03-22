import { connect, ConnectedProps } from "react-redux";
import { FileInput } from "../components/FileInput";
import { updateDataStore } from "../redux/actionCreators/dataActions";
import { BROKERS } from "../redux/reducers/ui";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";
import { IBrokerTypes } from "../types/types";
import { IRootState } from "../types/redux";

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

const connector = connect(mapStateToFileInputProps, { updateDataStore });

export type IFileInputContainer = ConnectedProps<typeof connector>;

export const FileInputContainer = connector(FileInput);
