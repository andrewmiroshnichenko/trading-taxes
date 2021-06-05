import React from "react";
import { Link } from "react-router-dom";

const AboutRevolut: React.FunctionComponent = () => (
  <>
    <Link to="/">Go Back</Link>
    <h3>Info page about Revolut</h3>
    <p>
      To get proper report on your Revolut transactions please follow this
      steps:
    </p>
    <ol>
      <li>Log in to your Revolut app</li>
      <li>Go to Stocks &gt; Statement area</li>
      <li>
        At tme moment - 01.06.2021 - Revolut provides only calendar month based
        statements. Thats it - you need to \n download reports for all months
        you need, one by one.
      </li>
      <li>
        When you&apos;ll have statements for all months you&apos;re interested
        in, go to https://github.com/bogdanghervan/revolut-statement and follow
        the instructions there.
      </li>
      <li>
        At the end, you probably will have CSV file with statements, let&apos;s
        assume it&apos;s called &quot;my-statements.csv&quot;
      </li>
      <li>This file can be used as an input file to this app</li>
    </ol>
  </>
);

export default AboutRevolut;
