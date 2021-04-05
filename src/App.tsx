import React from "react";
import { BrokerSelectContainer } from "./containers/BrokerSelectContainer";
import { DataSubsectionContainer } from "./containers/DataSubsectionContainer";
import { FileInputContainer } from "./containers/FileInputContainer";

function App(): JSX.Element {
  return (
    <>
      <BrokerSelectContainer />
      <FileInputContainer />
      <DataSubsectionContainer datasetProp="trades" totalProp="tradesTotal" />
      <DataSubsectionContainer
        datasetProp="dividends"
        totalProp="dividendsTotal"
      />
      <DataSubsectionContainer datasetProp="fees" totalProp="feesTotal" />
    </>
  );
}

export default App;
