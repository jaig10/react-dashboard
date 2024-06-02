import { publicRequest, userRequest } from "../requestMethods";

import {
    getCollectionStart,
    getCollectionSuccess,
    getCollectionFailure,
    deleteCollectionStart,
    deleteCollectionSuccess,
    deleteCollectionFailure,
    updateCollectionStart,
    updateCollectionSuccess,
    updateCollectionFailure,
    addCollectionStart,
    addCollectionSuccess,
    addCollectionFailure,
  } from "./collectionRedux";
export const getCollections = async (dispatch) => {
    dispatch(getCollectionStart());
    try {
      const res = await userRequest.get("/collections");
      dispatch(getCollectionSuccess(res.data));
    } catch (err) {
      dispatch(getCollectionFailure());
    }
  };
  
  export const deleteCollection = async (id, dispatch) => {
    dispatch(deleteCollectionStart());
    try {
      const res = await userRequest.delete(`/collections/${id}`);
      dispatch(deleteCollectionSuccess(id));
    } catch (err) {
      dispatch(deleteCollectionFailure());
    }
  };
  
  export const updateCollection = async (id, collection, dispatch) => {
    dispatch(updateCollectionStart());
    try {
      const res = await userRequest.put(`/collections/${id}`, collection);
      dispatch(updateCollectionSuccess(res.data));
    } catch (err) {
      dispatch(updateCollectionFailure());
    }
  };
  
  export const addCollection = async (collection, dispatch) => {
    dispatch(addCollectionStart());
    try {
      const res = await userRequest.post(`/collections`, collection);
      dispatch(addCollectionSuccess(res.data));
    } catch (err) {
      dispatch(addCollectionFailure());
    }
  };