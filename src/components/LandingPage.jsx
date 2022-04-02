import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="jumbotron m-lg-1">
      <h1 className="display-4">Bienvenido!</h1>
      <p className="lead">Hace click para armar el partido de tus sueños</p>
      <hr className="my-4" />
      <p className="lead" style={{ height: "300px" }}>
        <Link
          to="/home"
          className="btn btn-primary btn-lg"
          href="#"
          role="button"
        >
          Ir al Inicio
        </Link>
      </p>
    </div>
  );
}
