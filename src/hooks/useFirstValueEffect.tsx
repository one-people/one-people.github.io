import { useEffect, useRef } from "react";

export default function useFirstValueEffect(value: any, effect: Function) {
  const isFirstValue = useRef(false);

  useEffect(() => {
    if (isFirstValue.current) {
      effect();
    } else {
      if (value !== null && value !== undefined && value !== '') {
        isFirstValue.current = false;
        effect();
      }
    }
  }, [value]);
}
