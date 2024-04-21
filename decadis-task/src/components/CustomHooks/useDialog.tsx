import { useState } from 'react';

//To manage the state of each dialog (create, edit, delete, run action). This hook will handle the opening and closing of dialogs.
const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return { isOpen, openDialog, closeDialog };
};

export default useDialog;
