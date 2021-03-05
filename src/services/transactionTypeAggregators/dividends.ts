import { DividendsWithSum, ExtendedGenericDataItemWithPln } from "../../types";
import { revolutDividendActivities } from "../transformers/revoluteToGeneric";

export const getDividendsWithTotalSum = (
  allData: ExtendedGenericDataItemWithPln[]
): DividendsWithSum =>
  allData
    .filter((item) => revolutDividendActivities.has(item.activityType))
    .reduce(
      (acc, item, index, array) => {
        // Decision about type of aggregation field
        const key =
          item.activityType === "DIV" ? "totalDividendsPln" : "totalTaxesPln";

        return {
          ...acc,
          dividendRows: array,
          [key]: acc[key] + item.pricePln,
        };
      },
      {
        dividendRows: [],
        totalDividendsPln: 0,
        totalTaxesPln: 0,
      } as DividendsWithSum
    );
