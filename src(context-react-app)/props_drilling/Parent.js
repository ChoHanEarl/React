import React from 'react'
import Child from './Child'
function Parent() {
    return <Child />
}
//Child 컴포넌트에서 받아서 다시 GrandChild컴포넌트로 전달
//GrandChild컴포넌트에서 이름과 나이 출력하기

export default Parent