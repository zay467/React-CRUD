import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, DetailsRow } from "../../components";
import { useAxios } from "../../hooks";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });
  const { data } = useQuery(`CustomerData${id}`, () =>
    api.get(`/api/customer/${id}`).then((res) => {
      if (res.status === 200) return res.data;
      else navigate(-1);
    })
  );

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
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Details
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
        <DetailsRow name="ID" value={data?.id} />
        <DetailsRow name="Name" value={data?.name} />
        <DetailsRow name="Age" value={data?.age} />
        <DetailsRow name="Phone" value={data?.phone} />
        <DetailsRow name="email" value={data?.email} />
        <DetailsRow name="Date & Time" value={data?.createdAt} />
      </Box>
    </Box>
  );
};

export default CustomerDetails;
