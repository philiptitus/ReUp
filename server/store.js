// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { thunk } from 'redux-thunk';
// // Import your reducers here...

// import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer, accountDeleteReducer, userFollowReducer, resetPasswordReducer, forgotPasswordReducer, privateFollowReducer, requestListReducer ,         getOtpReducer,
//   verifyOtpReducer} from './reducers/userReducers';

// import { budgetCreateReducer, budgetDeleteReducer, budgetDetailReducer, budgetUpdateReducer, categoryCreateReducer, categoryUpdateReducer, incomeCreateReducer, incomeDeleteReducer, incomeDetailReducer, incomeUpdateReducer, savingsDeleteReducer, savingsUpdateReducer, userSavingsDetailReducer } from './reducers/postReducers'

// import { composeWithDevTools } from '@redux-devtools/extension';


// const rootReducer = combineReducers({
//   // Define your reducers here...


//   incomeCreate:incomeCreateReducer,
//   incomeUpdate:incomeUpdateReducer,
//   incomeDelete:incomeDeleteReducer,
//   budgetCreate:budgetCreateReducer,
//   budgetDelete:budgetDeleteReducer,
//   categoryCreate:categoryCreateReducer,
//   categoryUpdate:categoryUpdateReducer,
//   budgetDetail:budgetDetailReducer,
//   budgetUpdate:budgetUpdateReducer,
//   incomeDetail:incomeDetailReducer,
//   savingsUpdate:savingsUpdateReducer,
//   userSavingsDetail:userSavingsDetailReducer,
//   savingsDelete:savingsDeleteReducer,



//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer,
//   userDetails: userDetailsReducer,
//   userList: userListReducer,
//   userUpdateProfile: userUpdateProfileReducer,
//   userDelete: userDeleteReducer,
//   userUpdate: userUpdateReducer,
//   userFollow: userFollowReducer,
//   accountDelete: accountDeleteReducer,
//   forgotPassword: forgotPasswordReducer,
//   resetPassword: resetPasswordReducer,
//   privateFollow: privateFollowReducer,
//   requestList: requestListReducer,
//   getOtp:getOtpReducer,
//   verifyOtp:verifyOtpReducer,


// });

// const initialState = {
//   userLogin: { userInfo: null }
// }

// const middleware = [thunk]// Add redux-thunk middleware

// const store = createStore(rootReducer, initialState, 
//     composeWithDevTools(applyMiddleware(...middleware))
//     )

// const fetchUserInfoFromStorage = async () => {
//   try {
//     const userInfo = await AsyncStorage.getItem('userInfo');
//     return userInfo ? JSON.parse(userInfo) : null;
//   } catch (error) {
//     console.error('Error retrieving user info from AsyncStorage:', error);
//     return null;
//   }
// };


// const initializeStore = () => {
//   return async (dispatch) => { // Use redux-thunk to dispatch async actions
//     try {
//       const userInfo = await fetchUserInfoFromStorage();
//       if (userInfo) {
//         dispatch({ type: 'UPDATE_USER_INFO', payload: userInfo });
//       }
//     } catch (error) {
//       console.error('Error initializing store:', error);
//     }
//   };
// };

// store.dispatch(initializeStore()); // Dispatch the initializeStore action

// export default store;


import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';

// Import your reducers here
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  accountDeleteReducer,
  userFollowReducer,
  resetPasswordReducer,
  forgotPasswordReducer,
  privateFollowReducer,
  requestListReducer,
  getOtpReducer,
  verifyOtpReducer,
} from './reducers/userReducers';
import {
  budgetCreateReducer,
  budgetDeleteReducer,
  budgetDetailReducer,
  budgetUpdateReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  incomeCreateReducer,
  incomeDeleteReducer,
  incomeDetailReducer,
  incomeUpdateReducer,
  savingsDeleteReducer,
  savingsUpdateReducer,
  userSavingsDetailReducer,
  







  postListReducer, postDetailsReducer, ComentListReducer, postDeleteReducer,
  postCreateReducer, postCommentCreateReducer,
  LikeCreateReducer, postUpdateReducer,
  
} from './reducers/postReducers';

