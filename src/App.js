import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import './style/App.css';
import OfferSinglePage from "./page/offer/OfferSinglePage";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offer/:id" element={<OfferSinglePage />} />
        </Routes>
      </Router>
  );
}

export default App;
