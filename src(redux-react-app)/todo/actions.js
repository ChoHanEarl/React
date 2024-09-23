export const addTodo = (id, text) => ({
    type: 'ADD_TODO',
    id,
    text
})

export const removeTodo = (id) => ({
    type: 'REMOVE_TODO',
    id
})