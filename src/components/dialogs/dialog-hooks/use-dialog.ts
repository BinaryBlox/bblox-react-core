import { useState } from "react";

export const useDialog = (intialOpen = false) => {
  const [isOpen, setIsOpen] = useState(intialOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close, setIsOpen };
};
