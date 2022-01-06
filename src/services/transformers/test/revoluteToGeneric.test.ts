import {
  transformRevolutRow,
  collectExcludedOperations,
} from "../revoluteToGeneric";

describe("transformRevolutRow", () => {
  // This is data structure of Revolut csv export as of 01.2022
  // date | symbol ((SELL/BUY/DIVIDEND) | type | quantity (number of shares, SELL/BUY) | price (BUY/SELL) | amount | currency
  test("transforms SELL string with valid values", () => {
    const string = "21/01/2020 10:10:10,BA,SELL,2,100.5,201,USD";
    const output = {
      price: 100.5,
      tradeDate: "01/21/2020",
      amount: 201,
      currency: "USD",
      quantity: 2,
      symbol: "BA",
      activityType: "SELL",
    };
    expect(transformRevolutRow(string)).toEqual(output);
  });
  test("transforms BUY string with valid values, negative sum and amount", () => {
    const string = "21/01/2020 10:10:10,BA,BUY,2,100.5,201,USD";
    const output = {
      price: -100.5,
      tradeDate: "01/21/2020",
      amount: -201,
      currency: "USD",
      quantity: 2,
      symbol: "BA",
      activityType: "BUY",
    };
    expect(transformRevolutRow(string)).toEqual(output);
  });
  test("transforms DIVIDEND string with valid values", () => {
    const string = "21/01/2020 10:10:10,BA,DIVIDEND,,,15,USD";
    const output = {
      price: 0,
      tradeDate: "01/21/2020",
      amount: 15,
      currency: "USD",
      quantity: 0,
      symbol: "BA",
      activityType: "DIVIDEND",
    };
    expect(transformRevolutRow(string)).toEqual(output);
  });
  test("transforms string with invalid action type", () => {
    const string = "21/01/2020 10:10:10,BA,INVALID,,,15,USD";

    expect(transformRevolutRow(string).activityType).toBe(
      "UNSUPPORTED_ACTIVITY"
    );
  });
});

describe("collectExcludedOperations", () => {
  it("picks activities, which aren't listened as validActivityTypes ", () => {
    const incomingStrings = [
      "13,BA,BUY,otherInfo",
      "13,BA,UNKNOWN,otherInfo",
      "13,BA,CUSTODY_FEE,otherInfo",
      "13,BA,SOME_ACTIVITY,otherInfo",
    ];

    expect(collectExcludedOperations(incomingStrings)).toEqual([
      "UNKNOWN",
      "SOME_ACTIVITY",
    ]);
  });
});
