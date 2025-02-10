// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import LandingPage2 from "./LandingPage2";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Map from "./Map";
import FileReport from "./FileReport";
import Seereportt from "./Seereport";
import Accounts from "./Accounts";
import HowItWorks from "./HowitWorks";
import AboutUs from "./AboutUs";
import BotpressChat from "./components/botpressChat";
<<<<<<< HEAD

=======
>>>>>>> 739f6f672a98911c208c2faea7f24dd7804d5338
import LocationForm from "./LocationForm"; // Import the new LocationForm component

function App() {
  return (
    <Router>
      <BotpressChat />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LandingPage2" element={<LandingPage2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/file" element={<FileReport />} />
        <Route path="/report" element={<Seereportt />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/location" element={<LocationForm />} /> {/* New Route for Location Form */}
        <Route path="/LandingPage2" element={<LandingPage2/>}/>
      </Routes>
    </Router>
  );
}

export default App;
