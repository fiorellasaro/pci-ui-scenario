import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColDef = {
  sortable: true
};

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", filter: true  },
  { field: "discovery_date", headerName: "Discovery Date", filter: true, valueFormatter: ({ value }) => new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })  },
  { field: "h_mag", headerName: "H (mag)", filter: 'agNumberColumnFilter'  },
  { field: "moid_au", headerName: "MOID (au)", filter: 'agNumberColumnFilter'  },
  { field: "q_au_1", headerName: "q (au)", filter: 'agNumberColumnFilter'   },
  { field: "q_au_2", headerName: "Q (au)", filter: 'agNumberColumnFilter'   },
  { field: "period_yr", headerName: "Period (yr)", filter: 'agNumberColumnFilter'   },
  { field: "i_deg", headerName: "Inclination (deg)", filter: 'agNumberColumnFilter'   },
  { field: "pha", headerName: "Potentially Hazardous", filter: true  },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: true  },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default NeoGrid;
