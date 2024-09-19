import React from 'react'
import {useParams} from 'react-router-dom'

function ProductDetail(){
    const {categoryId, productId} = useParams()

    const p_detail = [
        { id: 1, name: '노트북', description: '최신형 노트북입니다.', categoryId: '1' },
        { id: 2, name: '스마트폰', description: '최신 스마트폰입니다.', categoryId: '1' },
        { id: 3, name: '셔츠', description: '멋진 셔츠입니다.', categoryId: '2' },
        { id: 4, name: '청바지', description: '편안한 청바지입니다.', categoryId: '2' },
        { id: 5, name: '사과', description: '신선한 사과입니다.', categoryId: '3' },
        { id: 6, name: '우유', description: '신선한 우유입니다.', categoryId: '3' },
        ];

    const products = p_detail.find(
        item => item.id === Number(productId) && item.categoryId === categoryId
    )

    if(!products){
        return(
            <div>상품을 찾을 수 없습니다.</div>
        )
    }

    return(
        <div>
            <h1>{products.name}</h1>
            <p>카테고리 ID : {categoryId}</p>
            <p>상품 ID : {productId}</p>
            <p>설명 : {products.description}</p>
        </div>
    )
}

export default ProductDetail