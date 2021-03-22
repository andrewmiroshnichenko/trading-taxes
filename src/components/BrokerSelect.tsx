import React, { useCallback } from "react";
import { IBrokerSelectContainer } from "../containers/BrokerSelectContainer";
import { BROKERS } from "../redux/reducers/ui";
import { IBrokerTypes } from "../types/types";

type Props = IBrokerSelectContainer;

const BROKER_OPTIONS = {
  EXANTE: {
    label: "Exante.eu",
    value: BROKERS.EXANTE,
  },
  REVOLUT: {
    label: "Revolut",
    value: BROKERS.REVOLUT,
  },
};

const options = Object.values(BROKER_OPTIONS).map(({ label, value }) => (
  <option key={value} label={label} value={value} />
));

export const BrokerSelect: React.FunctionComponent<Props> = ({
  selectedBroker,
  updateBrokerType,
}) => {
  const onBrokerTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateBrokerType(event.target.value as IBrokerTypes);
    },
    [updateBrokerType]
  );

  return (
    <select value={selectedBroker} onChange={onBrokerTypeChange}>
      {options}
    </select>
  );
};
