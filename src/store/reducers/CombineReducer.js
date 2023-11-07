import { combineReducers } from "redux";
import LogReducer from "./loginReducer";
import GetProductsListReducer from "./productsReducer";

import GetCurrentUserReducer from "./GetCurrentUser";
import { UpdateFavCountReducer } from "./UpdateFavCountReducer";
import UpdateWishListReducer from "./UpdateWishReducer";
import IsLoadingReducer from "./IsLoadingReducer";
import AddToUserProductListReducer from "./UserProductListReducer";
import StoreTokenReducer from "./StoreTokenReducer";
import GetProductsSearchedListReducer from "./productsSearchedReducer";
export default combineReducers({
  IsLog: LogReducer,
  Products: GetProductsListReducer,
  ProductsSearched:GetProductsSearchedListReducer,
  UserProducts: AddToUserProductListReducer,
  currentUSER: GetCurrentUserReducer,
  FavCOUNT: UpdateFavCountReducer,
  WishLIST: UpdateWishListReducer,
  IsLOADING: IsLoadingReducer,
  TokenStore: StoreTokenReducer,
});
