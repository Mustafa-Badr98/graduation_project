const INITIAL_VALUE = {
  favCount: sessionStorage.length,
};

export function UpdateFavCountReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "CHANG_FAV_COUNT_ADD":
      let productJsonString = JSON.stringify(action.payload);
      sessionStorage.setItem(action.payload.id, productJsonString);
      return {
        ...state,
        favCount: sessionStorage.length,
      };
    case "CHANG_FAV_COUNT_REMOVE":
      sessionStorage.removeItem(action.payload.id);

      return {
        ...state,
        favCount: sessionStorage.length,
      };
    default:
      return state;
  }
}
