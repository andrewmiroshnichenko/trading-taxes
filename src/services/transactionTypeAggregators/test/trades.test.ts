import { filterByTimeRange } from "../trades";

const testArr: { tradeDate: string }[] = [
  { tradeDate: "12/20/2021" },
  { tradeDate: "12/21/2021" },
  { tradeDate: "12/22/2021" },
  { tradeDate: "12/23/2021" },
  { tradeDate: "12/24/2021" },
];

const startDate = "12/21/2021";
const endDate = "12/23/2021";

describe("filterByTimeRange", () => {
  it("filter dates by start date", () => {
    expect(testArr.filter(filterByTimeRange(undefined, endDate))).toEqual([
      testArr[0],
      testArr[1],
      testArr[2],
    ]);
  });
  it("filters dates by end date", () => {
    expect(testArr.filter(filterByTimeRange(startDate))).toEqual([
      testArr[2],
      testArr[3],
      testArr[4],
    ]);
  });
  it("filters dates by both start and end dates", () => {
    expect(testArr.filter(filterByTimeRange(startDate, endDate))).toEqual([
      testArr[2],
    ]);
  });
  it("does not filter without parameters", () => {
    expect(testArr.filter(filterByTimeRange())).toEqual(testArr);
  });
});
