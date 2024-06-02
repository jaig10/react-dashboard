import { userRequest } from "../../requestMethods";

import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
  } from "./productRedux";
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      console.log("hello");
      const res = await userRequest.get("/products");
      console.log(res.data);
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      console.error("Error fetching products:", err);
      dispatch(getProductFailure());
    }
  };
  
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
      const res = await userRequest.delete(`/products/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  
  export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      const res = await userRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess(res.data));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  
  //this needs to be checked
  export const updateOption = async (id, optionId, option, dispatch) => {
    dispatch(updateProductStart());
    try {
      const res = await userRequest.put(
        `/products/${id}/${optionId}/edit`,
        option
      );
      dispatch(updateProductSuccess(res.data));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  
  //this needs to be checked
  export const deleteOption = async (id, optionId, dispatch) => {
    dispatch(updateProductStart());
    try {
      const res = await userRequest.put(
        `/products/${id}/${optionId}/delete-option`
      );
      dispatch(updateProductSuccess(res.data));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  
  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await userRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
  