import { Divider, TextField, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useAxios } from "../../hooks";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { BackButton } from "../../components";
import { useMutation, useQuery, useQueryClient } from "react-query";

const CustomerForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });

  useQuery(`CustomerData${id}`, () => {
    if (!id) return;
    return api.get(`/api/customer/${id}`).then((res) => {
      if (res.status === 200) setDetails(res.data);
      else navigate(-1);
    });
  });

  const { mutate, isLoading } = useMutation(
    (id) => {
      if (id) {
        return api.put(`/api/customer/${id}`, details);
      }
      return api.post("/api/customer", details);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("CustomerData");
        if (res.status === 200) navigate(-1);
      },
    }
  );

  const [details, setDetails] = useState({
    name: null,
    age: null,
    phone: null,
    email: null,
    address: null,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingLeft: "12px",
        }}
        variant="dense"
        disableGutters={true}
      >
        <BackButton backFunction={() => navigate(-1)} />
        <Typography variant="h5">{id ? "Edit" : "New"}</Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "20px 10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Name</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.name}
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Age</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.age}
            name="age"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Phone</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.phone}
            name="phone"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">email</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.email}
            name="email"
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography variant="p">Address</Typography>
          </Box>
          <TextField
            size="small"
            sx={{ width: "70%" }}
            margin="dense"
            value={details?.address}
            name="address"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "20px 10px",
        }}
      >
        <LoadingButton
          loading={isLoading}
          variant="contained"
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={() => mutate(id)}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CustomerForm;
