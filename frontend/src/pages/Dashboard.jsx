import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Link } from "react-router-dom";
import moment from "moment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventModal from "../components/EventModal";
import DeleteDialog from "../components/DeleteDialog";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModaltype] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["event"],
    queryFn: () =>
      newRequest.get("/event").then((res) => {
        return res.data;
      }),
  });

  const handleAddEvent = () => {
    setModaltype("add");
    setSelectedEvent(null);
    setOpenModal(true);
  };

  const handleUpdateEvent = (params) => () => {
    setModaltype("update");
    setSelectedEvent(params.row);
    setOpenModal(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await newRequest.delete(`/event/${eventId}`);
      refetch();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row._id}</div>;
      },
    },
    {
      field: "name",
      headerName: "Event Name",
      width: 200,
      renderCell: (params) => {
        return <div>{params.row.name}</div>;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => {
        const formattedDate = moment(params.row.startDate).format(
          "DD MMMM, YYYY"
        );
        return <div>{formattedDate}</div>;
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      renderCell: (params) => {
        const formattedDate = moment(params.row.endDate).format(
          "DD MMMM, YYYY"
        );
        return <div>{formattedDate}</div>;
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 90,
      renderCell: (params) => {
        return <div>{params.row.location}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => {
        let statusColor = "";
        if (params.row.status === "Ongoing") {
          statusColor = "#0F9D58";
        } else if (params.row.status === "Completed") {
          statusColor = "#0E62EA";
        }

        return <div style={{ color: statusColor }}>{params.row.status}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-center bg-blue-300 text-blue-400 py-1 px-4 rounded-lg">
            <Button onClick={handleUpdateEvent(params)}>
              <EditOutlinedIcon />
            </Button>

            <Link to={`/event/${params.row._id}`}>
              <Button>
                <VisibilityIcon />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setDeleteEventId(params.row._id);
                setOpenDeleteDialog(true);
              }}
              color="error"
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Container sx={{ paddingTop: "5rem" }}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Event List</Typography>
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Add Event
        </Button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div style={{ height: 850, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        )}
      </div>

      <EventModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        refetch={refetch}
        modalType={modalType}
        eventData={selectedEvent}
      />

      <DeleteDialog
        openModal={openDeleteDialog}
        setOpenModal={setOpenDeleteDialog}
        eventData={deleteEventId}
        onDelete={handleDeleteEvent}
      />
    </Container>
  );
};

export default Dashboard;
