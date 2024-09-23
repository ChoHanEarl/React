const initialState = {
    cart: []
}

function cartReducer(state = initialState, action) {
    switch(action.type){
        case 'ADD_TO_CART':
            const existingProduct = state.cart.find(item => item.id === action.id)
            if(existingProduct){
                return{
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.id
                        ? {...item, quantity:item.quantity + 1}
                        : item
                    ),
                }
            } else {
                return{
                    ...state,
                    cart: [...state.cart, { id: action.id, name: action.name, quantity: 1}]
                }
            }
            case 'REMOVE_FROM_CART':
                return{
                    ...state,
                    cart: state.cart.filter(item => item.id !== action.id)
                }
            default:
                return state
    }
}

export default cartReducer