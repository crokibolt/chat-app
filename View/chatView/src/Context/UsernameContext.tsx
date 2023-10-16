import { createContext } from "react";

export const setUsernameContext = createContext<React.Dispatch<
  React.SetStateAction<string>
> | null>(null);
