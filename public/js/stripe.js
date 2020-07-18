import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import { showAlert } from './alert';
const stripePromise = loadStripe('pk_test_qpk8XXIK4nkQNnyLqJ3RH5Mt009GgCH5Lr');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    
    // 2) Create checkout form + charge credit card
    const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });
  } 
  catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
