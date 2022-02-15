export const parseFloatWithFallbackToZero = (toParse: string): number => {
  const result = parseFloat(toParse);

  return isNaN(result) ? 0 : result;
};

export const parseFloatWithDealSign = (
  input: string,
  dealSign: number
): number =>
  dealSign
    ? dealSign * parseFloatWithFallbackToZero(input)
    : parseFloatWithFallbackToZero(input);
