import React from "react";
import { Link } from "react-router-dom";
import customReportSettingScreenshot from "./custom-report-setting.png";

const AboutExante: React.FunctionComponent = () => (
  <>
    <Link to="/">Go Back</Link>
    <h3>Info page about Exante</h3>
    <p>
      To get proper report on your Exante transaction please follow this steps:
    </p>
    <ol>
      <li>Log in to your Exante acc</li>
      <li>Go to Account &gt; Reports area</li>
      <li>Hit &quot;Create custom report&quot; button</li>
      <li>Choose your base currency and CSV as a file format</li>
      <li
        style={{
          background: `url(${customReportSettingScreenshot}) left 20px/contain no-repeat`,
          height: 650,
          marginBottom: "50px",
        }}
      >
        <p>
          Fill dates you&apos;re interested in for &quot;Financial
          Transactions&quot; input fields
        </p>
        <p>
          <b>Other input fields should remain empty</b>
        </p>
      </li>
      <li>Press &quot;Save and Request&quot; button</li>
    </ol>
  </>
);

export default AboutExante;
