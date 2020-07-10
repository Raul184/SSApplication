import axios from 'axios'
import {showAlert} from 'alert'
const stripe = Stripe('pk_test_qpk8XXIK4nkQNnyLqJ3RH5Mt009GgCH5Lr')

export const bookTour = async tourId => {
  try {
    // Get stripe checkout session
    const session = await axios(`/api/v1/bookings/checkout_session/${tourId}`)
    // Charge tour in user's credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
  } 
  catch (error) {
    showAlert('error', error)  
  }
}