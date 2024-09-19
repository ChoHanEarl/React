import React from 'react'
import { Navigate } from 'react-router-dom'

function NotFound(){
    // 페이지를 잘못 입력하거나 요청했을 때 root 경로로 돌아간다
    return <Navigate to="/" />  
}

export default NotFound