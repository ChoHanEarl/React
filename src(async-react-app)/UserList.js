import React, {useEffect, useState} from 'react'

function UserList(){
    const [users, SetUsers] = useState([]) //유저정보를 담기 위한 state
    const [loading, SetLoading] = useState(true) //로딩 상태 관리
    const [error, SetError] = useState(null) //에러 상태 관리

    useEffect(() => {
        //비동기적으로 데이터 호출
        const fetchUsers = async () => {
            try{
                //jsonplaceholder로부터 얻어온 데이터를 response에 저장
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if(!response.ok){
                    throw new Error('데이터를 불러오는데 실패했습니다')
                }
                const data = await response.json()
                SetUsers(data) //상태에 데이터를 저장
            } catch(err){
                SetError(err.message)
            } finally{
                SetLoading(false)
            }
        }

        fetchUsers()
    },[])

    if(loading){
        return <p>로딩중...</p>
    }

    if(error) {
        return <p>에러 발생 : {error}</p>
    }

    return(
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul> 
        </div>
    )
}

export default UserList
