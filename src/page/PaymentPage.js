import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import CheckoutForm from '../component/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(
  'pk_test_51M4MKsIxUPBChs6eFbflY1tcWTKUuZHLs9zGoHdBMh6ciqAvLppNywU8yoMzNkBBZ5U7c66VNAPLJBMUQJrcCyo400Kkw8gUD0'
)

const PaymentPage = ({ token }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const location = useLocation()
  const product = location.state

  /* Calculate amount in centimes*/
  const shippingFees = 80
  const protectionFees = 40
  const totalFees = protectionFees + shippingFees
  const total = product.productPrice * 100 + totalFees

  return (
    <>
      {token ? (
        <>
          {!paymentCompleted ? (
            <div className="flex min-h-full flex-col justify-center bg-zinc-100 py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-color-body mt-6 text-center text-3xl tracking-tight">
                  Paiement
                </h2>
              </div>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="space-y-4 divide-y bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <div className={'flex flex-col py-2'}>
                    <p className="align-items text-color-body-light my-1 flex justify-between text-xs">
                      <span className={'uppercase'}>Nom de l'article</span>
                      <span className={'text-color-body ml-2 truncate'}>
                        {product.productTitle}
                      </span>
                    </p>
                    <p className="align-items text-color-body-light my-1 flex justify-between text-xs">
                      <span className={'uppercase'}>référence</span>
                      <span className={'text-color-body ml-2 truncate'}>
                        {product.productId}
                      </span>
                    </p>
                    <p className="align-items text-color-body-light my-1 flex justify-between text-xs">
                      <span className={'uppercase'}>Prix</span>
                      <span className={'text-color-body ml-2 truncate'}>
                        {product.productPrice.toFixed(2)} €
                      </span>
                    </p>
                    <p className="align-items text-color-body-light my-1 flex justify-between text-xs">
                      <span className={'uppercase'}>
                        Frais de protection des acheteurs
                      </span>
                      <span className={'text-color-body ml-2 truncate'}>
                        {(protectionFees / 100).toFixed(2)} €
                      </span>
                    </p>
                    <p className="align-items text-color-body-light my-1 flex justify-between text-xs">
                      <span className={'uppercase'}>Frais de port</span>
                      <span className={'text-color-body ml-2 truncate'}>
                        {(shippingFees / 100).toFixed(2)} €
                      </span>
                    </p>
                  </div>

                  <div className={'py-2'}>
                    <p className="align-items text-color-body-ultra my-1 flex justify-between">
                      <span className={'font-bold uppercase'}>Total</span>
                      <span
                        className={'text-color-body ml-2 truncate font-bold '}
                      >
                        {(total / 100).toFixed(2)} €
                      </span>
                    </p>
                    <p className={'text-color-body-light py-2 text-sm'}>
                      Il ne vous reste plus qu'un étape pour vous offrir
                      <span className={'text-color-body-ultra'}>
                        {' '}
                        "{product.productTitle}"
                      </span>
                      . Vous allez payer {(totalFees / 100).toFixed(2)}€ (frais
                      de protection et frais de port Inclus)
                    </p>
                  </div>

                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      product={product}
                      token={token}
                      amount={total}
                      setPaymentCompleted={setPaymentCompleted}
                    />
                  </Elements>
                </div>
              </div>
            </div>
          ) : (
            <p>Votre paiement a bien était effectué !</p>
          )}
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  )
}

export default PaymentPage
