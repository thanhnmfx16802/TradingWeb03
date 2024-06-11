import CheckoutBill from "./checkoutBill";
import CheckoutForm from "./checkoutForm";

const Checkout = () => {
  return (
    <section className="Co_section">
      <h4>BILLING DETAILS</h4>
      <div className="Co_section_flex">
        <div className="Co_form">
          <CheckoutForm />
        </div>

        <div className="Co_bill">
          <CheckoutBill />
        </div>
      </div>
    </section>
  );
};

export default Checkout;
