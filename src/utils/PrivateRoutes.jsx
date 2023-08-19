import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
function PrivateRoutes ({ logged }) {


  const [cookies] = useCookies(["token"]);
  
  if(!logged && !cookies.token) {
    return <Navigate to="/login" />
  }
  
  axios.defaults.headers.common["Authorization"] = `${cookies.token}`;

  return <Outlet />
};

export default PrivateRoutes;

