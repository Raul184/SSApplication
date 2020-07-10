import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_qpk8XXIK4nkQNnyLqJ3RH5Mt009GgCH5Lr');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
