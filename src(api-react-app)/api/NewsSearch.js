import React, {useState} from 'react'
import axios from 'axios'

function NewsSearch() {

    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const [error, setError] = useState(null)

    const searchNews = () => {

        try {
            const response = axios.get('http://localhost:9090/api/',{
                params: {query} 
            })

            //검색 결과를 result 상태에 저장
            response.then(res => setResult(res.data.items))
        } catch(err) {
            setError('뉴스 검색 실패')
        }
    }

    const handleSearch = (e) => {
        if(!query) {
            alert('입력하셈')
        }
        e.preventDefault()
        searchNews()
    }

    return(
        <div>
            <h1>네이버 뉴스 검색</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='뉴스 제목을 검색하세요'
                />
                <button type="submit">검색</button>
            </form>

            <ul>

            </ul>
        </div>
    )
}
export default NewsSearch
