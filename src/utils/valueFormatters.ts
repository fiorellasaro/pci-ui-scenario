export const valueFormatHazartdous = ({ value }: { value: string }) =>
  value === "Y" ? "Yes" : value === "N" ? "No" : "";
