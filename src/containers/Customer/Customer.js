import { Navigate, Route, Routes } from "react-router-dom";
import { CustomerDetails, CustomerTable, CustomerForm } from ".";

const Customer = () => {
  return (
    <Routes>
      <Route path="" element={<CustomerTable />} exact />
      <Route path="form">
        <Route index element={<CustomerForm />} />
        <Route path=":id" element={<CustomerForm />} />
      </Route>
      <Route path="details/:id" element={<CustomerDetails />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default Customer;
