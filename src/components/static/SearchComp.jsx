import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchAction } from "../../store/actions/SearchAction";
import { GetProductsListAction } from "../../store/actions/GetProductsList";
import { IsLoading } from "../../store/actions/ISLoadingAction";

const SearchComp = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const searchChangeHandler = (event) => {
    if (event.target.id === "searchBar") {
      setSearchValue(event.target.value);
    }
  };

  const searchButtonHandler = () => {
    dispatch(IsLoading(true));
    dispatch(GetProductsListAction());
    setTimeout(() => {
      dispatch(SearchAction(searchValue));
      dispatch(IsLoading(false));
    }, 3000);
  };
  return (
    <>
      <div className="input-group ">
        <input
          className="form-control border-end-0 border rounded-pill"
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => {
            searchChangeHandler(e);
          }}
          id="searchBar"
        />
        <span className="input-group-append">
          <button
            onClick={searchButtonHandler}
            className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
            type="button"
          >
            <i className="fa fa-search text-secondary "></i>
          </button>
        </span>
      </div>
    </>
  );
};

export default SearchComp;
