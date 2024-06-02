import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux/userRedux";
import productReducer from "./productRedux/productRedux";
import customerReducer from "./customerRedux/customerRedux";
import orderReducer from "./orderRedux/orderRedux";
import bannerReducer from "./bannerRedux/bannerRedux";
import collectionReducer from "./collectionRedux/collectionRedux";
import sellerReducer from "./sellerRedux/sellerRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  customer: customerReducer,
  order: orderReducer,
  banner: bannerReducer,
  collection: collectionReducer,
  seller:sellerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
