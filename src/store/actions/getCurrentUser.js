import axios from "axios";

export const GetCurrentUserAction = (token) => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      const userData = response.data.user;
      console.log(userData)
      dispatch({ type: "GET_USER_SUCCESS", payload: userData });
    })
    .catch((error) => {
      dispatch({ type: "GET_USER_FAILURE", payload: error });
    });
};
