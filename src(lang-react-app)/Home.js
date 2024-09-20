import React from 'react'
import {useParams} from 'react-router-dom'

function Home() {
    const { lang } = useParams();

    const content = {
        ko: {
            greeting: '안녕하세요!',
            description: '이것은 한국어 페이지입니다.'
        },
        en: {
            greeting: 'Hello!',
            description: 'This is an English page.'
        },
        jp: {
            greeting: 'こんにちは！',
            description: 'これは日本語のページです。',
        }
    }

    const languageContent = content[lang]

    if(!languageContent) {
        return <div>지원하지 않는 언어입니다.</div>
    }

    return(
        <div>
            <h1>{languageContent.greeting}</h1>
            <p>{languageContent.description}</p>
        </div>
    )
}

export default Home