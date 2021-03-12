import React, { useCallback, useState } from "react";
import { DownloadLink } from "./components/DownloadLink";
import { FileInput } from "./components/FileInput";
import { ContextInterface } from "./types";
const context: ContextInterface = {
  dividends: "",
  trades: "",
  dividendsTotal: 0,
  tradesTotal: 0,
};
export const DataContext = React.createContext(context);

function App(): JSX.Element {
  const [contextState, setContextState] = useState(context);
  const updateContext = useCallback(
    (newContext: ContextInterface) => {
      setContextState(newContext);
    },
    [setContextState]
  );
  return (
    <DataContext.Provider value={contextState}>
      <FileInput onInput={updateContext} />
      <div>
        <p>Total dividends: {contextState.dividendsTotal}</p>
        <DownloadLink
          fileName="Dividends.csv"
          contextProp="dividends"
          text="Download dividends CSV"
        />
      </div>
      <div>
        <p>Total trades: {contextState.tradesTotal}</p>
        <DownloadLink
          fileName="trades.csv"
          contextProp="trades"
          text="Download trades CSV"
        />
      </div>
    </DataContext.Provider>
  );
}

export default App;
