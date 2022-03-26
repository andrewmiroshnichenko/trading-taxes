import { filterByTimeRange, doTradeCalculation } from "../trades";

const testArrForDatesFiltration: { tradeDate: string }[] = [
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
    expect(
      testArrForDatesFiltration.filter(filterByTimeRange(undefined, endDate))
    ).toEqual([
      testArrForDatesFiltration[0],
      testArrForDatesFiltration[1],
      testArrForDatesFiltration[2],
    ]);
  });
  it("filters dates by end date", () => {
    expect(
      testArrForDatesFiltration.filter(filterByTimeRange(startDate))
    ).toEqual([
      testArrForDatesFiltration[2],
      testArrForDatesFiltration[3],
      testArrForDatesFiltration[4],
    ]);
  });
  it("filters dates by both start and end dates", () => {
    expect(
      testArrForDatesFiltration.filter(filterByTimeRange(startDate, endDate))
    ).toEqual([testArrForDatesFiltration[2]]);
  });
  it("does not filter without parameters", () => {
    expect(testArrForDatesFiltration.filter(filterByTimeRange())).toEqual(
      testArrForDatesFiltration
    );
  });
});

describe("doTradeCalculation", () => {
  it("filter dates by start date", () => {
    const testArrForCalculations: {
      symbol: string;
      pricePln: number;
      quantity: number;
    }[] = [
      { symbol: "BA", pricePln: 3, quantity: 1 },
      // { symbol: "BA", pricePln: 3, quantity: 1 },
      // { symbol: "BA", pricePln: 3, quantity: 1 },
      // { symbol: "BA", pricePln: 3, quantity: 1 },
      // { symbol: "BA", pricePln: 3, quantity: 1 },
    ];

    expect(testArrForCalculations.map(doTradeCalculation())[0]).toHaveProperty(
      "dealProfitPln",
      0
    );
  });
});
