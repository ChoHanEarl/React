import React, {useState, useRef} from 'react'

function InputSample() {
    const [inputs, setInputs] = useState({
        이름 : "",
        nickname : ""
    })
    const nameFocus = useRef()
    const {이름, nickname} = inputs

    const onChange = (e) => {
        //e.target : 이벤트가 발생하는 주체
        //value : 이벤트가 발생하는 주체에 들어있는 값(그 요소의 현재 값)
        //name : 그 요소의 name속성
        const {value, name} = e.target
        setInputs({
            ...inputs, //기존의 상태를 복사(inputs에 들어있는 요소를 펼쳐서 나타냄)
            [name] : value // 그 태그에 value를 변경해줘
        })
    }

    const onReset = (e) => {
        //버튼을 누르면 input태그에 있는 내용을 비우고
        //다시 이름을 입력할 수 있도록 포커스 잡아주기
        setInputs({
            이름 : "",
            nickname : ""
        })
        nameFocus.current.focus();
    }

    return(
        <div>
            <input 
                name="이름"
                placeholder='이름을 작성해주세요'
                value={이름}
                ref={nameFocus}
                onChange={onChange}
            />
            <br></br>
            <input
                name="nickname"
                placeholder='닉네임을 쓰세요'
                value={nickname}
                onChange={onChange}
            />
            <br></br>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : </b>
                {이름}({nickname})
            </div>
        </div>
    )
}
export default InputSample