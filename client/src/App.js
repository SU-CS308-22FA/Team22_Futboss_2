import "./App.css";
import { Login } from "./component/login.component";
import SignUp from "./component/signup.component";
import ProfilePage from "./component/profilepage.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider, UserProvider } from "./store/context";
import AdminProfilePage from "./component/adminprofilepage.component";
import { LoginAdmin } from "./component/loginadmin.component";
import PictureUploader from "./component/pictureuploader.component";
import TeamOfTheWeek from "./component/teamoftheweek.component";

import BugReporter from "./component/bugreporter.component";
import Teams from "./component/teams.component";
import TeamPage from "./component/teampage.component";
function App() {
  return (
    <AdminProvider>
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="adminprofilepage/:adminusername" element={<AdminProfilePage />} />
            <Route path="loginadmin" element={<LoginAdmin />} />
            <Route path="profilepage/:username" element={<ProfilePage />} />
            <Route path="profilepage/:username/pictureuploader" element={<PictureUploader/>} />
            <Route path="profilepage/:username/teamoftheweek" element={<TeamOfTheWeek />} />
            <Route path="profilepage/:username/bugreporter" element={<BugReporter/>} />

            <Route path="profilepage/:username/teams" element={<Teams/>}/>
            <Route path="profilepage/:username/teams/:teamname" element={<TeamPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
    </AdminProvider>
  );
}

export default App;
