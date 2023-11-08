import axios from "axios";

export const GetCurrentUserByTokenAction = (token) => (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/api/user/token/${token}`)
    .then((response) => {
      const userData = response.data.data;
      dispatch({ type: "USER_TOKEN_SUCCESS", payload: userData });
    })
    .catch((error) => {
      dispatch({ type: "USER_TOKEN_FAILURE", payload: error });
    });
};
