/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { NbpResponse } from "./types";

const supportedCurrencies = ["USD"];

export const isNpbResponse = (arg: any): arg is NbpResponse => {
  return (
    typeof arg.code === "string" &&
    supportedCurrencies.includes(arg.code) &&
    typeof arg.rates === "object" &&
    typeof arg.length !== "undefined"
  );
};
