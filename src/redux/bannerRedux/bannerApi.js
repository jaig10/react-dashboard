import { publicRequest, userRequest } from "../requestMethods";


import {
  getBannerFailure,
  getBannerStart,
  getBannerSuccess,
  deleteBannerFailure,
  deleteBannerStart,
  deleteBannerSuccess,
  updateBannerFailure,
  updateBannerStart,
  updateBannerSuccess,
  addBannerFailure,
  addBannerStart,
  addBannerSuccess,
} from "./bannerRedux/bannerRedux";


export const getBanners = async (dispatch) => {
  dispatch(getBannerStart());
  try {
    const res = await userRequest.get("/banners");
    dispatch(getBannerSuccess(res.data));
  } catch (err) {
    dispatch(getBannerFailure());
  }
};

export const deleteBanner = async (id, dispatch) => {
  dispatch(deleteBannerStart());
  try {
    const res = await userRequest.delete(`/banners/${id}`);
    dispatch(deleteBannerSuccess(id));
  } catch (err) {
    dispatch(deleteBannerFailure());
  }
};

export const updateBanner = async (id, banner, dispatch) => {
  dispatch(updateBannerStart());
  try {
    const res = await userRequest.put(`/banners/${id}`, banner);
    dispatch(updateBannerSuccess(res.data));
  } catch (err) {
    dispatch(updateBannerFailure());
  }
};

export const addBanner = async (banner, dispatch) => {
  dispatch(addBannerStart());
  try {
    const res = await userRequest.post(`/banners`, banner);
    dispatch(addBannerSuccess(res.data));
  } catch (err) {
    dispatch(addBannerFailure());
  }
};
