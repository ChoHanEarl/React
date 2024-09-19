import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(){
    return(
        <nav>
            {/* Link는 HTML의 <a>태그와 비슷한 역할을 한다. */}
            <Link to="/home">홈</Link><br/>
            <Link to="/about">소개</Link>
        </nav>
    )
}

export default Navbar