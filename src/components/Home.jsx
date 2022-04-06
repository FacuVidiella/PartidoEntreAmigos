import Match from "./Match";
import * as Scroll from "react-scroll";
import { useEffect, useState, Suspense } from "react";
import { Element, scroller, animateScroll as scroll } from "react-scroll";
import Spinner from "./Spinner";

export default function Home() {
  let [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    if (show) {
      scroller.scrollTo("target", {
        smooth: false,
        duration: 0,
        delay: 0,
      });
    }
  };
  useEffect(() => {
    if (show) {
      scroller.scrollTo("target", {
        smooth: false,
        duration: 0,
        delay: 0,
      });
    } else {
      scroll.scrollToTop({ smooth: false, duration: 0, delay: 0 });
    }
  });

  return (
    <div className="container mt-5">
      <h1 className="display-4">Bienvenido!</h1>
      <p className="lead">Hace click para armar el partido de tus sueños</p>
      <hr className="my-4" />
      <button type="button" className="btn btn-primary" onClick={handleClick}>
        Iniciar
      </button>
      <p className="lead" style={{ height: "600px" }}></p>
      <div className="row">
        <div className="col-sm"></div>
      </div>
      {show ? (
        <Element name="target">
          <Suspense fallback={<Spinner />}>
            <Match />
          </Suspense>
        </Element>
      ) : null}
    </div>
  );
}
