import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { IBrokerSelectContainer } from "../containers/BrokerSelectContainer";
import { BROKERS } from "../redux/slices/ui";
import { IBrokerTypes } from "../types/types";

type Props = IBrokerSelectContainer;

const BROKER_OPTIONS = {
  EXANTE_ALL: {
    label: "Exante.eu - transaction except trades",
    value: BROKERS.EXANTE_ALL,
  },
  EXANTE_TRADES: {
    label: "Exante.eu - trades only",
    value: BROKERS.EXANTE_TRADES,
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
    <div>
      <select value={selectedBroker} onChange={onBrokerTypeChange}>
        {options}
      </select>
      <Link
        to={`/${selectedBroker.toLowerCase()}-details`}
        style={{ marginLeft: 20 }}
      >
        Learn more about required format of {selectedBroker} report
      </Link>
    </div>
  );
};
