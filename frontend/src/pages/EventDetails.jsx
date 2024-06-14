import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const EventDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const thumbnailUrl = "http://localhost:8800/images/";

  const handleBack = () => {
    navigate(-1);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["event._id"],
    queryFn: () =>
      newRequest.get(`/event/${id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Container
      sx={{
        paddingTop: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <Card sx={{ maxWidth: 1000 }}>
          <CardActions>
            <Button size="small" onClick={handleBack}>
              <ArrowBackOutlinedIcon sx={{ marginRight: ".5rem" }} />
              Back
            </Button>
          </CardActions>

          <CardMedia
            sx={{ height: 500, width: 1000, objectFit: "contain" }}
            image={thumbnailUrl + data.thumbnail}
          ></CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Start Date:</strong>{" "}
                {new Date(data.startDate).toLocaleDateString()}
                <br />
                <strong>End Date:</strong>{" "}
                {new Date(data.endDate).toLocaleDateString()}
                <br />
                <strong>Location:</strong> {data.location}
                <br />
              </Typography>

              {data.status && (
                <Typography
                  sx={{
                    backgroundColor:
                      data.status === "Ongoing" ? "#D0FBE6" : "#E2EDFD",
                    color: data.status === "Ongoing" ? "#0F9D58" : "#0E62EA",
                    display: "inline-block",
                    fontSize: ".8rem",
                    padding: "0.3rem 1rem",
                    borderRadius: "1.5rem",
                  }}
                >
                  {data.status}
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default EventDetails;
