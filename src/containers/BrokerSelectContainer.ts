import { connect, ConnectedProps } from "react-redux";
import { BrokerSelect } from "../components/BrokerSelect";
import { IRootState } from "../types/redux";
import { updateBrokerType } from "../redux/actionCreators/uiActions";

const mapStateToBrokerSelectProps = ({ ui }: IRootState) => {
  const { broker } = ui;

  return {
    selectedBroker: broker,
  };
};

const connector = connect(mapStateToBrokerSelectProps, { updateBrokerType });

export type IBrokerSelectContainer = ConnectedProps<typeof connector>;

export const BrokerSelectContainer = connector(BrokerSelect);
