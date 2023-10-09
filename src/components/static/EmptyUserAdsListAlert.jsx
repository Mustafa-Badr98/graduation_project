import React from "react";

const EmptyUserAdsListAlert = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="offset-1 col-10">
            <div className="alert alert-warning" role="alert">
              <h4 className="alert-heading">OHH Such an Emptiness!</h4>
              <p>you dont have Ads yet, start Selling now.</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyUserAdsListAlert;
