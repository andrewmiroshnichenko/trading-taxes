import { GenericDataItem, UnsupportedActivity } from "../../types/types";

export function filterOutUnsupportedActivities(
  item:
    | Partial<GenericDataItem>
    | {
        activityType: UnsupportedActivity;
      }
): item is GenericDataItem {
  return item.activityType !== "UNSUPPORTED_ACTIVITY";
}
