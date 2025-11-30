import { useContext, useState } from "react";
import { useCart } from "./contextapi";




export const Homepage = () => {
    const {items,check,totalPrice,totalAmount} =useCart()
    
  return (
    <>
    
      <div className="container">
        {items.map((data,i)=><div className="item">
          <img
            src={data.img}
            alt="Album"
            className="album-art"
          ></img>
          <div className="item-info" key={i}>
            <div className="item-title">{data.title}</div>
            <div className="item-artist">{data.singer}</div>
            <div className="item-price">{data.price}</div>
          </div>
          <div className="quantity-control">
            <button className="qty-btn"  onClick={()=>check(i,-1)}>-</button>
            <span className="qty-display"  >{data.amount}</span>
            <button className="qty-btn" onClick={()=>check(i,+1)} >+</button>
          </div>
        </div>)}

      </div>
    </>
  );
};
