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
    <div className="time-range-select" style={{ marginBottom: 30 }}>
      <label htmlFor="report-range-start">
        <span className="start-date-text">
        Start date:{" "}
        <input
          id="report-range-start"
          type="date"
          onChange={timeUpdateCallback}
          value={startDate}
          name="startDate"
        />
        </span>
      </label>
      <label htmlFor="report-range-end">
        <span className="end-date-text">
        Start date:{" "}
        End date:{" "}
        <input
          id="report-range-end"
          type="date"
          onChange={timeUpdateCallback}
          value={endDate}
          name="endDate"
        />
        </span>
      </label>
    </div>
  );
};
