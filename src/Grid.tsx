import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React from "react";

// import "ag-grid-enterprise/styles/ag-grid.css";

const defaultColDef = {
  sortable: true,
};
const gridOptions = {
  enableRangeSelection: true,
};

const valueFormatHazartdous = ({ value }: { value: string }) =>
  value === "Y" ? "Yes" : value === "N" ? "No" : "";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: true },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: true,
    valueFormatter: ({ value }) =>
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
  },
  { field: "h_mag", headerName: "H (mag)", filter: "agNumberColumnFilter" },
  { field: "moid_au", headerName: "MOID (au)", filter: "agNumberColumnFilter" },
  { field: "q_au_1", headerName: "q (au)", filter: "agNumberColumnFilter" },
  { field: "q_au_2", headerName: "Q (au)", filter: "agNumberColumnFilter" },
  {
    field: "period_yr",
    headerName: "Period (yr)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "i_deg",
    headerName: "Inclination (deg)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "pha",
    headerName: "Potentially Hazardous",
    filter: true,
    valueFormatter: valueFormatHazartdous,
  },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    filter: true,
  },
];

const NeoGrid = React.forwardRef((props, ref) => {
  const gridApiRef = useRef<any>();
  const columnApiRef = useRef<any>();

  React.useImperativeHandle(ref, () => ({
    clearFiltersAndSorting,
  }));

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;
  };

  const clearFiltersAndSorting = () => {
    if (gridApiRef.current && columnApiRef.current) {
      const allColumns = columnApiRef.current.getAllDisplayedColumns();
      allColumns.forEach((column: any) => {
        column.setSort(undefined);
        gridApiRef.current.setFilterModel(null);
        gridApiRef.current.onFilterChanged();
      });
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        defaultColDef={defaultColDef}
        rowSelection={"single"}
        enableRangeSelection={true}
        copyHeadersToClipboard={true}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  );
});

export default NeoGrid;
