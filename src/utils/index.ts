import { Column } from "ag-grid-community";

export const valueFormatHazartdous = ({ value }: { value: string }) =>
  value === "Y" ? "Yes" : value === "N" ? "No" : "";

export const defaultColDef = {
  sortable: true,
};
export const gridOptions = {
  enableRangeSelection: true,
};

export const clearFiltersAndSorting = (gridApiRef: any , columnApiRef : any) => {
    if (gridApiRef.current && columnApiRef.current) {
      const allColumns = columnApiRef.current.getAllDisplayedColumns();
      allColumns.forEach((column: Column) => {
        column.setSort(undefined);
        gridApiRef.current.setFilterModel(null);
        gridApiRef.current.onFilterChanged();
      });
    }
  };