const initialState = {
    username: '',
    points: 0,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default userReducer;
  