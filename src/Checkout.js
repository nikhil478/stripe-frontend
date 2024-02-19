// src/Checkout.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OYriPSG9f4UFnBSmvUI7DeqQf3z24adkUrAbZuoab5DYrvz2tXJ1KwYIQXXpYgt8EnNXMGQuwI8MT92ReTcLBIM00pUGOE0CS');

const Checkout = () => {
  const [sessionId, setSessionId] = useState('');

  const handleClick = async () => {
    const response = await fetch('https://dev.neucron.io/v1/utility/createstripesession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        cancelUrl: 'http://localhost:3000/cancel',
        priceId: 'price_1OZWjTSG9f4UFnBSxdJ1snnK',
        productId: 'price_1OZWjTSG9f4UFnBSxdJ1snnK',
        quantity: 10,
        successUrl: 'http://localhost:3000/success',
        uniqueId: 'string'
      }),
    });
  
    const session = await response.json();
    setSessionId(session.id);
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      console.error(result.error.message);
    }
  };
  

  return (
    <div>
      <h1>Stripe Checkout Example</h1>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

export default Checkout;
