import Checkout from "../checkout/checkout";
import "../checkout/checkout.css";
function CheckoutPage() {
  return (
    <section className="Co_page">
      <h2 className="Co_title">CHECKOUT</h2>

      <Checkout />
    </section>
  );
}

export default CheckoutPage;
