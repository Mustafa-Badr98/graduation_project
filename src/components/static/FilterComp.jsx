import React from "react";
import { useDispatch } from "react-redux";
import { GetProductsListByFilterAction } from "../../store/actions/GetProductListByFilterAction";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import { IsLoading } from "../../store/actions/ISLoadingAction";
const FilterComp = () => {
  const dispatch = useDispatch();
  const FilterChangeHandler = (event) => {
    if (event.target.value === "Filter by Size") {
      dispatch(IsLoading(true));
      console.log("filter by size");
      dispatch(GetProductsListAction());
      setTimeout(() => {
        dispatch(IsLoading(false));
      }, 4000);
    } else {
      const val = event.target.value;
      dispatch(IsLoading(true));
      dispatch(GetProductsListAction());
      setTimeout(() => {
        dispatch(GetProductsListByFilterAction(val));
        dispatch(IsLoading(false));
      }, 4000);
    }
  };
  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => {
          FilterChangeHandler(e);
        }}
      >
        <option selected>Filter by Size</option>
        <option value="100">100M or Less</option>
        <option value="200">200M or Less</option>
        <option value="300">300M or Less</option>
      </select>
    </>
  );
};

export default FilterComp;
