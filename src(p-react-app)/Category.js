import React from 'react'
import {Link} from 'react-router-dom'

function Categories(){
    const categories = [
        { id: 1, name: '전자제품' },
        { id: 2, name: '의류' },
        { id: 3, name: '식료품' },
        ];

    return(
        <div>
            <h1>카테고리 목록</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories