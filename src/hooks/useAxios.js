import axios from "axios";
import { useSetRecoilState } from "recoil";
import { withAlert } from "../recoil/snackbar";

const baseURL = process.env.REACT_APP_BASE_URL;

const useAxios = (props) => {
  const openAlert = useSetRecoilState(withAlert);

  const axiosInstance = axios.create({
    baseURL,
    validateStatus: function (status) {
      return status < 500;
    },
  });

  axiosInstance.interceptors.response.use((res) => {
    if (res.config.method !== "get") {
      if (props?.autoSnackbar) {
        if (res.status === 200) {
          openAlert({ status: res.status, detail: res.data.message });
        } else {
          if (res.status === 400) {
            openAlert({ status: res.status, detail: res.data.errors[0].msg });
          } else {
            openAlert({ status: res.status, detail: res.data.message });
          }
        }
      }
    }
    return res;
  });
  return axiosInstance;
};

export default useAxios;
