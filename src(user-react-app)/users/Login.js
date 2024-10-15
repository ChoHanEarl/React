import React from 'react';
import { signin } from '../service/ApiService'; 

const Login = () => {

    const handlesubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);//제출된 폼 태그의 정보
        const userId = data.get("userId");
        const pwd = data.get("pwd");
        console.log(userId);
        console.log(pwd);

        //db에 넘겨서 아이디 비밀번호 검증받고 토큰을 받아서
        //로컬스토리지에 저장
        signin({userId : userId, pwd:pwd});
    }

    function toSignup(){
        window.location.href="/signup"
    }

    return(
        <form noValidate onSubmit={handlesubmit}>
            <table border="1" align="center">
                <caption>:::로그인:::</caption>
                <tbody>
                <tr>
                    <th>아이디</th>
                    <td><input name="userId"/></td>
                </tr>
                <tr>
                    <th>비밀번호</th>
                    <td><input name="pwd" type="password" /></td>
                </tr>
                <tr>
                    <td colSpan="2" align="center">
                        <input type="submit" value="로그인"/>
                        <input type="button" value="회원가입" onClick={toSignup}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Login;