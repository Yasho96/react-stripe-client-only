import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CardIcon from "../images/credit-card.svg";
import ProductImage from "../images/product-image.jpg";
import "../styles/styles.css";

let stripePromise;
//const [strToken, setStrToken] = useState(null);
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    //setStrToken(stripePromise)
  }
  //console.log(strToken);
  return stripePromise;
  
};
//console.log(stripePromise.id);
const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: 'price_1Kh9utIaqHuGTv911YTAI2ur',
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>ARMY Bomb</h1>
      <p className="checkout-title">BTS ARMY Special!!!</p>
      <p className="checkout-description">
        Let's cheer to our favorite idol group together...
      </p>
      <h1 className="checkout-price">$35</h1>
      <img
        className="checkout-product-image"
        src={ProductImage}
        alt="Product"
      />
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src={CardIcon} alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;
