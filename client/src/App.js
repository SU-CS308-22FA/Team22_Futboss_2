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
import Players from "./component/players.component";
import AdjustPlayerRating from "./component/setplayerrating.component";
import MainPage from "./component/mainpage.component";
import BugReporter from "./component/bugreporter.component";
import Bugs from "./component/adminbugreports.component";
import Teams from "./component/teams.component";
import TeamPage from "./component/teampage.component";
import { PlayerPage } from "./component/playerpage.component";
import FollowedPlayers from "./component/followedplayers.component";

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
            <Route path="adminprofilepage/:adminusername/adminbugreports" element={<Bugs />} />
            <Route path="adminprofilepage/:adminusername/adminplayerrating" element={<AdjustPlayerRating />} />
            <Route path="profilepage/:username/teams" element={<Teams/>}/>
            <Route path="profilepage/:username/teams/:teamname" element={<TeamPage/>}/>
            <Route path="profilepage/:username/players/:playerid/:playername" element={<PlayerPage/>}/>
            <Route path="profilepage/:username/players" element={<Players/>}/>
            <Route path="profilepage/:username/followedplayers" element={<FollowedPlayers/>}/>
            <Route path="mainpage" element={<MainPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
    </AdminProvider>
  );
}

export default App;
