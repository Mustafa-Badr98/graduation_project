import axios from "axios";

export const GetProductsListAction = () => (dispatch) => {
  
  return axios
    .get("https://retoolapi.dev/NlCDT1/realtor")

    .then((res) => dispatch({ type: "GET_PRODUCTS", payload: res.data })).then((res)=> console.log(res))
    .catch((err) => {
      console.log(err);
    });
};
