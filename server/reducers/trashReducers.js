export const createTrashReducer = (state = { }, action) => {
    switch (action.type) {
      case 'CREATE_TRASH_REQUEST':
        return { loading: true };
      case 'CREATE_TRASH_SUCCESS':
        return { loading: false, trash: action.payload, success: true };
        case 'CREATE_TRASH_FAILURE':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const verifyTrashReducer = (state = {}, action) => {
    switch (action.type) {
        case 'VERIFY_TRASH_REQUEST':
            return { loading: true };
        case 'VERIFY_TRASH_SUCCESS':
            return { loading: false, success: true };
        case 'VERIFY_TRASH_FAILURE':
            return { loading: false, error: action.payload };
        case 'VERIFY_TRASH_RESET':
            return {};
        default:
            return state;
    }
};



export const createTrashDirectReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_TRASH_DIRECT_REQUEST':
            return { loading: true };
        case 'CREATE_TRASH_DIRECT_SUCCESS':
            return { loading: false, success: true, trash: action.payload };
        case 'CREATE_TRASH_DIRECT_FAILURE':
            return { loading: false, error: action.payload };
        case 'CREATE_TRASH_DIRECT_RESET':
            return {};
        default:
            return state;
    }
};



  export const updateTrashReducer = (state = { trash: null }, action) => {
    switch (action.type) {
      case 'UPDATE_TRASH_REQUEST':
        return { loading: true };
      case 'UPDATE_TRASH_SUCCESS':
        return { loading: false, trash: action.payload, success: true };
      case 'UPDATE_TRASH_FAILURE':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const retrieveTrashReducer = (state = { trash: null }, action) => {
    switch (action.type) {
      case 'RETRIEVE_TRASH_REQUEST':
        return { loading: true };
      case 'RETRIEVE_TRASH_SUCCESS':
        return { loading: false, trash: action.payload };
      case 'RETRIEVE_TRASH_FAILURE':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  



  export const createPointReducer = (state = { point: null }, action) => {
    switch (action.type) {
        case 'CREATE_POINT_REQUEST':
            return { loading: true };
        case 'CREATE_POINT_SUCCESS':
            return { loading: false, point: action.payload, success: true };
        case 'CREATE_POINT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const retrievePointReducer = (state = { point: null }, action) => {
    switch (action.type) {
        case 'RETRIEVE_POINT_REQUEST':
            return { loading: true };
        case 'RETRIEVE_POINT_SUCCESS':
            return { loading: false, point: action.payload };
        case 'RETRIEVE_POINT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const joinAreaReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case 'JOIN_AREA_REQUEST':
            return { loading: true };
        case 'JOIN_AREA_SUCCESS':
            return { loading: false, user: action.payload, success: true };
        case 'JOIN_AREA_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deletePointReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_POINT_REQUEST':
            return { loading: true };
        case 'DELETE_POINT_SUCCESS':
            return { loading: false, success: true };
        case 'DELETE_POINT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createCommunityReducer = (state = { community: null }, action) => {
    switch (action.type) {
        case 'CREATE_COMMUNITY_REQUEST':
            return { loading: true };
        case 'CREATE_COMMUNITY_SUCCESS':
            return { loading: false, community: action.payload, success: true };
        case 'CREATE_COMMUNITY_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const updateCommunityReducer = (state = { community: null }, action) => {
    switch (action.type) {
        case 'UPDATE_COMMUNITY_REQUEST':
            return { loading: true };
        case 'UPDATE_COMMUNITY_SUCCESS':
            return { loading: false, community: action.payload, success: true };
        case 'UPDATE_COMMUNITY_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};



export const retrieveCommunityReducer = (state = { community: null }, action) => {
    switch (action.type) {
        case 'RETRIEVE_COMMUNITY_REQUEST':
            return { loading: true };
        case 'RETRIEVE_COMMUNITY_SUCCESS':
            return { loading: false, community: action.payload };
        case 'RETRIEVE_COMMUNITY_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteCommunityReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_COMMUNITY_REQUEST':
            return { loading: true };
        case 'DELETE_COMMUNITY_SUCCESS':
            return { loading: false, success: true };
        case 'DELETE_COMMUNITY_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createAdminAreaReducer = (state = { adminArea: null }, action) => {
    switch (action.type) {
        case 'CREATE_ADMIN_AREA_REQUEST':
            return { loading: true };
        case 'CREATE_ADMIN_AREA_SUCCESS':
            return { loading: false, adminArea: action.payload, success: true };
        case 'CREATE_ADMIN_AREA_FAILURE':
            return { loading: false, error: action.payload };
        case 'RESET_CREATE_ADMIN_AREA':
            return { adminArea: null };
        default:
            return state;
    }
};

export const retrieveAdminAreaReducer = (state = { adminArea: null }, action) => {
    switch (action.type) {
        case 'RETRIEVE_ADMIN_AREA_REQUEST':
            return { loading: true };
        case 'RETRIEVE_ADMIN_AREA_SUCCESS':
            return { loading: false, adminArea: action.payload };
        case 'RETRIEVE_ADMIN_AREA_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteAdminAreaReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_ADMIN_AREA_REQUEST':
            return { loading: true };
        case 'DELETE_ADMIN_AREA_SUCCESS':
            return { loading: false, success: true };
        case 'DELETE_ADMIN_AREA_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


// insightReducer.js

export const fetchRandomInsightReducer = (state = { insight: null }, action) => {
    switch (action.type) {
        case 'FETCH_RANDOM_INSIGHT_REQUEST':
            return { loading: true };
        case 'FETCH_RANDOM_INSIGHT_SUCCESS':
            return { loading: false, insight: action.payload, success: true };
        case 'FETCH_RANDOM_INSIGHT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const createReportReducer = (state = { report: null }, action) => {
    switch (action.type) {
        case 'CREATE_REPORT_REQUEST':
            return { loading: true };
        case 'CREATE_REPORT_SUCCESS':
            return { loading: false, report: action.payload, success: true };
        case 'CREATE_REPORT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteReportReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_REPORT_REQUEST':
            return { loading: true };
        case 'DELETE_REPORT_SUCCESS':
            return { loading: false, success: true };
        case 'DELETE_REPORT_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const removeStaffReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REMOVE_STAFF_REQUEST':
            return { loading: true };
        case 'REMOVE_STAFF_SUCCESS':
            return { loading: false, success: true };
        case 'REMOVE_STAFF_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const addToBlacklistReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TO_BLACKLIST_REQUEST':
            return { loading: true };
        case 'ADD_TO_BLACKLIST_SUCCESS':
            return { loading: false, success: true };
        case 'ADD_TO_BLACKLIST_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const removeFromBlacklistReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REMOVE_FROM_BLACKLIST_REQUEST':
            return { loading: true };
        case 'REMOVE_FROM_BLACKLIST_SUCCESS':
            return { loading: false, success: true };
        case 'REMOVE_FROM_BLACKLIST_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const appealBlacklistReducer = (state = {}, action) => {
    switch (action.type) {
        case 'APPEAL_BLACKLIST_REQUEST':
            return { loading: true };
        case 'APPEAL_BLACKLIST_SUCCESS':
            return { loading: false, success: true };
        case 'APPEAL_BLACKLIST_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};



export const createOrganizationReducer = (state = { organization: null }, action) => {
    switch (action.type) {
        case 'CREATE_ORGANIZATION_REQUEST':
            return { loading: true };
        case 'CREATE_ORGANIZATION_SUCCESS':
            return { loading: false, organization: action.payload, success: true };
        case 'CREATE_ORGANIZATION_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const retrieveOrganizationReducer = (state = { organization: null }, action) => {
    switch (action.type) {
        case 'RETRIEVE_ORGANIZATION_REQUEST':
            return { loading: true };
        case 'RETRIEVE_ORGANIZATION_SUCCESS':
            return { loading: false, organization: action.payload };
        case 'RETRIEVE_ORGANIZATION_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateOrganizationReducer = (state = { organization: null }, action) => {
    switch (action.type) {
        case 'UPDATE_ORGANIZATION_REQUEST':
            return { loading: true };
        case 'UPDATE_ORGANIZATION_SUCCESS':
            return { loading: false, organization: action.payload, success: true };
        case 'UPDATE_ORGANIZATION_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteOrganizationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'DELETE_ORGANIZATION_REQUEST':
            return { loading: true };
        case 'DELETE_ORGANIZATION_SUCCESS':
            return { loading: false, success: true };
        case 'DELETE_ORGANIZATION_FAILURE':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
