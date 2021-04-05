import React, { useCallback } from "react";
import { IBrokerSelectContainer } from "../containers/BrokerSelectContainer";
import { BROKERS } from "../redux/slices/ui";
import { IBrokerTypes } from "../types/types";

// type Props = IBrokerSelectContainer;

export const TimeRangeSelect: React.FunctionComponent = () => {
  return (
    <div style={{ marginBottom: 30 }}>
      <label htmlFor="report-range-end">
        Start date: <input id="report-range-end" type="date" />
      </label>
      <label htmlFor="report-range-end">
        End date: <input id="report-range-end" type="date" />
      </label>
    </div>
  );
};
