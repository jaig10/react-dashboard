import { userRequest } from "../../requestMethods";
import {
  getSellersStart,
  getSellersSuccess,
  getSellersFailure,
  createSellerStart,
  createSellerSuccess,
  createSellerFailure,
  updateSellerStart,
  updateSellerSuccess,
  updateSellerFailure,
  deleteSellerStart,
  deleteSellerSuccess,
  deleteSellerFailure,
} from "./sellerRedux";

// Fetch all sellers
export const getSellers = async (dispatch) => {
  dispatch(getSellersStart());
  try {
    console.log("hello");
    const res = await userRequest.get("/sellers");
    console.log(res.data);
    dispatch(getSellersSuccess(res.data));
  } catch (err) {
    dispatch(getSellersFailure());
  }
};

// Fetch a particular seller by ID
export const getSellerById = async (id, dispatch) => {
    dispatch(getSellersStart());
    try {
      const res = await userRequest.get(`/sellers/${id}`);
      console.log(res.data);
      dispatch(getSellersSuccess([res.data])); 
      return res.data;// Assuming you want to store it in the sellers array
    } catch (err) {
      dispatch(getSellersFailure());
    }
  };
  

// Create a new seller
export const createSeller = async (id, seller, dispatch) => {
  dispatch(createSellerStart());
  try {
    const res = await userRequest.post(`/sellers/${id}`, seller);
    dispatch(createSellerSuccess(res.data));
  } catch (err) {
    dispatch(createSellerFailure());
  }
};

// Update a seller
export const updateSeller = async (id, seller, dispatch) => {
  dispatch(updateSellerStart());
  try {
    const res = await userRequest.put(`/sellers/${id}`, seller);
    dispatch(updateSellerSuccess(res.data));
  } catch (err) {
    dispatch(updateSellerFailure());
  }
};

// Delete a seller
export const deleteSeller = async (id, dispatch) => {
  dispatch(deleteSellerStart());
  try {
    await userRequest.delete(`/sellers/${id}`);
    dispatch(deleteSellerSuccess(id));
  } catch (err) {
    dispatch(deleteSellerFailure());
  }
};
