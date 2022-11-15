import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useState } from 'react'

const CheckoutForm = ({ product, token, amount, setPaymentCompleted }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentInProgress, setPaymentInProgress] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setPaymentInProgress(true)

    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement)

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    // et l'id de l'utilisateur stocké dans les cookies

    const stripeResponse = await stripe.createToken(cardElement, {
      name: Cookies.get('userId') || null,
    })
    const stripeToken = stripeResponse.token.id

    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    // on securise la route
    const response = await axios.post(
      'https://api--vinted-backend--lmfr2nmdlttd.code.run/payment',
      {
        stripeToken: stripeToken,
        productId: product.productId,
        productTitle: product.productTitle /*test with amount*/,
        amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === 'succeeded') {
      setPaymentCompleted(true)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={'py-2 pt-8'}>
      <div className={'rounded-sm bg-zinc-100 py-4 px-2'}>
        <CardElement />
      </div>
      <div>
        <button
          className={'btn btn-md btn-primary mt-6 w-full'}
          type="submit"
          disabled={paymentInProgress}
        >
          <span className={'mx-auto'}>Valider</span>
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
