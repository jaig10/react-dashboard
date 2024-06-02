import { publicRequest, userRequest } from "../requestMethods";

import {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailure,
  } from "./orderRedux";
  
export const getOrders = async (dispatch) => {
    dispatch(getOrderStart());
    try {
      const res = await userRequest.get("/orders");
      dispatch(getOrderSuccess(res.data));
    } catch (err) {
      dispatch(getOrderFailure());
    }
  };
  
  export const updateOrder = async (id, order, dispatch) => {
    dispatch(updateOrderStart());
    try {
      const res = await userRequest.put(`/orders/${id}`, order);
      dispatch(updateOrderSuccess(res.data));
    } catch (err) {
      dispatch(updateOrderFailure());
    }
  };
  
  export const deleteOrder = async (id, dispatch) => {
    dispatch(deleteOrderStart());
    try {
      const res = await userRequest.delete(`/orders/${id}`);
      dispatch(deleteOrderSuccess(id));
    } catch (err) {
      dispatch(deleteOrderFailure());
    }
  };