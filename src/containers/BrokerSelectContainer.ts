import { connect, ConnectedProps } from "react-redux";
import { BrokerSelect } from "../components/BrokerSelect";
import { IRootState } from "../redux/store";
import { updateBroker } from "../redux/slices/ui";

const mapStateToBrokerSelectProps = ({ ui }: IRootState) => {
  const { broker } = ui;

  return {
    selectedBroker: broker,
  };
};

const connector = connect(mapStateToBrokerSelectProps, { updateBroker });

export type IBrokerSelectContainer = ConnectedProps<typeof connector>;

export const BrokerSelectContainer = connector(BrokerSelect);
