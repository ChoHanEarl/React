const initialState = {
    todos : []
}

function todoReducer(state = initialState, action) {
    switch(action.type){
        case 'ADD_TODO':
            return{
                ...state,
                todos: [...state.todos, {id: action.id, text:action.text}]
            }
        case 'REMOVE_TODO':
            return{
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            }
        default:
            return state
    }
}

export default todoReducer