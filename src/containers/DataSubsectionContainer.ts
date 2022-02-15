import { connect, ConnectedProps } from "react-redux";
import { DataSubsection } from "../components/DataSubsection";
import { BROKERS } from "../redux/slices/ui";
import { IRootState } from "../redux/store";

export interface ISubsectionOwnProps {
  datasetProp: keyof IRootState["data"]["parsedData"];
  totalProp: keyof IRootState["data"]["parsedData"];
}

const mapStateToSubsectionProps = (
  { data, ui }: IRootState,
  { totalProp, datasetProp }: ISubsectionOwnProps
) => {
  const dataset = data.parsedData[datasetProp] as string;
  const total = data.parsedData[totalProp] as number;

  const { broker } = ui;
  const isHidden = broker !== BROKERS.EXANTE_ALL && datasetProp === "interests";

  return {
    dataset,
    total,
    isHidden,
  };
};

const connector = connect(mapStateToSubsectionProps);

export type IDataSubsectionContainer = ConnectedProps<typeof connector>;

export const DataSubsectionContainer = connector(DataSubsection);
