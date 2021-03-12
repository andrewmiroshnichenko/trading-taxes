import React, { useContext } from "react";
import { DataContext } from "../App";

interface Props {
  text: string;
  fileName: string;
  contextProp: "trades" | "dividends";
}

export const DownloadLink: React.FunctionComponent<Props> = ({
  text,
  fileName,
  contextProp,
}) => {
  const content = useContext(DataContext)[contextProp];
  const href = URL.createObjectURL(
    new Blob([content], {
      type: "text/csv",
    })
  );
  return content ? (
    <a download={fileName} href={href}>
      {text}
    </a>
  ) : null;
};
