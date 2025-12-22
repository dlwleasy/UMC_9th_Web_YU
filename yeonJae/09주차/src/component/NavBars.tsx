import { useCart } from "./contextapi";

export const Navbars = () => {
    
    const {items,check,totalPrice,totalAmount} =useCart()

  return (
    <>
      <header>
        <div className="brand-name">nara Han</div>
        <div className="cart-icon">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-badge">{totalAmount}</span>
        </div>
      </header>
    </>
  );
};