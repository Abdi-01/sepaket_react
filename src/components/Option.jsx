import React, { useState } from "react";

function Option({ category, categoryRender, categoryList, setCategoryRender }) {
  const deleteCatHandler = () => {
    // console.log(category);
    setCategoryRender(categoryRender.filter((val) => val !== category));
  };
  return (
    <div>
      <div class="input-group mb-3">
        <select
          name="cat-1"
          // onChange={inputHandler}
          class="form-select"
          aria-label="Default select example"
        >
          {/* <option value={category}>{category}</option> */}
          {categoryList.map((val) => (
            <option value={val.id_cat}>{val.category_name}</option>
          ))}
          {/*</select>
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
          onClick={deleteCatHandler}
          class="btn btn-danger"
          type="button"
          id="button-addon2"
          // disabled={toggleBtnOption}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Option;
