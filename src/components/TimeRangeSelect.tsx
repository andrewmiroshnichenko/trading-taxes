import React, { ChangeEvent, useCallback } from "react";
import { ITimeRangeSelectContainer } from "../containers/TimeRangeSelectContainer";

type Props = ITimeRangeSelectContainer;

export const TimeRangeSelect: React.FunctionComponent<Props> = ({
  endDate,
  startDate,
  updateRange,
}) => {
  const timeUpdateCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const prevValue = { startDate, endDate };
      updateRange({ ...prevValue, [e.target.name]: e.target.value });
    },
    [startDate, endDate, updateRange]
  );

  return (
    <div style={{ marginBottom: 30 }}>
      <label htmlFor="report-range-end">
        Start date:{" "}
        <input
          id="report-range-end"
          type="date"
          onChange={timeUpdateCallback}
          value={startDate}
          name="startDate"
        />
      </label>
      <label htmlFor="report-range-end">
        End date:{" "}
        <input
          id="report-range-end"
          type="date"
          onChange={timeUpdateCallback}
          value={endDate}
          name="endDate"
        />
      </label>
    </div>
  );
};
