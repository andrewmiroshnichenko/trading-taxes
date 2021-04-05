import React from "react";
import { BrokerSelectContainer } from "./containers/BrokerSelectContainer";
import { DataSubsectionContainer } from "./containers/DataSubsectionContainer";
import { FileInputContainer } from "./containers/FileInputContainer";
import { TimeRangeSelect } from "./components/TimeRangeSelect";

function App(): JSX.Element {
  return (
    <>
      <TimeRangeSelect />
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
