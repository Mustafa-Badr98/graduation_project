import React from "react";
import MyFooter from "../static/footer";
import NothingFoundAlert from "../static/nothingFoundAlert";
import { useSelector } from "react-redux";
import ListingCard from "../static/listingCard";
import ProductCard from "../static/productCard";
import UserCard from "../static/UserCard";
const UserAdsPage = () => {
  const localUserProductsList = useSelector(
    (state) => state.UserProducts.userListOfProducts
  );
  console.log(localUserProductsList);
  const testObject = {
    description: "OPEN LAGOON SEAVIEW VILLA GOUNA -INSTALLMENTS!!!!! ",
    id: 1,
    location: "2 Gesr El Suez St., HELIOPOLIS  ",
    numOfBathrooms: "3",
    numOfBedrooms: "3",
    photo:
      "https://www.propertyfinder.eg/property/865f31875e0a98ba0d6969b4856f3241/856/550/MODE/67dabb/4389777-9cde6o.webp?ctr=eg",
    price: "657858",
    propertySize: "223",
    timeStamp: "Invalid date",
    title: "Villa ",
    type: "rent",
  };

  return (
    <>
      <div style={{minHeight:"100vh"}} className="container-fluid mt-5 fw-normal">
        <div className="fs-6 fw-lighter">Profile</div>
        <span className="fs-4 fw-bold">Manage and view your Ads</span>
        <UserCard productObject={testObject} />

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
