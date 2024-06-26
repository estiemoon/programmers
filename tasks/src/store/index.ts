import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";


const store = configureStore({
    reducer 
})

//store안에 들어 있는 것들을 가져온다
export type RootState = ReturnType<typeof store.getState> // return하는 타입이 들어감 string처럼
export type AppDispatch = typeof store.dispatch;


// useAppSelector
// useTypedSelector
// hooks로 새롭게 만들어서 내장함수로 하면 위에처럼 계속 굳이 가져오지 않아도 됨 => redux.ts

export default store;

