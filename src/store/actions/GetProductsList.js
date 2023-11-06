import axios from "axios";

export const GetProductsListAction = () => (dispatch) => {
  
  return axios
    .get("http://127.0.0.1:8000/api/properties")

    .then((res) => dispatch({ type: "GET_PRODUCTS", payload: res.data }))
    .catch((err) => {
      console.log(err);
    });
};
