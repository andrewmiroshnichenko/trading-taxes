import React from "react";

interface Props {
  text: string;
  fileName: string;
  dataset: string;
}

export const DownloadLink: React.FunctionComponent<Props> = ({
  text,
  fileName,
  dataset,
}) => {
  const href = URL.createObjectURL(
    new Blob([dataset], {
      type: "text/csv",
    })
  );
  return dataset ? (
    <a download={fileName} href={href}>
      {text}
    </a>
  ) : null;
};
