import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Dispatch, FC, SetStateAction } from 'react';
import { Transition } from './Transition';

interface ApprovalModalProps {
  openState: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> };
  bodyText: string;
  approveBtnText?: string;
  cancelBtnText?: string;
  func: () => void;
}

const ApprovalModal: FC<ApprovalModalProps> = ({
  openState: { open, setOpen },
  bodyText,
  approveBtnText,
  cancelBtnText,
  func,
}) => {
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToggle}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> {bodyText}</DialogTitle>

        <DialogActions>
          <Button variant="contained" sx={{ color: '#fff' }} onClick={func}>
            {approveBtnText || 'Submit'}
          </Button>
          <Button variant="contained" onClick={handleToggle} color="error">
            {cancelBtnText || 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApprovalModal;
