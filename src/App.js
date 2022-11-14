import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./page/HomePage";
import './style/App.css';
import OfferSinglePage from "./page/offer/OfferSinglePage";
import Signin from "./page/signin";
import Signup from "./page/Signup";
import Header from "./component/Header";
import Cookies from "js-cookie";
import {useState} from "react";
import SearchPage from "./page/SearchPage";
import PublishPage from "./page/PublishPage";


function App() {

    const [token, setToken] = useState(Cookies.get("userToken") || null);
    const [values, setValues] = useState([1, 1000])
    const [search, setSearch] = useState("")

    const [enabledFilteringByPrice, setEnabledFilteringByPrice] = useState(false)

    return (
        <Router>
            <Header
                token={token}
                setToken={setToken}

                search={search}
                setSearch={setSearch}
            />
            <Routes>
                <Route path="/" element={<HomePage/>}

                />
                {/*Auth*/}
                <Route path="/signin" element={<Signin setToken={setToken}/>}/>
                <Route path="/signup" element={<Signup setToken={setToken}/>}/>
                {/*Search*/}
                <Route path="/search" element={
                    <SearchPage search={search}
                                values={values}
                                SetValues={setValues}
                                enabledFilteringByPrice={enabledFilteringByPrice}
                                setEnabledFilteringByPrice={setEnabledFilteringByPrice}/>
                }
                />
                {/*Offer*/}
                <Route path="/publish" element={<PublishPage token={token}/>}/>
                <Route path="/offer/:id" element={<OfferSinglePage token={token}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
