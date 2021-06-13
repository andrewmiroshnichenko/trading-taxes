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
    <div className={`${datasetProp}`}>
      <div className={`${datasetProp}-text`}>
        <div>{datasetProp}:</div>
        <div className= {`${datasetProp}-number`}>{total}</div>
      </div>
      <div className ={`${datasetProp}-report`}>
      <DownloadLink
        fileName={`${datasetProp}.csv`}
        dataset={dataset}
        // text={`Download ${datasetProp} CSV`}
        text = {`Report`}
      />
      </div>
      {/* <div className={`${datasetProp}-circle`}></div> */}
    </div>
  );
};
