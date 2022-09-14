import { RecoilRoot } from "recoil";
import { CustomSnackbar } from "./hocs/CustomSnackbar";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dashboard } from "./containers";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <CustomSnackbar>
          <Router>
            <Routes>
              <Route path="dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Router>
        </CustomSnackbar>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
