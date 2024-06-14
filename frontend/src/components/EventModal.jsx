import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Input,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import moment from "moment";

const EventModal = ({
  openModal,
  setOpenModal,
  refetch,
  modalType,
  eventData,
}) => {
  const isUpdateType = modalType === "update";
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [status, setStatus] = useState("");
  const thumbnailUrl = "http://localhost:8800/images/";

  useEffect(() => {
    if (isUpdateType && eventData) {
      setName(eventData.name || "");
      setStartDate(moment(eventData.startDate).format("YYYY-MM-DD") || "");
      setEndDate(moment(eventData.endDate).format("YYYY-MM-DD") || "");
      setLocation(eventData.location || "");
      setStatus(eventData.status || "");

      if (!thumbnail) {
        setThumbnailPreview(eventData.thumbnailUrl + thumbnail || null);
      }
    } else {
      // Clear form fields when modalType is 'add'
      setName("");
      setStartDate("");
      setEndDate("");
      setLocation("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setStatus("");
    }
  }, [openModal, isUpdateType, eventData, thumbnail]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnailPreview(eventData.thumbnailUrl || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedEvent = {
        name,
        startDate,
        endDate,
        location,
        status,
      };

      if (isUpdateType) {
        // Update existing event
        const formData = new FormData();
        formData.append("name", thumbnail.name);
        formData.append("file", thumbnail);

        // Upload thumbnail if it's changed
        if (thumbnail) {
          try {
            await newRequest.post("/upload", formData);
            updatedEvent.thumbnail = thumbnail.name;
          } catch (error) {
            console.error("Error uploading thumbnail:", error);
          }
        }

        await newRequest.put(`/event/${eventData._id}`, updatedEvent);
      } else {
        // Create new event
        if (thumbnail) {
          const formData = new FormData();
          formData.append("name", thumbnail.name);
          formData.append("file", thumbnail);

          try {
            await newRequest.post("/upload", formData);
            updatedEvent.thumbnail = thumbnail.name;
          } catch (error) {
            console.error("Error uploading thumbnail:", error);
          }
        }

        await newRequest.post("/event", updatedEvent);
      }

      setOpenModal(false);
      refetch();
    } catch (error) {
      console.error(
        "Error saving event:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>
        {isUpdateType ? "Update Event" : "Create New Event"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Event Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {isUpdateType && (
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        )}
        <Box mt={2}>
          <Typography variant="subtitle1">Event Picture:</Typography>
          <Input
            accept="image/*"
            id="thumbnail"
            type="file"
            onChange={handleThumbnailChange}
            fullWidth
          />
        </Box>
        {thumbnailPreview && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle1">Thumbnail Preview:</Typography>
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ width: "100%", maxWidth: "200px", marginTop: "10px" }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenModal(false)}
          style={{ color: "#333333" }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {isUpdateType ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
