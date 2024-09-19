import React, {useRef} from 'react'

function FocusInput(){
    //inputRef : {current : null}
    const inputRef = useRef(null)

    //클릭했을 때 함수
    const handleClick = () => {
        inputRef.current.focus()
    }

    return(
        <div>
            {/* ref={변수명}을 하면 {current : 태그의 정보}가 된다. */}
            <input ref={inputRef} type="text"/>
            <button onClick={handleClick}>Focus the input</button>
        </div>
    )
}
export default FocusInput