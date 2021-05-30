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
    <span className={`${datasetProp}`}>
      <span className={`${datasetProp}-text`}>
        <div>{datasetProp}:</div>
        <div className= {`${datasetProp}-number`}>{total}</div>
      </span>
      <span className ={`${datasetProp}-report`}>
      <DownloadLink
        fileName={`${datasetProp}.csv`}
        dataset={dataset}
        // text={`Download ${datasetProp} CSV`}
        text = {`Report`}
      />
      </span>
      <div className={`${datasetProp}-circle`}></div>
    </span>
  );
};
