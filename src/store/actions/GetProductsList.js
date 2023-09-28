import axios from "axios";

export const GetProductsListAction = () => (dispatch) => {
  
  return axios
    .get("https://retoolapi.dev/lgHeOw/realtor_site")

    .then((res) => dispatch({ type: "GET_PRODUCTS", payload: res.data }))
    .catch((err) => {
      console.log(err);
    });
};
