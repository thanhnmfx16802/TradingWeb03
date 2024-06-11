import "./Footer.css";
// Dummy data
const infoFooter = [
  {
    col_title: "Customer Services",
    col_values: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
  },
  {
    col_title: "Company",
    col_values: ["What We Do", "Available Services", "Latest Posts", "FAQs"],
  },
  {
    col_title: "Social Media",
    col_values: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

function Footer() {
  return (
    <div className="footerList">
      {infoFooter.map((item) => {
        return (
          <FooterItem
            key={item.col_title}
            listTitle={item.col_title}
            listValues={item.col_values}
          />
        );
      })}
    </div>
  );
}

const FooterItem = (props) => {
  return (
    <div>
      <h4 className="titleFooter">{props.listTitle}</h4>
      {props.listValues.map((content, i) => {
        return (
          <a href="#" key={i}>
            {content}
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
