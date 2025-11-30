import { useContext, useState, type ReactNode } from "react";
import { createContext } from "react";
import cartItems from "./data";
import type { CartContextType } from "./types";


export const CartContext = createContext<CartContextType|null>(null)

export function CartProvider({children}:{children:ReactNode}) {
    const [items, setCount] = useState(cartItems)
    const check = (i:number, change:number) => {
        const newItems = items.map((data,index)=>
        {if(i==index){
            const a = data.amount + change
            return { ...data, amount: a };
        }return data
    })
    setCount(newItems)
    }
    const totalAmount = items.reduce((acc, cur) => {
        return acc + cur.amount;}, 0);
    const totalPrice = items.reduce((acc, cur) => {
        return acc + Number(cur.price);}, 0);

  return (
    <CartContext.Provider value={{items,check,totalPrice,totalAmount}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);

  //  만약 context가 null이면 (Provider 없이 썼으면) 에러를 냅니다.
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  //  여기까지 왔다면 context는 절대 null이 아닙니다.
  return context;
};