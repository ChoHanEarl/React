import logo from './logo.svg';
import './App.css';
//Redux와 React를 연결하는 데 필요한 Provider, useDispatch, useSelector를 import한다.
import {Provider, useDispatch, useSelector} from 'react-redux'
//Redux 스토어를 import
import store from './redux/store';
//액션 생성 함수를 import
//아래 함수들은 상태를 변경하는 액션을 dispatch하기 위해 사용된다.
import { increment, decrement } from './redux/actions';

import React, {useState} from 'react'
import { addTodo, removeTodo } from './todo/actions';

import { login, logout } from './login/actions'

import { addToCart, removeFromCart } from './cart/actions';

// function Counter() {
//   //useSelector : Redux에서 store에 저장되어 있는 state를 읽어오는 hook
//   const count = useSelector(state => state.count)

//   //useDispatch : store에 action을 보낼 수 있는 hook
//   const dispatch = useDispatch()
//   return (
//     <div>
//       {/* 현재 state인 count값을 화면에 출력한다. */}
//       <h1>Counter : {count}</h1>
//       {/* Increment버튼을 클릭하면 increment() 액션을 dispatch한다. */}
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       {/* Decrement버튼을 클릭하면 decrement() 액션을 dispatch한다. */}
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//     </div>
//   );
// }

function ShopApp() {
  const products = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' },
  ]
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  
  const handleAddToCart = (id, name) => {
    dispatch(addToCart(id, name))
  }

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  return(
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleAddToCart(product.id, product.name)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} (x{item.quantity})
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function App() {
  // const [input, setInput] = useState('')//입력값을 관리하는 state
  // const todos = useSelector((state) => state.todos)//redux에서 todos state 가져옴
   const dispatch = useDispatch() //액션을 dispatch하는 함수 가져오기

  //추가 버튼을 눌렀을 때 input태그에 있는 내용을 배열에 추가하기
  // const handleAddTodo = () => {
  //   if(input.trim()) { //input태그의 값이 비었는지 검사
  //     dispatch(addTodo(Date.now(), input)) //id와 내용을 액션에 전송
  //     setInput('') //입력창 비우기
  //   }
  // }

  // const handleRemoveTodo = (id) => {
  //   dispatch(removeTodo(id)) //Todo를 삭제
  // }

  const [usernameInput, setUsernameInput] = useState('')
  const { isLoggedIn, username } = useSelector((state) => state)
  
  const handleLogin = () => {
    if(usernameInput.trim()){
      dispatch(login(usernameInput))
      setUsernameInput('')
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return(
    // Provider : store를 애플리케이션 전체에 제공
    // Provider 안에 있는 모든 컴포넌트는 store에 접근할 수 있다.
    // <Provider store = {store}>
    //   <Counter />
    // </Provider>

      /* <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul> */
     
      <div>
      <h1>Login Status</h1>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    )
  }

export default ShopApp;
