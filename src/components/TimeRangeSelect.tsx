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
    <div className="steps-dates-row">

      <div className="info-steps">
        <div className="info-step-1">
          <div className="info-step-1-1">1</div>
          <div className="info-step-1-text">Enter date</div>
        </div>
        <div className="info-step-2">
          <div className="info-step-2-2">2</div>
          <div className="info-step-2-text">Drop Doc</div>
        </div>
        <div className="info-step-3">
          <div className="info-step-3-3">3</div>
          <div className="info-step-3-text">Results</div>
        </div>
      </div>
      <div className="time-range-tile">
        <label htmlFor="report-range-end">
          <div className="start-date-container">
            <div className="start-date-text">
              Start date:
            </div>
            <div className="start-date-input">
              {" "}
              <input
                id="report-range-end"
                type="date"
                onChange={timeUpdateCallback}
                value={startDate}
                name="startDate"
              />
            </div>
          </div>
        </label>
        <label htmlFor="report-range-end">
          <div className="end-date-container">
            <div className="end-date-text">
              End date:
          </div>
            {" "}
            <input
              id="report-range-end"
              type="date"
              onChange={timeUpdateCallback}
              value={endDate}
              name="endDate"
            />
          </div>
        </label>
    </div>
    </div >
  );
};
