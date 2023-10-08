import { createContext } from "react";
import ZIM from "zego-zim-web";

export const ZimContext = createContext<{
  zim: ZIM | null;
  setZim: (zim: ZIM | null) => void;
}>({ zim: null, setZim: () => {} });
