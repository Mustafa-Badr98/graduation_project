import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/pages/homePage";
import NotFoundPage from "./components/pages/notFoundPage";
import SignupPage from "./components/pages/signupPage";
import LoginModal from "./components/static/loginModal";
import MyNavbar from "./components/static/myNavbar";
import FavPage from "./components/pages/FavPage";
import SellPage from "./components/pages/sellPage";
import UserAdsPage from "./components/pages/userAdsPage";
import ViewSingleProductPageV2 from "./components/pages/viewSingleProductV2";
import EditProfilePage from "./components/pages/EditUserProfilePage";
import ViewUsersPage from "./components/pages/viewUsersPage";
import OfferForm from "./components/pages/OfferForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/userAds" component={UserAdsPage} />
          <Route exact path="/EditUserProfile" component={EditProfilePage} />
          <Route exact path="/Fav" component={FavPage} />
          <Route exact path="/sellProduct" component={SellPage} />
          <Route exact path="/viewUser/:user" component={ViewUsersPage} />
          <Route exact path="/:id" component={ViewSingleProductPageV2} />
          <Route exact path="/*" component={NotFoundPage} />

          <Route exact path="/OfferForm" component={OfferForm} />
        </Switch>
      </BrowserRouter>
      <LoginModal />
    </>
  );
}

export default App;
