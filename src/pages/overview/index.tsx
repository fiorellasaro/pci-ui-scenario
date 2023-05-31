import { useRef } from "react";
import NeoGrid from "../../components/Grid";
import "../../styles/style.css";


export default function Overview() {
  const gridRef = useRef<any>(null);

  const handleCallChildFunction = () => {
    if (gridRef.current) {
      gridRef.current.clearFiltersAndSorting(gridRef.current.gridApiRef, gridRef.current.columnApiRef);
    }
  };

  return (
    <div>
      <div className="main-header">
        <h1 className="main-title">
          Near-Earth Object Overview
        </h1>
        <button onClick={handleCallChildFunction}>
          Clear Filters and Sorters
        </button>
      </div>
      <NeoGrid ref={gridRef} />
    </div>
  );
}
