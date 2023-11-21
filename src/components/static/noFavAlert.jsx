import React from "react";

const NoFavAlert = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-2 col-7">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">No Favorites yet.</h4>
              <p>Add properties to your favorites to show it here.</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoFavAlert;
