const initialState = {
    loginName: "",
}

function rootReducer(state=initialState,action){
    switch(action.type){
        case 'add':
            {
                const {item} = action;
                return {...state, loginName:item}
            }
        case 'delete':
        return state.loginName="";

        default :
        return state;
    }
};

export default rootReducer;