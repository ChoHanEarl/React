import React from 'react';
import { useState,useEffect } from 'react';
import '../css/style.css'
import { call } from '../service/ApiService';
import AddProduct from './AddProduct';

function P_info(){

    //상품정보를 가지고 있는 state
    const [items, setItems] = useState([])

    const [open, setOpen] = useState(false)

    const[ selectedIndex, setSelectedIndex] = useState(null);
    const[orderCount, setOrderCount] = useState('');

    //P_info 컴포넌트가 처음 렌더링될 때 실행
    useEffect(() => {
        //백엔드에게 요청하기
        call("/product", "GET")
          .then(result => {
            setItems(result.data); 
          })
        
    }, [])

    //상품추가 창을 여는 함수
    const onButtonClick = () => {
        setOpen(true)
    }

    //클릭한 라디오버튼의 index를 저장하는 함수
    const handleRadioChange = (index) => {
        console.log("클릭한 index : " + index);
        setSelectedIndex(index); //state에 저장
        setOrderCount(''); //라디오 버튼 선택 시 주문 개수를 초기화
    }

    //주문개수의 값이 변할 때마다 state를 저장하는 함수
    const handleOrderCountChange = (event) => {
        setOrderCount(event.target.value);
    }

    //주문하기
    const orderProduct = () => {
        //주문하기 전에 유효성검사를 수행
        if(selectedIndex && orderCount > 0 && items[selectedIndex-1]) {
            const orderData = {
                productId : items[selectedIndex - 1].productId,
                productCount : parseInt(orderCount)
            }
            //db에 추가 요청을 보내고
            call("/orders","POST",orderData)
                //items에 다시 반영
                .then(result => {setItems(result.data)})
                // setSelectedIndex(null)
                // setOrderCount('')
        } else {
            alert("상품을 선택하고 개수를 입력해주세요")
        }

    }

    const addItem = (item) => {
        call("/product", "POST", item)
        .then(result => setItems(result.data))
    }
    console.log(items)

    let productItems = items.length > 0 && (
        <div>
        <table border="1">
        <thead>
        <tr>
            <th>단일 선택</th>
            <th>주문 개수</th>
            <th>상품 번호</th>
            <th>상품 이름</th>
            <th>상품 재고</th>
            <th>상품 가격</th>
            <th>등록 날짜</th>
            <th>수정 날짜</th>
        </tr>
        </thead>
        <tbody>
            {/* db에서 넘어온 상품들을 출력 */}
            {/* map함수의 특징
            index를 설정할 수 있다. */}
        {items.map((item, index) => (
            <tr key={item.productId}>
                <td>
                    <input type="radio" name="productId" onChange={() => handleRadioChange(index+1)} />
                    {/* // checked={selectedIndex === index+1} /> */}
                </td>
                <td>
                    <input 
                        value={selectedIndex === index+1 ? orderCount : ''} 
                        onChange={handleOrderCountChange}
                        readOnly={selectedIndex !== index+1} 
                    />
                </td>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.productStock}</td>
                <td>{item.productPrice}</td>
                <td>{item.registerDate}</td>
                <td>{item.updateDate}</td>
            </tr>
        ))}
        </tbody>
        
        
        {/* db에서 넘어온 상품들을 출력 */}
        </table>
        <button onClick={orderProduct}>주문완료</button><button type="button" onClick="location.href='/order/list'">주문내역</button>
        </div>
      );

      //상품추가버튼
      let addProductButton = <button type="button" onClick={onButtonClick}>상품추가</button>

      //상품추가화면
      let addProduct = addProductButton

      if(open){
        addProduct = <AddProduct setItems = {setItems} setOpen = {setOpen}/>
      }
      
    return(
        <div className='container'>
            {addProduct}
            {productItems}
        </div>
    );
}

export default P_info;