import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const PaymentPage = ({ token }) => {
  const location = useLocation()
  const { productTitle, productId, productPrice } = location.state

  return (
    <>
      {token ? (
        <p>
          {productTitle} {productPrice} {productId}
        </p>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  )
}

export default PaymentPage
