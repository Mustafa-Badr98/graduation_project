import React from "react";
import MyFooter from "../static/footer";
import NothingFoundAlert from "../static/nothingFoundAlert";
import { useSelector } from "react-redux";
import ListingCard from "../static/listingCard";
const UserAdsPage = () => {
  const localUserProductsList = useSelector(
    (state) => state.UserProducts.userListOfProducts
  );
  console.log(localUserProductsList);

  return (
    <>
      <div className="vh-100 container-fluid mt-5 fw-normal">
        <div className="fs-6 fw-lighter">Profile</div>
        <span className="fs-4 fw-bold">Manage and view your Ads</span>

        {localUserProductsList.length === 0 ? (
          <>
            <NothingFoundAlert />
          </>
        ) : (
          <>
            <div className="row">
              {localUserProductsList.map((ad, index) => {
                return <ListingCard productObject={ad} />;
              })}
            </div>
          </>
        )}
      </div>

      <MyFooter />
    </>
  );
};

export default UserAdsPage;
