//스토어(store)
//애플리케이션의 상태(state)를 저장하는 객체

//스토어를 생성하려면 createStore를 import해야한다.
//decrecate는 신경 안써도 된다.
import {createStore} from 'redux'

//이 리듀서는 애플리케이션의 상태 변경 로직을 정의한다.
import counterReducer from './reducer'

//createStore함수를 호출하여 스토어 객체를 생성한다.
//reducer함수를 인자로 전달해 상태변경 로직을 정의한다.
//스토어는 애플리케이션 전체의 상태를 관리하고
//액션이 발생하면 reducer를 통해 상태를 업데이트한다.
const store = createStore(counterReducer)

export default store








