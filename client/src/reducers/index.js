import { combineReducers } from "redux";

import products from "./products";
import categories from "./categories";
import shops from "./shops";
import brand from "./brand";
import product from "./product";
import similarProducts from "./similarProducts";
import favorites from "./favorites";
import cart from "./cart";
import admins from "./admin";
import auth from "./auth";

export default combineReducers({
  products,
  categories,
  shops,
  brand,
  product,
  similarProducts,
  favorites,
  cart,
  admins,
  auth,
});
