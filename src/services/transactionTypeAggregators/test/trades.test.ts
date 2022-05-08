import { filterByTimeRange, doTradeCalculation } from "../trades";

import { TradeFieldsRequiredForCalculation } from "../../../types/types";

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
  describe("will calculate zero profit", () => {
    it("based on one transaction", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 3, quantity: 1 },
      ];

      expect(
        testArrForCalculations.map(doTradeCalculation())[0]
      ).toHaveProperty("dealProfitPln", 0);
    });
    it("based on transactions for different symbols", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "TSLA", pricePln: 3, quantity: 1 },
        { symbol: "MMM", pricePln: -3, quantity: 1 },
      ];

      testArrForCalculations.map(doTradeCalculation()).forEach((item) => {
        expect(item).toHaveProperty("dealProfitPln", 0);
      });
    });
    it("based on transactions for same symbol and same transaction sign", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "BA", pricePln: 2, quantity: 2 },
        { symbol: "BA", pricePln: 2, quantity: 4 },
      ];

      testArrForCalculations.map(doTradeCalculation()).forEach((item) => {
        expect(item).toHaveProperty("dealProfitPln", 0);
      });
    });
  });

  describe("will calculate profit", () => {
    it("based on first sell", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 4, quantity: 1 },
        { symbol: "BA", pricePln: -3, quantity: 1 },
      ];

      expect(
        testArrForCalculations.map(doTradeCalculation())[0]
      ).toHaveProperty("dealProfitPln", 0); // first transaction don't have profit on its own, see test case above

      expect(
        testArrForCalculations.map(doTradeCalculation())[1]
      ).toHaveProperty("dealProfitPln", 1);
    });

    it("based on first buy", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: -4, quantity: 1 },
        { symbol: "BA", pricePln: 3, quantity: 1 },
      ];

      expect(
        testArrForCalculations.map(doTradeCalculation())[1]
      ).toHaveProperty("dealProfitPln", -1);
    });

    it("based on several buys and one sell ", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: -4, quantity: 1 },
        { symbol: "BA", pricePln: -5, quantity: 2 },
        { symbol: "BA", pricePln: -3, quantity: 1 },
        { symbol: "BA", pricePln: -2, quantity: 1 },
        { symbol: "BA", pricePln: 5, quantity: 4 },
      ];
      testArrForCalculations
        .map(doTradeCalculation())
        .filter((item, i) => i !== 4)
        .forEach((item) => {
          // all transactions except last sell are zero-profit
          expect(item).toHaveProperty("dealProfitPln", 0);
        });
      expect(
        // We want to check that sell generated profit
        testArrForCalculations.map(doTradeCalculation())[4]
      ).toHaveProperty("dealProfitPln", 3);
    });

    it("based on several sells and one buy ", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 4, quantity: 1 },
        { symbol: "BA", pricePln: 5, quantity: 2 },
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "BA", pricePln: 2, quantity: 1 },
        { symbol: "BA", pricePln: -5, quantity: 4 },
      ];
      testArrForCalculations
        .map(doTradeCalculation())
        .filter((item, i) => i !== 4)
        .forEach((item) => {
          // all transactions except last sell are zero-profit
          expect(item).toHaveProperty("dealProfitPln", 0);
        });
      expect(
        // We want to check that sell generated profit
        testArrForCalculations.map(doTradeCalculation())[4]
      ).toHaveProperty("dealProfitPln", -3);
    });

    it("based on several sells and one buy ", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 4, quantity: 1 },
        { symbol: "BA", pricePln: 5, quantity: 2 },
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "BA", pricePln: 2, quantity: 1 },
        { symbol: "BA", pricePln: -5, quantity: 4 },
      ];
      testArrForCalculations
        .map(doTradeCalculation())
        .filter((item, i) => i !== 4)
        .forEach((item) => {
          // all transactions except last sell are zero-profit
          expect(item).toHaveProperty("dealProfitPln", 0);
        });
      expect(
        // We want to check that buy generated profit
        testArrForCalculations.map(doTradeCalculation())[4]
      ).toHaveProperty("dealProfitPln", -3);
    });

    it("based on several sells and several buys, FIFO is used to compare prices!", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 4, quantity: 1 },
        { symbol: "BA", pricePln: -5, quantity: 2 },
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "BA", pricePln: 2, quantity: 1 },
        { symbol: "BA", pricePln: -5, quantity: 4 },
        { symbol: "BA", pricePln: 3, quantity: 2 },
      ];
      const expectedProfits = [0, -1, -2, 0, -3, -4];
      expect(
        testArrForCalculations
          .map(doTradeCalculation())
          .map(({ dealProfitPln }) => dealProfitPln)
      ).toEqual(expectedProfits);
    });

    it("based on several sells and several buys on different symbols", () => {
      const testArrForCalculations: TradeFieldsRequiredForCalculation[] = [
        { symbol: "BA", pricePln: 4, quantity: 1 },
        { symbol: "MMM", pricePln: -5, quantity: 2 },
        { symbol: "BA", pricePln: 3, quantity: 1 },
        { symbol: "MMM", pricePln: 2, quantity: 1 },
        { symbol: "MMM", pricePln: -5, quantity: 4 },
        { symbol: "MMM", pricePln: 3, quantity: 2 },
        { symbol: "BA", pricePln: -3, quantity: 1 },
        { symbol: "MMM", pricePln: 4, quantity: 1 },
      ];
      const expectedProfits = [0, 0, 0, -3, 0, -4, 1, -1];
      expect(
        testArrForCalculations
          .map(doTradeCalculation())
          .map(({ dealProfitPln }) => dealProfitPln)
      ).toEqual(expectedProfits);
    });
  });
});
