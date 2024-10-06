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
    BUDGET_CREATE_RESET,

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










    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAIL,



    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,





    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_CREATE_RESET,

    POST_CREATE_COMMENT_REQUEST,
    POST_CREATE_COMMENT_SUCCESS,
    POST_CREATE_COMMENT_FAIL,
    POST_CREATE_COMMENT_RESET,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_UPDATE_RESET,




    LIKE_CREATE_FAIL,
    LIKE_CREATE_REQUEST,
    LIKE_CREATE_SUCCESS,


} from '../constants/postConstants';

export const incomeCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_CREATE_REQUEST:
            return { loading: true };
        case INCOME_CREATE_SUCCESS:
            return { loading: false, success: true, income: action.payload };
        case INCOME_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_UPDATE_REQUEST:
            return { loading: true };
        case INCOME_UPDATE_SUCCESS:
            return { loading: false, success: true, income: action.payload };
        case INCOME_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INCOME_DELETE_REQUEST:
            return { loading: true };
        case INCOME_DELETE_SUCCESS:
            return { loading: false, success: true };
        case INCOME_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BUDGET_CREATE_REQUEST:
            return { loading: true };
        case BUDGET_CREATE_SUCCESS:
            return { loading: false, success: true, budget: action.payload };
        case BUDGET_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case BUDGET_CREATE_RESET:
            return {budget:{}}
        default:
            return state;
    }
};

export const budgetDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BUDGET_DELETE_REQUEST:
            return { loading: true };
        case BUDGET_DELETE_SUCCESS:
            return { loading: false, success: true };
        case BUDGET_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { loading: true };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};


export const checkExpiredPostsReducer = (state = { }, action) => {
    switch (action.type) {
      case 'CHECK_EXPIRED_POSTS_REQUEST':
        return { loading: true };
      case 'CHECK_EXPIRED_POSTS_SUCCESS':
        return { loading: false, post: action.payload, success: true };
      case 'CHECK_EXPIRED_POSTS_FAILURE':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { loading: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetDetailReducer = (state = { budget: {} }, action) => {
    switch (action.type) {
        case BUDGET_DETAIL_REQUEST:
            return { loading: true, ...state };
        case BUDGET_DETAIL_SUCCESS:
            return { loading: false, budget: action.payload };
        case BUDGET_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const budgetUpdateReducer = (state = { budget: {} }, action) => {
    switch (action.type) {
        case BUDGET_UPDATE_REQUEST:
            return { loading: true };
        case BUDGET_UPDATE_SUCCESS:
            return { loading: false, success: true, budget: action.payload };
        case BUDGET_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const incomeDetailReducer = (state = { income: {}, budget: {}, categories: [] }, action) => {
    switch (action.type) {
        case INCOME_DETAIL_REQUEST:
            return { loading: true, ...state };
        case INCOME_DETAIL_SUCCESS:
            return { loading: false, income: action.payload.income, budget: action.payload.budget, categories: action.payload.categories };
        case INCOME_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};




export const savingsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVINGS_UPDATE_REQUEST:
            return { loading: true };
        case SAVINGS_UPDATE_SUCCESS:
            return { loading: false, success: true, savings: action.payload };
        case SAVINGS_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userSavingsDetailReducer = (state = { savings: {} }, action) => {
    switch (action.type) {
        case USER_SAVINGS_DETAIL_REQUEST:
            return { loading: true, ...state };
        case USER_SAVINGS_DETAIL_SUCCESS:
            return { loading: false, savings: action.payload };
        case USER_SAVINGS_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const savingsDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SAVINGS_DELETE_REQUEST:
            return { loading: true };
        case SAVINGS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case SAVINGS_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

































export const postListReducer = (state = {posts:[]}, action) =>{
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { loading: true, posts: [] } 
        case POST_LIST_SUCCESS:
            return { loading: false, posts: action.payload }     
        case POST_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 




export const ComentListReducer = (state = {comments:[]}, action) =>{
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return { loading: true, comments: [] } 
        case COMMENT_LIST_SUCCESS:
            return { loading: false, comments: action.payload }     
        case COMMENT_LIST_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 






const initialStater = {
    loading: false,
    brands: [],
    error: null,
  };
  








export const postDetailsReducer = (state = { post: {likers: [], bookers: [], comments:[]}   }, action) =>{
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { loading: true, ...state }
        case POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload, success:true }     
        case POST_DETAILS_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 




export const postDeleteReducer = (state = {}, action) =>{
    switch (action.type) {
        case POST_DELETE_REQUEST:
            return { loading: true }
        case POST_DELETE_SUCCESS:
            return { loading: false, success:true }     
        case POST_DELETE_FAIL:
            return { loading: false, error:action.payload }
            
        default:
            return state
    
        
    }
} 


export const postCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true }
        case POST_CREATE_SUCCESS:
            return { loading: false,success:true, post: action.payload}     
        case POST_CREATE_FAIL:
            return { loading: false, error:action.payload }
        case POST_CREATE_RESET:
            return {}
            
        default:
            return state
    
        
    }
} 

export const postUpdateReducer = (state = {post:{}}, action) =>{
    switch (action.type) {
        case POST_UPDATE_REQUEST:
            return { loading: true }
        case POST_UPDATE_SUCCESS:
            return { loading: false,success:true, post: action.payload}     
        case POST_UPDATE_FAIL:
            return { loading: false, error:action.payload }
        case POST_UPDATE_RESET:
            return {post:{}}

            
        default:
            return state
    
        
    }
} 



export const postCommentCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case POST_CREATE_COMMENT_REQUEST:
            return { loading: true }
        case POST_CREATE_COMMENT_SUCCESS:
            return { loading: false,success:true, message:action.payload}     
        case POST_CREATE_COMMENT_FAIL:
            return { loading: false, error:action.payload }
        case POST_CREATE_COMMENT_RESET:
            return {}

            
        default:
            return state
    
        
    }
} 









export const LikeCreateReducer = (state = {}, action) =>{
    switch (action.type) {
        case LIKE_CREATE_REQUEST:
            return { loading: true } 
        case LIKE_CREATE_SUCCESS:
            return { 
            loading: false,
            success: true,
            detail: action.payload
             }     
        case LIKE_CREATE_FAIL:
            return { 
                loading: false,
                 error:action.payload,
                 }
         
        default:
            return state
    
        
    }
} 


