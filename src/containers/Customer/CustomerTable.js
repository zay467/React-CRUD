import { Button } from "@mui/material";
import { memo, useState } from "react";
import { CustomTable, DeleteDialog } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "age",
    numeric: false,
    disablePadding: false,
    label: "Age",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date & Time",
  },
];

const CustomerTable = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const api = useAxios({ autoSnackbar: true });
  const [selected, setSelected] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { isLoading, data } = useQuery("CustomerData", () =>
    api.get("/api/customer").then((res) => res.data)
  );

  const { mutate } = useMutation((id) => api.delete(`/api/customer/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("CustomerData");
    },
  });

  return (
    <>
      <CustomTable
        tableConfig={{
          headCells: headCells,
          tableName: "Customer",
          maxHeight: "62vh",
          atom: "CustomerTableAtom",
        }}
        data={data || []}
        isLoading={isLoading}
        toolbarButtons={{
          whenNoneSelected: [
            {
              id: "Customer table new button",
              component: memo(({ ...rest }) => (
                <Button variant="outlined" size="small" {...rest}>
                  New
                </Button>
              )),
              callback: (selected) => {
                navigate("form");
              },
            },
          ],
          whenOneSelected: [
            {
              id: "Customer table edit button",
              component: memo(({ ...rest }) => (
                <Button variant="contained" size="small" {...rest}>
                  Edit
                </Button>
              )),
              callback: (selected) => {
                navigate(`form/${selected[0].id}`);
              },
            },
            {
              id: "Customer table detail button",
              component: memo(({ ...rest }) => (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: "5px" }}
                  {...rest}
                >
                  Details
                </Button>
              )),
              callback: (selected) => {
                navigate(`details/${selected[0].id}`);
              },
            },
            {
              id: "Customer table delete button",
              component: memo(({ ...rest }) => (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{ marginLeft: "5px" }}
                  {...rest}
                >
                  Delete
                </Button>
              )),
              callback: (selected) => {
                setSelected(selected);
                setOpenDeleteDialog(true);
              },
            },
          ],
          whenMoreThanOneSelected: [],
        }}
      />
      <DeleteDialog
        isOpen={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        callback={() => {
          mutate(selected[0].id);
          setOpenDeleteDialog(false);
        }}
      />
    </>
  );
};

export default CustomerTable;
