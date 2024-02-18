import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, ColumnApi } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const valueFormatHazartdous = ({ value }: { value: string }) =>
  value === "Y" ? "Yes" : value === "N" ? "No" : "";

const columnDefs: ColDef[] = [
  {
    field: "designation",
    headerName: "Designation",
    filter: "agTextColumnFilter",
    enableValue: true,
  },
  {
    field: "discovery_date",
    headerName: "Discovery Date",
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: function (filterLocalDate: Date, cellValue: any) {
        var cellDate = new Date(cellValue);
        if (
          cellDate.getFullYear() === filterLocalDate.getFullYear() &&
          cellDate.getMonth() === filterLocalDate.getMonth() &&
          cellDate.getDate() === filterLocalDate.getDate()
        ) {
          return 0;
        }
        if (cellDate > filterLocalDate) {
          return 1;
        }
        if (cellDate < filterLocalDate) {
          return -1;
        }
      },
      browserDatePicker: true,
    },
    valueFormatter: ({ value }) =>
      new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    enableValue: true,
  },
  {
    field: "h_mag",
    headerName: "H (mag)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "moid_au",
    headerName: "MOID (au)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "q_au_1",
    headerName: "q (au)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "q_au_2",
    headerName: "Q (au)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "period_yr",
    headerName: "Period (yr)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "i_deg",
    headerName: "Inclination (deg)",
    filter: "agNumberColumnFilter",
    enableValue: true,
  },
  {
    field: "pha",
    headerName: "Potentially Hazardous",
    filter: "agTextColumnFilter",
    valueFormatter: valueFormatHazartdous,
    enableValue: true,
  },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    filter: "agTextColumnFilter",
    enableValue: true,
  },
];

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
