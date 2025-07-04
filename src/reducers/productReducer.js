import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS,
    ALL_PRODUCT_DETAILS_REQUEST,
    ALL_PRODUCT_DETAILS_SUCCESS,
    ALL_PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    FEATURED_PRODUCTS_REQUEST,
    FEATURED_PRODUCTS_SUCCESS,
    FEATURED_PRODUCTS_FAIL,
} from '../constants/productConstants.js'

export const featuredProductsReducer = (state = {featuredProducts:[]},action)=>{
    switch(action.type){
        case FEATURED_PRODUCTS_REQUEST:
            return{
                loading:true,
                featuredProducts:[],
            }
        case FEATURED_PRODUCTS_SUCCESS:
                return{
                    loading:false,
                    featuredProducts:action.payload,
                }    
        case FEATURED_PRODUCTS_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
        default:
            return state;
    }
}
// in reducer we bring data from backend on the basis of the request status which is handled by in actions
export const productReducer =(state ={products:[]} , action)=>{
switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:    
        return{
            loading:true,
            products:[],
        }
    case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products : action.payload.products,    //payload is fancy name of data
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage,
                // filteredProductsCount:action.payload.filteredProductsCount,
            }  
    case ADMIN_PRODUCT_SUCCESS:
        return{
            loading:false,
            products:action.payload,
        }        
   case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
        return{
         loading:false,
         error:action.payload,
        }        
    case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        }    
 default:
        return state
}
};

export const productDetailsReducer =(state ={product:{}} , action)=>{
    switch (action.type) {
        case ALL_PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state,
            }
        case ALL_PRODUCT_DETAILS_SUCCESS:
                return{
                    loading:false,
                    product : action.payload,    //payload is fancy name of data
                }  
       case ALL_PRODUCT_DETAILS_FAIL:
            return{
             loading:false,
             error:action.payload,
            }        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }    
     default:
            return state ;
    }
    };
    
    export const newProductReducer = (state={ product:{} },action)=>{
        switch(action.type){
            case NEW_PRODUCT_REQUEST:
                return{
                    ...state,
                    loading:true,
                }
            case NEW_PRODUCT_SUCCESS:
                return {
                    loading:false,
                    success:action.payload.success,
                    product:action.payload.product,
                }    
            case NEW_PRODUCT_FAIL:
                return {
                    ...state,
                    loading:false,
                    error:action.payload,
                }    
            case NEW_PRODUCT_RESET:
                return {
                    ...state,
                    loading:false,
                    success:false
                }    
            case CLEAR_ERRORS:
                    return {
                      ...state,
                      error: null,
                    };
            default:
                    return state;    
        }
    }    

export const newReviewReducer = (state={},action)=>{
    switch(action.type){
        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload,
            }    
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }    
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading:false,
                success:false
            }    
        case CLEAR_ERRORS:
                return {
                  ...state,
                  error: null,
                };
        default:
                return state;    
    }
}    
export const deleteProduct=(state={},action)=>{
    switch(action.type){
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:    
            return{
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload,
            }
        case UPDATE_PRODUCT_SUCCESS:
             return{
                    ...state,
                    loading:false,
                    isUpdated:action.payload,
             }    
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:    
            return{
                ...state,
                loading:false,
                error:action.payload,
            }    
        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                loading:false,
                isDeleted:false,
            }    
        case UPDATE_PRODUCT_RESET:
           return{
                ...state,
                 loading:false,
                isUpdated:false,
            }        
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }    
        default:
            return state
    }
}