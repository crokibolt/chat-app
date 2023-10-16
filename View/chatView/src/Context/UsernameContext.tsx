import { createContext } from "react";

export const usernameContext = createContext("");
export const setUsernameContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);
