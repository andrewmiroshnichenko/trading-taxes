import { connect, ConnectedProps } from "react-redux";
import { TimeRangeSelect } from "../components/TimeRangeSelect";
import { IRootState } from "../redux/store";
import { updateRange } from "../redux/slices/data";

const mapStateToTimeRangeSelectProps = ({ data }: IRootState) => {
  const { startDate, endDate } = data;

  return {
    startDate,
    endDate,
  };
};

const connector = connect(mapStateToTimeRangeSelectProps, { updateRange });

export type ITimeRangeSelectContainer = ConnectedProps<typeof connector>;

export const TimeRangeSelectContainer = connector(TimeRangeSelect);
