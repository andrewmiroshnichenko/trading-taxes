import React from "react";
import { IDataSubsectionContainer } from "../containers/DataSubsectionContainer";
import { DownloadLink } from "./DownloadLink";

type Props = IDataSubsectionContainer;

export const DataSubsection: React.FunctionComponent<Props> = ({
  dataset,
  total,
}) => {
  return (
    <div>
      <p>Total dividends: {total}</p>
      <DownloadLink
        fileName="dividends.csv"
        dataset={dataset}
        text="Download dividends CSV"
      />
    </div>
  );
};
