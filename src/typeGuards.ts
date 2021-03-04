/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

import { NbpResponse } from "./types";

const supportedCurrencies = ["USD"];

export const isNpbResponse = (arg: any): arg is NbpResponse =>
  typeof arg.code === "string" &&
  supportedCurrencies.includes(arg.code) &&
  typeof arg.rates === "object" &&
  typeof arg.rates.length !== "undefined";
