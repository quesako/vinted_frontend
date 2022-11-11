import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./page/HomePage";
import './style/App.css';
import OfferSinglePage from "./page/offer/OfferSinglePage";
import Signin from "./page/signin";
import Signup from "./page/Signup";
import Header from "./component/Header";
import Cookies from "js-cookie";
import {useState} from "react";



function App() {

    const [token, setToken] = useState(Cookies.get("userToken") || null);

    return (
        <Router>
            <Header  token={token} setToken={setToken}/>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/signin" element={<Signin setToken={setToken}/>}/>
                <Route path="/signup" element={<Signup setToken={setToken}/>}/>
                <Route path="/offer/:id" element={<OfferSinglePage  token={token}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
