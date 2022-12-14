import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import './style/App.css'
import OfferSinglePage from './page/offer/OfferSinglePage'
import Signin from './page/signin'
import Signup from './page/Signup'
import Header from './component/Header'
import Cookies from 'js-cookie'
import { useState } from 'react'
import SearchPage from './page/SearchPage'
import PublishPage from './page/PublishPage'
import PaymentPage from './page/PaymentPage'

function App() {
  const [token, setToken] = useState(Cookies.get('userToken') || null)
  const [search, setSearch] = useState('')

  /* @todo bonus filter*/
  const [values, setValues] = useState([1, 1000])
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
        <Route path="/" element={<HomePage />} />
        {/*Auth*/}
        <Route path="/signin" element={<Signin setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        {/*Search*/}
        <Route
          path="/search"
          element={
            <SearchPage
              search={search}
              values={values}
              setValues={setValues}
              enabledFilteringByPrice={enabledFilteringByPrice}
              setEnabledFilteringByPrice={setEnabledFilteringByPrice}
            />
          }
        />
        {/*Publish (protected page)*/}
        <Route path="/publish" element={<PublishPage token={token} />} />
        {/*Offer*/}
        <Route path="/offer/:id" element={<OfferSinglePage />} />
        {/*Payment with stripe*/}
        <Route path="/payment" element={<PaymentPage token={token} />} />
      </Routes>
    </Router>
  )
}

export default App
