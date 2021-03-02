export const SUPPORTED_MIME_TYPES = {
  TEXT_CSV: "text/csv",
};

export async function getFileContents(
  file: File,
  type = SUPPORTED_MIME_TYPES.TEXT_CSV
): Promise<string> {
  const blob = new Blob([file], { type });
  const text = await blob.text();

  return text;
}
