// 1. 단일 아이템의 타입 정의
export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string; // '25,000' 처럼 쉼표가 있어서 string입니다.
  img: string;
  amount: number;
}

export interface CartContextType {
  items: CartItem[]; // 상품 '목록' (배열)
  check: (i: number, change: number) => void; // 함수
  totalAmount: number;
  totalPrice: number;
}