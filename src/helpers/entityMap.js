// entityMap.js

import { createSellerStart, createSellerSuccess, createSellerFailure, getSellersStart, updateSellerStart, deleteSellerStart, getSellersSuccess, getSellersFailure, updateSellerSuccess, updateSellerFailure, deleteSellerSuccess, deleteSellerFailure } from '../redux/sellerRedux/sellerRedux';
import { addProduct, getProducts, updateProduct } from '../redux/productRedux/productApi';
import { createSeller, getSellers } from '../redux/sellerRedux/sellerApi';
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from '../redux/productRedux/productRedux';
  // Import other entity actions here...
  
  export const entityMap = {
    product: {
      actions: {
        addStart: addProductStart,
        addSuccess: addProductSuccess,
        addFailure: addProductFailure,
        updateStart: updateProductStart,
        updateSuccess: updateProductSuccess,
        updateFailure: updateProductFailure,
        getStart: getProductStart,
        getSuccess: getProductSuccess,
        getFailure: getProductFailure,
        deleteStart: deleteProductStart,
        deleteSuccess: deleteProductSuccess,
        deleteFailure: deleteProductFailure,
      },
    //   api: {
    //     add: addProduct,
    //     update: updateProduct,
    //     get: getProducts,
    //   },
      endpoints: {
        add: "/products",
        update: (id) => `/products/${id}`,
        get: "/products",
      },
    },
    seller: {
        actions: {
            addStart: createSellerStart,
            addSuccess: createSellerSuccess,
            addFailure: createSellerFailure,
            getStart: getSellersStart,
            getSuccess: getSellersSuccess,
            getFailure: getSellersFailure,
            updateStart: updateSellerStart,
            updateSuccess: updateSellerSuccess,
            updateFailure: updateSellerFailure,
            deleteStart: deleteSellerStart,
            deleteSuccess: deleteSellerSuccess,
            deleteFailure: deleteSellerFailure,
        },
        endpoints: {
            add: (id) => `/sellers/${id}`,
            update: (id) => `/sellers/${id}`,
            get: `/sellers`,
        }
    }
    //add for more
  };
  