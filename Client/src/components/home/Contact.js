import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact">
        <div className="contact-title">
          <p className="contact-title-subject">Let's be friends!</p>
          <p className="contact-title-text">
            Nisi nisi tempor consequat laboris nisi.
          </p>
        </div>
        <div className="contact-address">
          <form>
            <input
              className="contact-input"
              placeholder="Enter your email address"
            />
            <button className="contact-button">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
