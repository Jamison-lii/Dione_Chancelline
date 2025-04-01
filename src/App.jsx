// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BirthdayCard from "./pages/Home";
import LandingPage from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayCard />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
