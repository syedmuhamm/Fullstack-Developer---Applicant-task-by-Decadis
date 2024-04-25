import { ErrorProps } from '../UserList/UserList';

// Utility function for clearing errors by label and props interface for a dialog to create a new user
export const clearError = (setError: (prevError: (prevState: ErrorProps) => ErrorProps) => void, label: string) => {
  setError(prevError => ({
    errors: prevError.errors.filter(err => err.label !== label)
  }));
};

export interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}
