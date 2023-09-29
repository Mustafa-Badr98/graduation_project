import React from "react";

const NothingFoundAlert = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-2 col-7">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">Nothing Found!</h4>
              <p>Try Searching For more Relevant Titles.</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NothingFoundAlert;
