import React, {useState, useEffect} from 'react'

function Sol2(){
    const[count, setCount] = useState(0)
    const[text, setText] = useState("")

    const inputHandler = (e) => {
        console.log("input 값이 바뀜")
        setText(e.target.value)
    }

    const countHandler = () => {
        console.log("count값이 바뀜")
        setCount(count + 1)
    }

    useEffect(() => {
        console.log("렌더링 완료")
    },[])

    return(
        <div>
            <h3>{count}</h3>
            <button onClick={countHandler}>+1</button>
            <hr/>
            <input onChange={inputHandler} type="text"/>
            <h3>{text}</h3>
        </div>
    )
}
export default Sol2


