import React from "react";
import { DownloadLink } from "./components/DownloadLink";
import { DataSubsectionContainer } from "./containers/DataSubsectionContainer";
import { FileInputContainer } from "./containers/FileInputContainer";

function App(): JSX.Element {
  return (
    <>
      <FileInputContainer />
      <DataSubsectionContainer datasetProp="trades" totalProp="tradesTotal" />
      <DataSubsectionContainer
        datasetProp="dividends"
        totalProp="dividendsTotal"
      />
    </>
  );
}

export default App;
