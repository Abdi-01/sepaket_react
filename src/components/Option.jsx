import React, { useState } from "react";

function Option() {
  return (
    <div>
      <div class="input-group mb-3">
        <select
          name="cat-1"
          // onChange={inputHandler}
          class="form-select"
          aria-label="Default select example"
        >
          {/* {CategoryList.map((val) => (
            <option value={val.id_cat}>{val.category_name}</option>
          ))}
        </select>
        {() => renderCategoryOption()} */}
        </select>
        <input
          type="number"
          class="form-control"
          // onChange={inputHandler}
          name="jml-cat-1"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          // onClick={() => addOption()}
          class="btn btn-success"
          type="button"
          id="button-addon2"
          // disabled={toggleBtnOption}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Option;
