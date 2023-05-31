import React from "react";
import NeoGrid from "../../Grid";

type Props = {};

export default function overview({}: Props) {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Near-Earth Object Overview</h1>
      <NeoGrid />
    </div>
  );
}
