import React from 'react'
import {useState,useRef, useEffect} from 'react';
import { call, signup } from '../service/ApiService';
function Signup(){

    const[idCheck , setIdCheck] = useState(null);

    const userIdRef = useRef();
    //중복체크 버튼을 눌러 아이디 중복을 확인한다.

    function isIdCheck(){
        const userId = userIdRef.current.value;
        //GET으로 전달할때
        //call("/users/idCheck?userId="+userId,"GET")
        call("/users/idCheck","POST",{userId:userId})
            .then(result => {
                //지역변수
                const isAvailable= result.value;

                setIdCheck(isAvailable)
                
                if(userId === ''){
                    alert("아이디를 입력하세요");
                    return;
                }

                if(isAvailable === true){
                    alert("사용가능한 아이디입니다.")
                    return;
                }

                if(isAvailable === false){
                    alert("중복되는 아이디입니다.")
                    return;
                }
            })
    }



    //내용을 다 입력하고 가입 버튼을 누르면 db에 저장

    const handlesubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);//form태그의 정보를 얻어온다.
        let userId = data.get("userId");
        let pwd = data.get("pwd");
        let name = data.get("name");
        let email = data.get("email");

        let user = {userId:userId,
                    pwd:pwd,
                    name:name,
                    email:email}
        //idCheck의 값이 true면 생성가능
        //false면 중복되거나 or 체크를 안했다는 뜻
        if(idCheck){
            //id,pwd,name,email정보를 가지고 db에 추가 요청
            signup(user)
                .then(result => {
                    window.location.href="/";
                })
        } else {
            alert("아이디 중복체크를 하세요");
            return;
        }
    }

    //중복체크를 안할시 넘어가면 안된다.
    //alert('중복체크하세요')을 띄운다.





    return(
        <form noValidate onSubmit={handlesubmit}>
            <table border="1">
                <caption>:::회원가입:::</caption>
                <tr>
                    <th>아이디</th>
                    <td>
                        <input name="userId" id="userId" ref={userIdRef}/>
                        <input type="button" value="중복체크" onClick={isIdCheck}/>
                    </td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td>
                        <input name="pwd" type="password"/>
                    </td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>
                        <input name="name"/>
                    </td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>
                        <input name="email"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" align="center">
                        <input type="submit" value="가입"/>
                        <input type="button" value="취소" onClick={()=> {window.location.href="/"}}/>
                    </td>
                </tr>
            </table>
        </form>
    )
}

export default Signup;