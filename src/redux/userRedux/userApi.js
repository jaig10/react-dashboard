import { publicRequest, userRequest } from "../requestMethods";

import { loginFailure, loginStart, loginSuccess } from "./userRedux/userRedux";
import { getSellersStart, getSellersSuccess, getSellersFailure } from "./userSlice"; // adjust the path as necessary

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/login", user);
      if (res.data?.isAdmin) {
        dispatch(loginSuccess(res.data));
      } else {
        dispatch(loginFailure());
      }
    } catch (err) {
      dispatch(loginFailure());
    }
  };