import { createTrashReducer,
  createAdminAreaReducer,
  createCommunityReducer,
  createOrganizationReducer,
  createPointReducer,
  createReportReducer,
  verifyTrashReducer,
  removeFromBlacklistReducer,
  retrieveAdminAreaReducer,
  retrieveCommunityReducer,
  retrieveOrganizationReducer,
  retrievePointReducer,
  retrieveTrashReducer,
  updateCommunityReducer,
  updateOrganizationReducer,
  updateTrashReducer,
  joinAreaReducer,
  deleteAdminAreaReducer,
  deleteCommunityReducer,
  deleteOrganizationReducer,
  deletePointReducer,
  deleteReportReducer,
  addToBlacklistReducer,
  appealBlacklistReducer,
  fetchRandomInsightReducer,
  createTrashDirectReducer,
  removeStaffReducer,
  
  
 } from './reducers/trashReducers';

const rootReducer = combineReducers({
  incomeCreate: incomeCreateReducer,
  incomeUpdate: incomeUpdateReducer,
  incomeDelete: incomeDeleteReducer,
  budgetCreate: budgetCreateReducer,
  budgetDelete: budgetDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  budgetDetail: budgetDetailReducer,
  budgetUpdate: budgetUpdateReducer,
  incomeDetail: incomeDetailReducer,
  savingsUpdate: savingsUpdateReducer,
  userSavingsDetail: userSavingsDetailReducer,
  savingsDelete: savingsDeleteReducer,


  postList: postListReducer,
  postDetails: postDetailsReducer,
  commentList: ComentListReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postCommentCreate: postCommentCreateReducer,
  likeCreate: LikeCreateReducer,













  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userFollow: userFollowReducer,
  accountDelete: accountDeleteReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  privateFollow: privateFollowReducer,
  requestList: requestListReducer,
  getOtp: getOtpReducer,
  verifyOtp: verifyOtpReducer,
  staffRemove:removeStaffReducer,





  createTrash:createTrashReducer,
  createAdminArea:createAdminAreaReducer,
  communityCreate:createCommunityReducer,
  createOrganization:createOrganizationReducer,
  createPoint:createPointReducer,
  reportCreate:createReportReducer,
  randomInsight: fetchRandomInsightReducer,

  verifyTrash:verifyTrashReducer,
  blacklistRemove:removeFromBlacklistReducer,
  AdminAreaDetails:retrieveAdminAreaReducer,
  CommunityDetails:retrieveCommunityReducer,
  retrieveOrganization:retrieveOrganizationReducer,
  retrievePoint:retrievePointReducer,
  retrieveTrash:retrieveTrashReducer,
  communityUpdate:updateCommunityReducer,
  updateOrganization:updateOrganizationReducer,
  updateTrash:updateTrashReducer,
  joinArea:joinAreaReducer,
  deleteAdminArea:deleteAdminAreaReducer,
  deleteCommunity:deleteCommunityReducer,
  deleteOrganization:deleteOrganizationReducer,
  deletePoint:deletePointReducer,
  deleteReport:deleteReportReducer,
  blacklistAdd:addToBlacklistReducer,
  appealBlacklist:appealBlacklistReducer,
  trashCreateDirect:createTrashDirectReducer,
});

const initialState = {
  userLogin: { userInfo: null },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const fetchUserInfoFromStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error retrieving user info from AsyncStorage:', error);
    return null;
  }
};

const initializeStore = () => {
  return async (dispatch) => {
    try {
      const userInfo = await fetchUserInfoFromStorage();
      if (userInfo) {
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: userInfo });
      }
    } catch (error) {
      console.error('Error initializing store:', error);
    }
  };
};

store.dispatch(initializeStore());

export default store;

