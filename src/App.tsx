import React, { useCallback, useState } from "react";
import { FileInput } from "./components/FileInput";
import { ContextInterface } from "./types";
const context: ContextInterface = {
  dividends: {
    dividendRows: [],
    totalDividendsPln: 0,
    totalTaxesPln: 0,
  },
  trades: {
    tradesRows: [],
    totalTradesProfitPln: 0,
  },
};
const DataContext = React.createContext(context);

function App(): JSX.Element {
  const [contextState, setContextState] = useState(context);
  const updateContext = useCallback(
    (newContext: ContextInterface) => {
      setContextState(newContext);
      console.log("newContext", newContext);
    },
    [setContextState]
  );
  return (
    <DataContext.Provider value={contextState}>
      <FileInput onInput={updateContext} />
      <a download>Download dividends CSV</a>
      <a download>Download trades CSV</a>
    </DataContext.Provider>
  );
}

export default App;
