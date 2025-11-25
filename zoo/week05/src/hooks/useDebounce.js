import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간 후에 value를 debouncedValue로 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // value나 delay가 변경되면 기존 타이머 지움(워크북에 있는 개념을 구현한 것 ) (cleanup)
    //왜냐하면 마지막값을 기준으로하니까(주기적으로 이루어지는 그거랑 다름)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // delay도 의존성 배열에 포함!

  //최종반환
  return debouncedValue;
}

export default useDebounce;
