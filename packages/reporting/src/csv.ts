/**
 * Safe CSV Serializer
 * Mitigates spreadsheet formula injection (CSV injection) by prefixing
 * vulnerable characters (=, +, -, @, tab, carriage return) with a single quote.
 */

const FORMULA_PREFIXES = ["=", "+", "-", "@", "\t", "\r"];

export function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  let str = String(value);

  // Prevent spreadsheet formula injection
  if (FORMULA_PREFIXES.some((char) => str.startsWith(char))) {
    str = `'${str}`;
  }

  // If cell contains commas, quotes, or newlines, wrap in quotes and escape internal quotes
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

export function toCsvString(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const headerLine = headers.map(escapeCsvCell).join(",");
  const dataLines = rows.map((row) => row.map(escapeCsvCell).join(","));
  return [headerLine, ...dataLines].join("\n");
}
