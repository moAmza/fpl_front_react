import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import PageHeader from "./components/PageHeader";
import Authentication from "./pages/Authentication";
import Events from "./pages/Events";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Transfers from "./pages/Transfers";
import ProfileForm from "./pages/ProfileForm";

function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route element={<PageHeader />}>
              <Route path="myteam" element={<Home />} />
              <Route path="award" element={<Home />} />
              <Route path="event" element={<Events />} />
              <Route path="profile" element={<ProfileForm />} />
              <Route path="transfer" element={<Transfers />} />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="authentication" element={<Authentication />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
