import { useEffect, useState } from "react";

interface IUseDebounceParams<T = any> {
  value: T;
  debounceTime: number;
}

export const useDebounce = <T = any>({
  value,
  debounceTime,
}: IUseDebounceParams<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceTime);

    return () => clearTimeout(timeoutId);
  }, [value, debounceTime]);

  return debouncedValue;
};
