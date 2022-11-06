import "./App.css";
import { Login } from "./component/login.component";
import SignUp from "./component/signup.component";
import ProfilePage from "./component/profilepage.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./store/context";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="profilepage/:username"
              element={<ProfilePage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
