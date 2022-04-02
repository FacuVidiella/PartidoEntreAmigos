export default function Footer() {
  return (
    <footer
      id="sticky-footer"
      className="bg-dark text-white-50 "
      style={{
        display: "flex",
        position: "relative",
        height: "80px",
        width: "100%",
        padding: "6em 1",
        marginTop: "20px",
      }}
    >
      <div className="container text-center align-self-center ">
        <small>All rights reserved</small>
      </div>
    </footer>
  );
}
