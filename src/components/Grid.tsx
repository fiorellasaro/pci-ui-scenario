import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { GridApi, ColumnApi } from "ag-grid-community";
import data from "../data/near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { columnDefs } from "../utils/columnDefinitions";

const NeoGrid = (): JSX.Element => {
  const gridApiRef = useRef<GridApi | null>(null);
  const columnApiRef = useRef<ColumnApi | null>(null);

  const clearFiltersAndSorting = () => {
    if (gridApiRef.current && columnApiRef.current) {
      const allColumns = columnApiRef.current.getAllDisplayedColumns();
      allColumns.forEach((column) => {
        column.setSort(undefined);
      });
      gridApiRef.current.setFilterModel(null);
      gridApiRef.current.onFilterChanged();
    }
  };

  const onGridReady = (params: { api: GridApi; columnApi: ColumnApi }) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;
  };
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <h1 style={{ margin: 0 }}>Near-Earth Object Overview</h1>
        <button onClick={clearFiltersAndSorting} style={{ marginLeft: "15px" }}>
          Clear Filters and Sorters
        </button>
      </div>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowGroupPanelShow={"always"}
        defaultColDef={{
          sortable: true,
          enableValue: true,
        }}
        enableCellTextSelection={true}
        enableRangeSelection={true}
      />
    </div>
  );
};

export default NeoGrid;
