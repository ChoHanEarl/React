export const addToCart = (id, name) => ({
    type: 'ADD_TO_CART',
    id,
    name
})

export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    id
})