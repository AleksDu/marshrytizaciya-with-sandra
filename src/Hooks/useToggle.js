import { useState } from "react";

export const useToggle = (initValue) => {
  const [state, setState] = useState(initValue);
  const toggle = () => {
    setState((prev) => !prev);
  };
  //   console.log('useToggle', state);
  return [state, toggle];
};
