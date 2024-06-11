import "./AfterService.css";
const SERVICES = ["Free shipping", "24 x 7 service", "Festival offer"];

const AfterService = () => {
  return (
    <section id="after-service">
      <div className="AS-list">
        {SERVICES.map((service, i) => (
          <div className="AS-Item" key={i}>
            <p className="AS-service">{service}</p>
            <p className="AS-ship">Free shipping worldwide</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AfterService;
