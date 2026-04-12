const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
  };

  const thisYear = new Date().getFullYear();

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki{" "}
        {thisYear}
      </p>
    </div>
  );
};

export default Footer;
