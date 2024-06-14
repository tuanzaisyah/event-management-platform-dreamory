import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { Button, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Home = () => {
  const [filter, setFilter] = useState("All");

  const { isLoading, error, data } = useQuery({
    queryKey: ["event"],
    queryFn: () =>
      newRequest.get("/event").then((res) => {
        return res.data;
      }),
  });

  if (isLoading) {
    return "loading";
  }

  if (error) {
    return "Something went wrong";
  }

  const filteredEvent = data.filter((event) => {
    if (filter === "All") {
      return true;
    } else {
      return event.status === filter;
    }
  });

  return (
    <>
      <Navbar />
      <Container
        sx={{
          paddingTop: "5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography>Event Status: </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: ".5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setFilter("Ongoing")}
            >
              Ongoing
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setFilter("Completed")}
            >
              Completed
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong"
            : filteredEvent.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
