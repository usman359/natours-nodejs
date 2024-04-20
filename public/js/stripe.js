import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51P7AslP0TxxvCydoDbr9jzbIkw0ztSbBhkPzmTphM5r2dx7FpgV0rWf00H2vQpgh7eQ7dPyg8eB7LyBvYRH8uys200tvfTcx07'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
