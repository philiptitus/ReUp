import axios from 'axios';
import { API_URL } from '../constants/URL';
// Action to create an organization
export const createOrganization = (organizationData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_ORGANIZATION_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/organizations/`, organizationData, config);

        dispatch({
            type: 'CREATE_ORGANIZATION_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_ORGANIZATION_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};







export const createTrashDirect = (trashData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_TRASH_DIRECT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        console.log(trashData)
        const { data } = await axios.post(`${API_URL}/api/v1/trash/direct/`, trashData, config);

        dispatch({
            type: 'CREATE_TRASH_DIRECT_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_TRASH_DIRECT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to retrieve an organization
export const retrieveOrganization = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'RETRIEVE_ORGANIZATION_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/organizations/${id}/`, config);

        dispatch({
            type: 'RETRIEVE_ORGANIZATION_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'RETRIEVE_ORGANIZATION_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to update an organization
export const updateOrganization = (id, organizationData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'UPDATE_ORGANIZATION_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/organizations/${id}/`, organizationData, config);

        dispatch({
            type: 'UPDATE_ORGANIZATION_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_ORGANIZATION_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to delete an organization
export const deleteOrganization = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DELETE_ORGANIZATION_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/organizations/${id}/`, config);

        dispatch({
            type: 'DELETE_ORGANIZATION_SUCCESS',
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_ORGANIZATION_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const verifyTrash = (status) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'VERIFY_TRASH_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const payload = { status };
        console.log("The Payload", payload);
        
        const { data } = await axios.post(`${API_URL}/api/v1/trash/verify/`, payload, config);

        dispatch({
            type: 'VERIFY_TRASH_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'VERIFY_TRASH_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to reset verify trash state
export const resetVerifyTrash = () => ({
    type: 'VERIFY_TRASH_RESET',
});

// Action to update trash
export const updateTrash = (id, trashData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'UPDATE_TRASH_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/trash/${id}/update/`, trashData, config);

        dispatch({
            type: 'UPDATE_TRASH_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_TRASH_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to retrieve trash
export const retrieveTrash = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'RETRIEVE_TRASH_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/trash/${id}/`, config);

        dispatch({
            type: 'RETRIEVE_TRASH_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'RETRIEVE_TRASH_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to create a point
export const createPoint = (pointData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_POINT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log(pointData)
        const { data } = await axios.post(`${API_URL}/api/v1/point/`, pointData, config);

        dispatch({
            type: 'CREATE_POINT_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_POINT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};




// Action to retrieve a point
export const retrievePoint = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'RETRIEVE_POINT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/point/${id}/`, config);
        dispatch({
            type: 'RETRIEVE_POINT_SUCCESS',
            payload: data,
        });



    } catch (error) {
        dispatch({
            type: 'RETRIEVE_POINT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to join an area
export const joinArea = (areaData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'JOIN_AREA_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        console.log(areaData)
        const { data } = await axios.post(`${API_URL}/api/v1/join/`, areaData, config);

        dispatch({
            type: 'JOIN_AREA_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'JOIN_AREA_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to delete a point
export const deletePoint = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DELETE_POINT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/point/${id}/delete/`, config);

        dispatch({
            type: 'DELETE_POINT_SUCCESS',
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_POINT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to create a community
export const createCommunity = (communityData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_COMMUNITY_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/community/`, communityData, config);

        dispatch({
            type: 'CREATE_COMMUNITY_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_COMMUNITY_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to update a community
export const updateCommunity = (id, communityData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'UPDATE_COMMUNITY_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`${API_URL}/api/v1/community/${id}/update/`, communityData, config);

        dispatch({
            type: 'UPDATE_COMMUNITY_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'UPDATE_COMMUNITY_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};





// Action to retrieve a community
export const retrieveCommunity = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'RETRIEVE_COMMUNITY_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/community/${id}/get/`, config);
        console.log(data)


        dispatch({
            type: 'RETRIEVE_COMMUNITY_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'RETRIEVE_COMMUNITY_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to delete a community
export const deleteCommunity = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DELETE_COMMUNITY_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/community/${id}/delete/`, config);

        dispatch({
            type: 'DELETE_COMMUNITY_SUCCESS',
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_COMMUNITY_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createAdminArea = (adminAreaData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_ADMIN_AREA_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log(adminAreaData);

        const { data } = await axios.post(`${API_URL}/api/v1/newarea/`, adminAreaData, config);

        dispatch({
            type: 'CREATE_ADMIN_AREA_SUCCESS',
            payload: data,
        });

        // Reset the state after a successful creation
        dispatch({ type: 'RESET_CREATE_ADMIN_AREA' });

    } catch (error) {
        dispatch({
            type: 'CREATE_ADMIN_AREA_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to retrieve an admin area
export const retrieveAdminArea = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'RETRIEVE_ADMIN_AREA_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/admin-areas/${id}/`, config);
        dispatch({
            type: 'RETRIEVE_ADMIN_AREA_SUCCESS',
            payload: data,
        });
        // console.log(data)

    } catch (error) {
        dispatch({
            type: 'RETRIEVE_ADMIN_AREA_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



export const fetchRandomInsight = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'FETCH_RANDOM_INSIGHT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_URL}/api/v1/insights/` , config);

        dispatch({
            type: 'FETCH_RANDOM_INSIGHT_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_RANDOM_INSIGHT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to delete an admin area
export const deleteAdminArea = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DELETE_ADMIN_AREA_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/area/${id}/delete/`, config);

        dispatch({
            type: 'DELETE_ADMIN_AREA_SUCCESS',
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_ADMIN_AREA_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to create a report
export const createReport = (reportData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'CREATE_REPORT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/newreport/`, reportData, config);

        dispatch({
            type: 'CREATE_REPORT_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'CREATE_REPORT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to delete a report
export const deleteReport = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'DELETE_REPORT_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`${API_URL}/api/v1/reports/${id}/`, config);

        dispatch({
            type: 'DELETE_REPORT_SUCCESS',
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_REPORT_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};





// Action to add to blacklist
export const addToBlacklist = (blacklistData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'ADD_TO_BLACKLIST_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log(blacklistData)

        const { data } = await axios.post(`${API_URL}/api/v1/blacklist/add/`, blacklistData, config);

        dispatch({
            type: 'ADD_TO_BLACKLIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'ADD_TO_BLACKLIST_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

// Action to remove from blacklist
export const removeFromBlacklist = (blacklistData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'REMOVE_FROM_BLACKLIST_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/v1/blacklist/remove/`, blacklistData, config);

        dispatch({
            type: 'REMOVE_FROM_BLACKLIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'REMOVE_FROM_BLACKLIST_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



// Action to remove staff
export const removeStaff = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'REMOVE_STAFF_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${API_URL}/api/users/remove/${id}/`, {}, config);

        dispatch({
            type: 'REMOVE_STAFF_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'REMOVE_STAFF_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};
// Action to appeal blacklist
export const appealBlacklist = (appealData) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'APPEAL_BLACKLIST_REQUEST' });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        console.log(appealData)

        const { data } = await axios.post(`${API_URL}/api/v1/blacklist/appeal/`, appealData, config);

        dispatch({
            type: 'APPEAL_BLACKLIST_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'APPEAL_BLACKLIST_FAILURE',
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};


export const createTrash = (trashData) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'CREATE_TRASH_REQUEST' });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`${API_URL}/api/v1/trash/`, trashData, config);
      dispatch({ type: 'CREATE_TRASH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'CREATE_TRASH_FAILURE',
        payload: error.response ? error.response.data : 'An error occurred',
      });
    }
  };
