import { ColDef } from "ag-grid-community";
import { valueFormatHazartdous } from "./valueFormatters";

export const columnDefs: ColDef[] = [
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
