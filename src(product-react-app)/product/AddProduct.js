import React from 'react'
import { useState } from 'react'
import { call } from '../service/ApiService';

function AddProduct(props){
    
    let setItems = props.setItems

    const [product, setProduct] = useState({productName : "", productStock:0, productPrice:0})

    const {productName, productStock, productPrice} = product;

    let addItem = props.addItem

    const onChange = (e) => {
        //이벤트가 일어난 대상에게서 value와 name을 가져온다.
        const { value, name } = e.target;
        setProduct({
            ...product, //기존의 input 객체를 복사한 뒤
            [name]:value //name 키를 가진 value로 설정
        })
    }

    //등록버튼을 눌렀을 때 input태그에 들어있는 정보를 boot로 보낸다.
    const onButtonClick = () => {
        call("/product","POST",product)
        .then(result => {setItems(result.data)})
        //입력필드 초기화
        setProduct({productName:'',productStock:0,productPrice:0})
        //입력창 닫기
        props.setOpen(false)
    }

    const resetFields = () => {
        setProduct({ productName: "", productStock: 0, productPrice: 0})
    }

    return(
        <div className="register-wrap" style={{width:'500px'}}>
            <div><input style={{width:'98%'}} value={productName} name='productName' onChange={onChange} placeholder='상품 이름' /></div>
            <div><input style={{width:'98%'}} value={productStock} name='productStock' onChange={onChange} placeholder='상품 재고' /></div>
            <div><input style={{width:'98%'}} value={productPrice} name='productPrice' onChange={onChange} placeholder='상품 가격' /></div>
            <input type="button" value="등록" onClick={onButtonClick} style={{width:'100%'}} />
        </div>
    )
}

export default AddProduct