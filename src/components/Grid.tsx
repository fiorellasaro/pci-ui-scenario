import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "../data/near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  valueFormatHazartdous,
  defaultColDef,
  gridOptions,
  clearFiltersAndSorting,
} from "../utils/";
import { columnDefs } from "../constants";
// import "ag-grid-enterprise/styles/ag-grid.css";

const NeoGrid = React.forwardRef((props, ref) => {
  const gridApiRef = useRef<any>();
  const columnApiRef = useRef<any>();

  React.useImperativeHandle(ref, () => ({
    clearFiltersAndSorting,
    gridApiRef,
    columnApiRef,
  }));

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;
  };

  return (
    <div className="ag-theme-alpine grid-style" >
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
