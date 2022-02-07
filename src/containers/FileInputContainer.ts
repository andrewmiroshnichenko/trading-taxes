import { connect, ConnectedProps } from "react-redux";
import { FileInput } from "../components/FileInput";
import { updateData } from "../redux/slices/data";
import { BROKERS } from "../redux/slices/ui";
import { transformRevolutCsvToGeneric } from "../services/transformers/revoluteToGeneric";
import { transformExanteCsvToGeneric } from "../services/transformers/exanteAllToGeneric";
import { transformExanteTradesCsvToGeneric } from "../services/transformers/exanteTradesToGeneric";

import { IBrokerTypes } from "../types/types";
import { IRootState } from "../redux/store";

const mapBrokerToTransformFunction = (broker: IBrokerTypes) => {
  if (broker === BROKERS.EXANTE_ALL) {
    return transformExanteCsvToGeneric;
  }

  if (broker === BROKERS.EXANTE_TRADES) {
    return transformExanteTradesCsvToGeneric;
  }

  return transformRevolutCsvToGeneric;
};

const mapStateToFileInputProps = ({ ui, data }: IRootState) => {
  const { broker } = ui;
  const { startDate, endDate } = data;

  const csvTransformationFunction = mapBrokerToTransformFunction(broker);

  return {
    csvTransformationFunction,
    customStartDate: startDate,
    customEndDate: endDate,
  };
};

const connector = connect(mapStateToFileInputProps, { updateData });

export type IFileInputContainer = ConnectedProps<typeof connector>;

export const FileInputContainer = connector(FileInput);
