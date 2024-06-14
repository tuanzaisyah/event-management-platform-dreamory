import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import getUser from "../utils/getUser";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("user", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#222222",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
            <Button variant="h5">Home</Button>
          </Link>
          {user ? (
            <Link
              to={"/dashboard"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button variant="h5">Dashboard</Button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div>
          {user ? (
            <Link
              onClick={handleLogout}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button variant="contained" color="primary">
                <ExitToAppIcon sx={{ cursor: "pointer" }} /> Logout
              </Button>
            </Link>
          ) : (
            <>
              <Link
                to={"/auth/login"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: ".5rem" }}
                >
                  Login
                </Button>
              </Link>
              <Link
                to={"/auth/register"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
