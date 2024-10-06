import axios from 'axios';
import {
    INCOME_CREATE_REQUEST,
    INCOME_CREATE_SUCCESS,
    INCOME_CREATE_FAIL,
    INCOME_UPDATE_REQUEST,
    INCOME_UPDATE_SUCCESS,
    INCOME_UPDATE_FAIL,
    INCOME_DELETE_REQUEST,
    INCOME_DELETE_SUCCESS,
    INCOME_DELETE_FAIL,
    BUDGET_CREATE_REQUEST,
    BUDGET_CREATE_SUCCESS,
    BUDGET_CREATE_FAIL,
    BUDGET_DELETE_REQUEST,
    BUDGET_DELETE_SUCCESS,
    BUDGET_DELETE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    BUDGET_DETAIL_REQUEST,
    BUDGET_DETAIL_SUCCESS,
    BUDGET_DETAIL_FAIL,
    BUDGET_UPDATE_REQUEST,
    BUDGET_UPDATE_SUCCESS,
    BUDGET_UPDATE_FAIL,
    INCOME_DETAIL_REQUEST,
    INCOME_DETAIL_SUCCESS,
    INCOME_DETAIL_FAIL,
    SAVINGS_UPDATE_REQUEST,
    SAVINGS_UPDATE_SUCCESS,
    SAVINGS_UPDATE_FAIL,
    USER_SAVINGS_DETAIL_REQUEST,
    USER_SAVINGS_DETAIL_SUCCESS,
    USER_SAVINGS_DETAIL_FAIL,
    SAVINGS_DELETE_REQUEST,
    SAVINGS_DELETE_SUCCESS,
    SAVINGS_DELETE_FAIL,






    LIKE_CREATE_FAIL,
    LIKE_CREATE_REQUEST,
    LIKE_CREATE_SUCCESS,



    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,



    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,


    POST_CREATE_COMMENT_REQUEST,
    POST_CREATE_COMMENT_SUCCESS,
    POST_CREATE_COMMENT_FAIL,









} from '../constants/postConstants';

import API_URL from '../constants/URL';
import { TEST_URL } from '../constants/URL';

export const createIncome = (incomeData) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/income/`, incomeData, config);

        dispatch({
            type: INCOME_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateIncome = (id, incomeData) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
console.log( "the id is" + id)
        const { data } = await axios.put(`${API_URL}/api/v1/income/update/${id}/`, incomeData, config);

        dispatch({
            type: INCOME_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteIncome = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/income/delete/${id}/`, config);

        dispatch({
            type: INCOME_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: INCOME_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createBudget = (budgetData) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log(budgetData)

        const { data } = await axios.post(`${API_URL}/api/v1/budget/create/`, budgetData, config);

        dispatch({
            type: BUDGET_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteBudget = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/budget/${id}/delete/`, config);

        dispatch({
            type: BUDGET_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log("this is your categeory data: " + categoryData)

        const { data } = await axios.post(`${API_URL}/api/v1/categories/create/`, categoryData, config);

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateCategory = (id, categoryData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CATEGORY_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/category/${id}/update/`, categoryData, config);

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getBudgetDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/budget/${id}/`, config);

        dispatch({
            type: BUDGET_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateBudget = (id, budgetData) => async (dispatch, getState) => {
    try {
        dispatch({ type: BUDGET_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/budget/${id}/update/`, budgetData, config);

        dispatch({
            type: BUDGET_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BUDGET_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getIncomeDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: INCOME_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/income/${id}/`, config);

        dispatch({
            type: INCOME_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: INCOME_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateSavings = (id, savingsData) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVINGS_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };


        const { data } = await axios.put(`${API_URL}/api/v1/savings/${id}/update/`, savingsData, config);

        dispatch({
            type: SAVINGS_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SAVINGS_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getUserSavingsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SAVINGS_DETAIL_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/savings/${id}/`, config);

        dispatch({
            type: USER_SAVINGS_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_SAVINGS_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const deleteSavings = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVINGS_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/savings/${id}/delete/`, config);

        dispatch({
            type: SAVINGS_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: SAVINGS_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};















  














export const listPostDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${TEST_URL}/api/v1/${id}/`, config);

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};




export const deletePost = (postId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: POST_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`${TEST_URL}/api/v1/${postId}/delete/`, config);

        dispatch({
            type: POST_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



  
export const checkExpiredPosts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: 'CHECK_EXPIRED_POSTS_REQUEST' });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`${API_URL}/api/v1/posts/check-expired/`, config);
  
      dispatch({
        type: 'CHECK_EXPIRED_POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'CHECK_EXPIRED_POSTS_FAILURE',
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      });
    }
  };



export const deleteComment = (id) => async(dispatch, getState) => {
    try{
        
        dispatch({
            type: POST_DELETE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`${TEST_URL}/api/v1/comment/${id}/delete/`, config);
        
        dispatch({
            type: POST_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const createPost = () => async(dispatch, getState) => {
    try{
        console.log("I was Called")
        dispatch({
            type: POST_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${TEST_URL}/api/v1/new/`, {}, config);
console.log(data)
        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updatePost = (post) => async(dispatch, getState) => {
    try{
        console.log("i am being called")
        dispatch({
            type: POST_UPDATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`${TEST_URL}/api/v1/update/${post.id}/`, post, config);

        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const createpostComment = (postId, comment) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_CREATE_COMMENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`${TEST_URL}/api/v1/${postId}/comment/`, comment, config);


        dispatch({
            type: POST_CREATE_COMMENT_SUCCESS,
            payload: {
                data,
                message:
                    data && data.message
                        ? data.message
                        : 'Comment saved successfully', // Default message if not present
            },
        })
    } catch (error) {
        dispatch({
            type: POST_CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const createBookmark = (postId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: BOOKMARK_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${TEST_URL}/api/v1/${postId}/bookmark/`, {}, config);

        dispatch({
            type: BOOKMARK_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: BOOKMARK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createLike = (postId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: LIKE_CREATE_REQUEST

        })

        const {

            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${TEST_URL}/api/v1/${postId}/like/`, {}, config);

        dispatch({
            type: LIKE_CREATE_SUCCESS,
            payload:data
        })
        


    } catch (error) {
        dispatch({
            type: LIKE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


