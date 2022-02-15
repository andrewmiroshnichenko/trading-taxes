import {
  transformExanteRow,
  collectExcludedOperations,
} from "../exanteTradesToGeneric";

describe("transformExanteTradeRow", () => {
  // This is data structure of Exante trades csv export as of 01.2022. NOTE: All other operations are derived from other report!
  // DateTime | AccountID (not used) | Side(transaction type) | Symbol ID | ISIN (not used) | Type(type of security, not used)
  // Price | Currency | Quantity (of shares) | Commission | Commission Currency (not used) | P&L (not used) | Amount | Other fields
  test("transforms BUY trade string with valid values", () => {
    const string =
      "2018-12-19 16:02:15,ACC101,buy,BA.NYSE,US98421M1062,STOCK,10,USD,2,0.2,USD,2,20,other";
    const output = {
      price: -10,
      tradeDate: "12/19/2018",
      amount: -20,
      currency: "USD",
      quantity: 2,
      symbol: "BA",
      activityType: "BUY",
    };
    expect(transformExanteRow(string)).toEqual(output);
  });
  test("transforms SELL trade string with valid values", () => {
    const string =
      "2018-12-19 16:02:15,ACC101,sell,BA.NYSE,US98421M1062,STOCK,10,USD,2,0.2,USD,2,20,other";
    const output = {
      price: 10,
      tradeDate: "12/19/2018",
      amount: 20,
      currency: "USD",
      quantity: 2,
      symbol: "BA",
      activityType: "SELL",
    };
    expect(transformExanteRow(string)).toEqual(output);
  });
  test("transforms string with invalid action type", () => {
    const string =
      "2018-12-19 16:02:15,ACC101,dividend,BA.NYSE,US98421M1062,STOCK,10,USD,2,0.2,USD,2,20,other";

    expect(transformExanteRow(string).activityType).toBe(
      "UNSUPPORTED_ACTIVITY"
    );
  });
});

describe("collectExcludedOperations", () => {
  it("picks activities, which aren't listened as validActivityTypes ", () => {
    const incomingStrings = [
      "2018-12-19 16:02:15,ACC101,buy,BA.NYSE",
      "2018-12-19 16:02:15,ACC101,sell,BA.NYSE",
      "2018-12-19 16:02:15,ACC101,dividend,BA.NYSE",
      "2018-12-19 16:02:15,ACC101,spell,BA.NYSE",
      "2018-12-19 16:02:15,ACC101,buy,BA.NYSE",
    ];

    expect(collectExcludedOperations(incomingStrings)).toEqual([
      "dividend",
      "spell",
    ]);
  });
});
