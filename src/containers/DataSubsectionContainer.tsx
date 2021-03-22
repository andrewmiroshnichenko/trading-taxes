import { connect, ConnectedProps } from "react-redux";
import { DataSubsection } from "../components/DataSubsection";
import { BROKERS } from "../redux/reducers/ui";
import { IRootState } from "../types/redux";

export interface ISubsectionOwnProps {
  datasetProp: string;
  totalProp: string;
}

const mapStateToSubsectionProps = (
  { data, ui }: IRootState,
  { totalProp, datasetProp }: ISubsectionOwnProps
) => {
  const dataset = data[datasetProp] as string;
  const total = data[totalProp] as number;

  const { broker } = ui;
  const isHidden = broker !== BROKERS.EXANTE && datasetProp === "interests";

  return {
    dataset,
    total,
    isHidden,
  };
};

const connector = connect(mapStateToSubsectionProps);

export type IDataSubsectionContainer = ConnectedProps<typeof connector>;

export const DataSubsectionContainer = connector(DataSubsection);
