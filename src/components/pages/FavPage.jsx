import React, { useEffect } from "react";
import ProductCard from "../static/productCard";
import { useSelector } from "react-redux";
import MyFooter from "../static/footer";
import FavPageCard from "../static/FavPageCard";
import ListingCard from "../static/listingCard";

const FavPage = () => {
  const favChanger = useSelector((state) => state.FavCOUNT.favCount);
  const user= useSelector((state)=> state.currentUSER.currentUser)



  useEffect(() => {

  }, [favChanger]);

  return (
    <>
    <h3 className="p-4">Your Favorites :</h3>
      <div style={{ minHeight: "75vh" }}>
        <div className="container">
          <div className="row">
            {user.favorites.map((product, index) => {
              return <ListingCard key={index} productObject={product} />;
            })}
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
};

export default FavPage;
