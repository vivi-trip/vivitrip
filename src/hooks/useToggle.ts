import { useCallback, useState } from "react";

export interface ToggleReturnProps {
  state: boolean;
  toggle: () => void;
  toggleOpen: () => void;
  toggleClose: () => void;
}

type UseToggle = (initialState: boolean) => ToggleReturnProps;

const useToggle: UseToggle = (initialState: boolean = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const toggleOpen = useCallback(() => {
    setState(true);
  }, []);

  const toggleClose = useCallback(() => {
    setState(false);
  }, []);

  return { state, toggle, toggleOpen, toggleClose };
};

export default useToggle;
