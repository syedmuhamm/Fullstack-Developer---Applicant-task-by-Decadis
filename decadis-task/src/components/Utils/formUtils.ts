import { ErrorProps } from '../UserList/UserList';

export const clearError = (setError: (prevError: (prevState: ErrorProps) => ErrorProps) => void, label: string) => {
  setError(prevError => ({
    errors: prevError.errors.filter(err => err.label !== label)
  }));
};

export interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}
