import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";
import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
    cartItems: CartItems;
    amount : number;
    total : number;
    price ?: number;
    
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total : 0,
 
};

//cartSlice 생성
//createSlice -> reduxToolkit에서 제공
const cartSlice = createSlice({
    name: 'cart',
    initialState, //key=value라서
    reducers: {
        //todo 증가
        increase: (state, action: PayloadAction<{id:string}>): void=>{
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem): boolean => cartItem.id === itemId);
            
            if(item) {
            item.amount += 1;
        }
        },
        
        //todo 감소
        decrease : (state, action: PayloadAction<{id:string}>): void=>{
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem): boolean => cartItem.id === itemId);
            
            if(item) {
            item.amount -= 1;
        }
        },
        //todo remove item
        removeItem: (state, action: PayloadAction<{id:string}>): void=>{
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) : boolean => cartItem.id != itemId);
        },
        //todo clearCart
        clearCart: (state): void => {
            state.cartItems = [];
        },
        //todo 총액 계산
        calculateTotals: (state) : void => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item): void => {
                amount += item.amount;
                total += item.amount * item.price;
            })
            state.amount = amount;
            state.total = total;
        }


    },

});

export const {increase, decrease, removeItem, clearCart, calculateTotals} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;