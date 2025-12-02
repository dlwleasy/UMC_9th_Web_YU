import {configureStore} from "@reduxjs/toolkit";
import cartReducer from '../slices/cartSlice';

//1. 저장소 생성
function createStore() {
    
    const store = configureStore ({
        //2. reducer 설정
        reducer: {
            cart: cartReducer
        },
    });
    
    return store;
}
//store를 활용하려면 내보내야 한다.
//여기서 실행해서 store 빼주기
//싱글톤패턴
const store = createStore();

export default store;
//RootState와 AppDispatch 타입을 store 에서 
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

