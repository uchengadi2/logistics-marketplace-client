import { SignUp } from "../actions";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./../actions/types";
import useToken from "../custom-hooks/useToken";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.data.user.id,
        data: action.payload,
        token: {
          status: action.payload.status,
          token: action.payload.token,
          userId: action.payload.data.user.id,
        },
      };

    case SIGN_UP:
      //console.log(action.payload.user.id);
      return { ...state, isSignedIn: true, userId: action.payload.user.id };

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
