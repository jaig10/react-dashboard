import { publicRequest, userRequest } from "../requestMethods";

import {
    getCustomerFailure,
    getCustomerStart,
    getCustomerSuccess,
    updateCustomerFailure,
    updateCustomerStart,
    updateCustomerSuccess,
  } from "./customerRedux/customerRedux";
  
export const getCustomers = async (dispatch) => {
    dispatch(getCustomerStart());
    try {
      const res = await userRequest.get(`/users`);
      dispatch(getCustomerSuccess(res.data));
    } catch (err) {
      dispatch(getCustomerFailure());
    }
  };
  
  export const updateCustomer = async (id, dispatch, user) => {
    dispatch(updateCustomerStart());
    try {
      const res = await userRequest.put(`/users/${id}`, user);
      dispatch(updateCustomerSuccess(res.data));
    } catch (err) {
      dispatch(updateCustomerFailure());
    }
  };
  