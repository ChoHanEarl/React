import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [movie, setMovie] = useState([])

  // useEffect
  // 컴포넌트가 렌더링 된 후에 실행된다.
  // useEffect(() => {
  // 렌더링에 영향을 주지 않는 코드들
  // },[])

  // 방법 1
  let options = {
    headers:{"Content-Type" : "application/json"},
      url : 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=82ca741a2844c5c180a208137bb92bd7&targetDt=20241001',
      method : 'get'
  }

  // 버튼을 누르기 전까지는 절대 실행이 안됨
  const handleClick = () => {
    axios(options)
    .then(response => {
      console.log(response.data.boxOfficeResult.dailyBoxOfficeList)
      setMovie(response.data.boxOfficeResult.dailyBoxOfficeList)
    })
  }

  const movieTable = ( 
  <table border="1">
    <tr>
      <td>제목</td>
      <td>개봉날짜</td>
      <td>박스오피스 순위</td>
      <td>관객 수</td>
    </tr>
  </table>)

  // 방법 2
  // const handleClick = () => {
  //   axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json')
  // }

  return (
    <div className="App">
      <button onClick={handleClick}>일별 박스오피스 내용 가져오기</button>
    </div>
  );
}

export default App;
