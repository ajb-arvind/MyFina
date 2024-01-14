import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const PasswordResetDialog = ({
  open,
  handleClose,
  resetEmail,
  setResetMessage,
}) => {
  function handleChangePassword(email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetMessage({
          message: 'Password reset email sent!',
          isSuccess: true,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setResetMessage({ message: errorMessage, isSuccess: false });
      });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleChangePassword(resetEmail || email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will Email you instructions to reset your password.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Send Reset Email</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default PasswordResetDialog;
