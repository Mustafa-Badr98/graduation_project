import React, { useEffect, useState } from "react";
import MyFooter from "../static/footer";
import NothingFoundAlert from "../static/nothingFoundAlert";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../static/UserCard";
import EmptyUserAdsListAlert from "../static/EmptyUserAdsListAlert";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";

const UserAdsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUSER.currentUser);
  const [userProperties, setUserProperties] = useState([]);

  console.log(user);
  console.log(userProperties);

  useEffect(() => {
    setUserProperties(user.properties_owned);
  }, [user]);
  return (
    <>
      <div className="container">
        {!userProperties ? (
          <>
            <h1>Loading</h1>
          </>
        ) : (
          <>
            <div
              style={{ minHeight: "100vh" }}
              className="container-fluid mt-5 fw-normal"
            >
              <div className="fs-6 fw-lighter">Profile</div>
              <span className="fs-4 fw-bold">Manage and view your Ads</span>
              {/* <UserCard productObject={testObject} /> */}

              {userProperties && userProperties.length === 0 ? (
                <>
                  <EmptyUserAdsListAlert />
                </>
              ) : (
                <>
                  <div className="row">
                    {userProperties &&
                      userProperties.map((ad, index) => {
                        return <UserCard key={index} productObject={ad} />;
                      })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <MyFooter />
    </>
  );
};

export default UserAdsPage;
