import {
  transformExanteRow,
  collectExcludedOperations,
} from "../exanteAllToGeneric";

describe("transformExanteRow", () => {
  // This is data structure of Exante csv export as of 01.2022. NOTE: Trades are not included here purposely !!!!
  // TransactionID (not used) | AccountID (not used) | SymbolID (not all types) | ISIN (not used)
  // Type | DateTime | amount | currency | (other non-used fields)
  test("transforms DIVIDEND string with valid values", () => {
    const string = "111,ACC101,BA.NYSE,111,DIVIDEND,21/01/2020,10,USD";
    const output = {
      price: 0,
      tradeDate: "01/21/2020",
      amount: 10,
      currency: "USD",
      quantity: 0,
      symbol: "BA",
      activityType: "DIVIDEND",
    };
    expect(transformExanteRow(string)).toEqual(output);
  });
  test("transforms INTEREST string with valid values, negative sum and amount", () => {
    const string = "111,ACC101,None,None,INTEREST,21/01/2020,10,USD";
    const output = {
      price: 0,
      tradeDate: "01/21/2020",
      amount: 10,
      currency: "USD",
      quantity: 0,
      symbol: "",
      activityType: "INTEREST",
    };
    expect(transformExanteRow(string)).toEqual(output);
  });
  test("transforms COMMISSION string with valid values", () => {
    const string = "111,ACC101,BA.NYSE,None,COMMISSION,21/01/2020,-10,USD";
    const output = {
      price: 0,
      tradeDate: "01/21/2020",
      amount: 10,
      currency: "USD",
      quantity: 0,
      symbol: "BA",
      activityType: "FEE",
    };
    expect(transformExanteRow(string)).toEqual(output);
  });
  test("transforms string with invalid action type", () => {
    const string = "111,ACC101,BA.NYSE,None,TRADE,21/01/2020,-10,USD";

    expect(transformExanteRow(string).activityType).toBe(
      "UNSUPPORTED_ACTIVITY"
    );
  });
});

describe("collectExcludedOperations", () => {
  it("picks activities, which aren't listened as validActivityTypes ", () => {
    const incomingStrings = [
      "111,ACC101,BA.NYSE,None,DIVIDEND,otherInfo",
      "111,ACC101,BA.NYSE,None,FUNDING/WITHDRAWAL,otherInfo",
      "111,ACC101,BA.NYSE,None,TRADE,otherInfo",
      "111,ACC101,BA.NYSE,None,AUTOCONVERSION,otherInfo",
      "111,ACC101,BA.NYSE,None,ROLLOVER,otherInfo",
      "111,ACC101,BA.NYSE,None,TAX,otherInfo",
      "111,ACC101,BA.NYSE,None,SUBACCOUNT TRANSFER,otherInfo",
      "111,ACC101,BA.NYSE,None,BANK CHARGE,otherInfo",
      "111,ACC101,BA.NYSE,None,COMMISSION,otherInfo",
    ];

    expect(collectExcludedOperations(incomingStrings)).toEqual([
      "FUNDING/WITHDRAWAL",
      "AUTOCONVERSION",
      "SUBACCOUNT TRANSFER",
      "BANK CHARGE",
    ]);
  });
});
