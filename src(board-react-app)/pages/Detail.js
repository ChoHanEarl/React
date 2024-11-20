import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import WritePost from './WritePost'
import BoardList from './BoardList'


const Detail = () => {
    const { id } = useParams()
    const board = BoardList.find((board) => board.id === parseInt(id))

    return(
        <div>
            <h1>{board.title}</h1>
        </div>
    )
}

export default Detail
