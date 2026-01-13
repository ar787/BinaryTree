import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type InputHTMLAttributes,
} from "react";

type DebounceInputProps = {
  onDebounce: (value: string) => void;
  delay?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export default function DebounceInput({
  onDebounce,
  delay = 500,
  ...rest
}: DebounceInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onDebounce(inputValue);
    }, delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return <input value={inputValue} onChange={handleInputChange} {...rest} />;
}
