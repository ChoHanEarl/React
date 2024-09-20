import React, {useContext} from 'react'
import {UserContext} from './UserContext'

function GrandChild() {

    //useContext()함수를 사용해서
    //UserContext로부터 데이터를 가져온다.
    //user상태와 SetUser함수를 가져와서 컴포넌트 내에서 사용할 수 있다.
    const {user, SetUser} = useContext(UserContext)

    //UserContext에 들어있는 내용
    //user : {name: 'John Doe', age: 30},
    //SetUser() 함수

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Age : {user.age}</p>
            <button onClick={() => SetUser({name:'Jane Doe', age : 28})}>
                Change User
            </button>
        </div>
    )
}

export default GrandChild