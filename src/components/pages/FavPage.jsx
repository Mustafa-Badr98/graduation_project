import React, { useEffect } from "react";
import ProductCard from "../static/productCard";
import { useSelector } from "react-redux";
import MyFooter from "../static/footer";
import FavPageCard from "../static/FavPageCard";
import ListingCard from "../static/listingCard";
import NothingFoundAlert from "../static/nothingFoundAlert";
import NoFavAlert from "../static/noFavAlert";

const FavPage = () => {
  const favChanger = useSelector((state) => state.FavCOUNT.favCount);
  const user = useSelector((state) => state.currentUSER.currentUser);

  useEffect(() => {}, [favChanger]);

  return (
    <>
      <div style={{ minHeight: "80vh" }}>
        <div className="container">
          <h3 className="pt-4 mt-4">Your Favorites :</h3>
          {Object.keys(user).length > 0 && user.favorites.length > 0 ? (
            <>
              {" "}
              <div className="row">
                {user.favorites.map((product, index) => {
                  return <ListingCard key={index} productObject={product} />;
                })}
              </div>
            </>
          ) : (
            <>
            <NoFavAlert/>
            </>
          )}
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default FavPage;
