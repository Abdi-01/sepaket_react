import React, { useState } from "react";
import Option from "./Option";

function CategoryParcel(props) {
  const [categorySelected, setCategorySelected] = useState(1);

  return (
    <div>
      <Option />

      <div className="mb-3">
        <label className="form-label">Price (Recommendation)</label>
        <input
          class="form-control"
          // value={hargaRekom}
          type="number"
          aria-label="default input example"
        />
      </div>
    </div>
  );
}

export default CategoryParcel;
