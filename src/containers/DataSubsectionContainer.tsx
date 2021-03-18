import { connect, ConnectedProps } from "react-redux";
import { DataSubsection } from "../components/DataSubsection";
import { IRootState } from "../types/redux";

export interface ISubsectionOwnProps {
  datasetProp: string;
  totalProp: string;
}

const mapStateToSubsectionProps = (
  { data }: IRootState,
  { totalProp, datasetProp }: ISubsectionOwnProps
) => {
  const dataset = data[datasetProp] as string;
  const total = data[totalProp] as number;

  return {
    dataset,
    total,
  };
};

const connector = connect(mapStateToSubsectionProps);

export type IDataSubsectionContainer = ConnectedProps<typeof connector>;

export const DataSubsectionContainer = connector(DataSubsection);
