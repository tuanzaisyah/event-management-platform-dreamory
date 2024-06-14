import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

const EventCard = ({ event }) => {
  const thumbnailUrl = "http://localhost:8800/images/";
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140, width: 500 }}
        image={thumbnailUrl + event.thumbnail}
      ></CardMedia>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {event.name}
        </Typography>
        <Typography
          sx={{
            backgroundColor: event.status === "Ongoing" ? "#D0FBE6" : "#E2EDFD",
            color: event.status === "Ongoing" ? "#0F9D58" : "#0E62EA",
            display: "inline-block",
            fontSize: ".8rem",
            padding: "0.3rem 1rem",
            borderRadius: "1.5rem",
          }}
        >
          {event.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/event/${event._id}`} style={{ textDecoration: "none" }}>
          <Button size="small">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default EventCard;
