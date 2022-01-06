export const parseFloatWithFallbackToZero = (toParse: string): number => {
  const result = parseFloat(toParse);

  return isNaN(result) ? 0 : result;
};