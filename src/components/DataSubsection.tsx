import React from "react";
import {
  IDataSubsectionContainer,
  ISubsectionOwnProps,
} from "../containers/DataSubsectionContainer";
import { DownloadLink } from "./DownloadLink";

type Props = IDataSubsectionContainer & ISubsectionOwnProps;

export const DataSubsection: React.FunctionComponent<Props> = ({
  dataset,
  total,
  datasetProp,
  isHidden,
}) => {
  return isHidden ? null : (
    <div>
      <p>
        Total {datasetProp}: {total}
      </p>
      <DownloadLink
        fileName={`${datasetProp}.csv`}
        dataset={dataset}
        text={`Download ${datasetProp} CSV`}
      />
    </div>
  );
};
