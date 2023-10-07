import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./components/pages/homePage";
import NotFoundPage from "./components/pages/notFoundPage";
import SignupPage from "./components/static/signupPage";
import viewSingleProductPage from "./components/pages/viewSingelProduct";
import LoginModal from "./components/static/loginModal";
import MyNavbar from "./components/static/myNavbar";
import FavPage from "./components/pages/FavPage";
import { useDispatch } from "react-redux";
import { GetProductsListAction } from "./store/actions/GetProductsList";
import SellPage from "./components/pages/sellPage";
import UserAdsPage from "./components/pages/userAdsPage";
import ProfilePage from "./components/pages/UserProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={SignupPage} />
          <Route exact path="/userAds" component={UserAdsPage} />
          <Route exact path="/userProfile" component={ProfilePage} />
          <Route exact path="/Fav" component={FavPage} />
          <Route exact path="/sellProduct" component={SellPage} />
          <Route exact path="/:id" component={viewSingleProductPage} />
          <Route exact path="/*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <LoginModal />
    </>
  );
}

export default App;
