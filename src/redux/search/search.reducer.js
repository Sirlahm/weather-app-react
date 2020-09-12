

const INITIAL_STATE = {
    searchItem: '',
    searchState:''
    
}

const searchReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
    case 'GET_SEARCH' : 
    return {
        ...state,
        searchItem: action.payload
        
    }
    case 'GET_SEARCH_STATE' : 
    return {
        ...state,
        searchState: action.payload
        
    }
    default: 
    return state;
   }
   
    
}

export default searchReducer