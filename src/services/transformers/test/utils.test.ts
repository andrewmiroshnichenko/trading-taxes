import { GenericDataItem, UnsupportedActivity } from "../../../types/types";
import {
  filterOutUnsupportedActivities,
  filterOnlyStringsWithDates,
} from "../utils";

describe("filterOnlyStringsWithDates", () => {
  it("leaves only strings which start with numbers", () => {
    expect(["123", "", "daf"].filter(filterOnlyStringsWithDates)).toEqual([
      "123",
    ]);
  });
});

describe("filterOutUnsupportedActivities", () => {
  it("leaves only strings which start with numbers", () => {
    const activitiesCollection: (
      | Partial<GenericDataItem>
      | { activityType: UnsupportedActivity }
    )[] = [
      { activityType: "SELL" },
      { activityType: "DIVIDEND" },
      { activityType: "UNSUPPORTED_ACTIVITY" },
    ];

    expect(activitiesCollection.filter(filterOutUnsupportedActivities)).toEqual(
      [{ activityType: "SELL" }, { activityType: "DIVIDEND" }]
    );
  });
});
