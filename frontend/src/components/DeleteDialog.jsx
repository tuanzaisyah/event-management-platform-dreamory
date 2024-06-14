import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const DeleteDialog = ({ openModal, setOpenModal, eventData, onDelete }) => {
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setPassword("");
  };

  const handleDelete = () => {
    onDelete(eventData);
    setOpenModal(false);
    setPassword("");
  };

  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>Delete Event</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete the event?
        </Typography>
        <TextField
          margin="dense"
          label="Enter Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#333333" }}>
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="primary"
          disabled={password.trim() === ""}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
