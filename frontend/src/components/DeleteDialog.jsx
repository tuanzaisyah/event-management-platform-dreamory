import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import newRequest from "../utils/newRequest";
import getUser from "../utils/getUser";

const DeleteDialog = ({ openModal, setOpenModal, eventData, onDelete }) => {
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState("");
  const user = getUser();

  const handleClose = () => {
    setOpenModal(false);
    setPassword("");
    setVerification("");
  };

  const handleDelete = async () => {
    try {
      // Verify password before deleting
      const response = await newRequest.post("/auth/verifyPassword", {
        email: user.email,
        password: password,
      });

      if (response.status === 200) {
        onDelete(eventData);
        setOpenModal(false);
        setPassword("");
        setVerification("");
      } else {
        setVerification("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setVerification("Failed to verify password");
    }
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
      <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
        {verification}
      </Typography>
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
