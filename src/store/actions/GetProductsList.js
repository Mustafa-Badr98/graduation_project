import axios from "axios";

export const GetProductsListAction = () => (dispatch) => {
  return (
    axios
      .get("https://retoolapi.dev/lgHeOw/realtor_site")

      // 2- https://api.themoviedb.org/3/genre/movie/list?api_key=36b47344ad45066bb95cdf11b474577d&language=en-US

      .then((res) =>
        dispatch({ type: "GET_PRODUCTS", payload: res.data })
      )
      .catch((err) => {
        console.log(err);
      })
  );
};
