import React, { useEffect, useState } from "react";
import MyFooter from "../static/footer";
import NothingFoundAlert from "../static/nothingFoundAlert";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../static/UserCard";
import EmptyUserAdsListAlert from "../static/EmptyUserAdsListAlert";
import { GetCurrentUserAction } from "../../store/actions/getCurrentUser";
import { useTranslation } from "react-i18next";

const UserAdsPage = () => {
  const { t } = useTranslation();

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
              
              <span className="fs-4 fw-bold">{t("Manage and view your Ads")} </span>
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
