import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { IBrokerSelectContainer } from "../containers/BrokerSelectContainer";
import { BROKERS } from "../redux/slices/ui";
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
  updateBroker,
}) => {
  const onBrokerTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateBroker(event.target.value as IBrokerTypes);
    },
    [updateBroker]
  );

  return (
    <span className="broker-select-tile">
      <select className="broker-select" value={selectedBroker} onChange={onBrokerTypeChange}>
        {options}
      </select>
      <span className="selected-broker-info-link">
        <Link
          to={`/${selectedBroker.toLowerCase()}-details`}
          style={{ marginLeft: 20 }}
        >
          {selectedBroker} format ?
      </Link>
      </span>
    </span>
  );
};
