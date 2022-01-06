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

export const filterOnlyStringsWithDates = (item: string) =>
  !isNaN(parseInt(item, 10));

export const itemsFromTextString = (text: string): string[] =>
  text.split("\n").filter(filterOnlyStringsWithDates);
