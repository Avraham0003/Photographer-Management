import {createBrowserRouter,RouterProvider,Route, createRoutesFromElements} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import EventById from "./pages/EventById";
import ShowAlbumPage from "./pages/ShowAlbumPage";
import ControlPanel from "./pages/ControlPanelPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import UploadPhotosForm from "./components/UploadPhotosForm/UploadPhotosForm";

import PrivateRoutes from "./utils/PrivateRoutes";
import UserContext from './context/UserContext';
import { useContext } from "react";

//import Header from './components/Header/Header';
function App() {

  const { isLogged } = useContext(UserContext);

  const router = createBrowserRouter(

    createRoutesFromElements(
<>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} /> 
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="*" element={<NotFoundPage />} /> 


          <Route element={<PrivateRoutes logged={isLogged} />}>
              <Route path="/controlpanel" element={<ControlPanel/>} />
              <Route path="/event/:event_id" element={<EventById/>} />
              <Route path="/showalbum/:event_id" element={<ShowAlbumPage/>} />
              <Route path="/upload/" element={<UploadPhotosForm/>} />
          </Route>
</>
    )
  );

  return (
    <div className="App" dir="rtl">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
