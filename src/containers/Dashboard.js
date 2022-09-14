import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { Appbar, ResponsiveDrawer } from "../components";
import { Customer } from "./Customer";

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} />
      <ResponsiveDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Routes>
          <Route path={`customer/*`} element={<Customer />} />
          <Route path="*" element={<Navigate to="customer" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
