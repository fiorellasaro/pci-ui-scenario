import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  {
    field: "designation",
    headerName: "Designation",
    filter: "agTextColumnFilter",
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
  },
  {
    field: "h_mag",
    headerName: "H (mag)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "moid_au",
    headerName: "MOID (au)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "q_au_1",
    headerName: "q (au)",
    filter: "agNumberColumnFilter",
  },
  {
    field: "q_au_2",
    headerName: "Q (au)",
    filter: "agNumberColumnFilter",
  },
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
    filter: "agTextColumnFilter",
  },
  {
    field: "orbit_class",
    headerName: "Orbit Class",
    enableRowGroup: true,
    filter: "agTextColumnFilter",
  },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h1>Near-Earth Object Overview</h1>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        defaultColDef={{
          sortable: true,
        }}
      />
    </div>
  );
};

export default NeoGrid;
