import React, {useState, useEffect} from 'react'

function Sol3(){
    const [count, setCount] = useState(0)
    const [renderCount, setRenderCount] = useState(0)

    const clickHandler = () => {
        setCount(count+1)
    }

    useEffect(() => {
        setRenderCount(renderCount +1)
        console.log("렌더링 완료")
    },[count])

    return(
        <div>
            <h1>Count : {count}</h1>
            <h1>랜더링 횟수 : {renderCount}</h1>
            <button onClick={clickHandler}>클릭</button>
        </div>
    )
}

export default Sol3