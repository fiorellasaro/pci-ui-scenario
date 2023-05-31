import { useRef } from "react";
import NeoGrid from "../../Grid";

type Props = {};

export default function Overview({}: Props) {
  const gridRef = useRef<any>(null);

  const handleCallChildFunction = () => {
    if (gridRef.current) {
      gridRef.current.clearFiltersAndSorting();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center", marginRight: "15px" }}>
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
