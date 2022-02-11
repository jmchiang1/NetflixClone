const ListReducer = (state, action) => {
  switch (action.type) {
    //  GET LIST
    case "GET_LISTS_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,  //returns list object if successful 
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    //CREATE LIST
    case "CREATE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_LIST_SUCCESS":
      return {
        lists: [...state.lists, action.payload],  //add new list to existing lists  
        isFetching: false,
        error: false,
      };
    case "CREATE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //UPDATE LIST
    case "UPLOAD_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPLOAD_LIST_SUCCESS":
      return {
        lists: state.lists.map( //map through list that match list id?
          (list) => list._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPLOAD_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //DELETE LIST
    case "DELETE_LIST_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_LIST_SUCCESS":
      return {  //filter out list by id
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_LIST_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ListReducer;
