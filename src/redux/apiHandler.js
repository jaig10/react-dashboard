// apiHandler.js
import { entityMap } from "../helpers/entityMap";
import { userRequest } from "../requestMethods";

export const handleApiCall = async (entity, values, dispatch, id = null) => {
    const { actions, endpoints } = entityMap[entity];

    if (id) {
      // Update entity
      dispatch(actions.updateStart());
      try {
        const res = await userRequest.put(endpoints.update(id), values);
        dispatch(actions.updateSuccess(res.data));
      } catch (err) {
        dispatch(actions.updateFailure());
      }
    } else {
      // Add new entity
      dispatch(actions.addStart());
      try {
        const res = await userRequest.post(endpoints.add, values);
        dispatch(actions.addSuccess(res.data));
      } catch (err) {
        dispatch(actions.addFailure());
      }
    }
};

// export const handleApiCall = async (entity, values, dispatch, id = null) => {
//   const { actions, endpoints } = entityMap[entity];
//   console.log(entity, values, id);
//   console.log(endpoints);

//   if (id) {
//     // Update entity
//     dispatch(actions.updateStart());
//     try {
//       const res = await userRequest.put(endpoints.update(id), values);
//       dispatch(actions.updateSuccess(res.data));
//     } catch (err) {
//       dispatch(actions.updateFailure());
//     }
//   } else {
//     // Add new entity
//     dispatch(actions.addStart());
//     try {
//       const res = await userRequest.post(endpoints.add, values);
//       dispatch(actions.addSuccess(res.data));
//     } catch (err) {
//       dispatch(actions.addFailure());
//     }
//   }
// };
