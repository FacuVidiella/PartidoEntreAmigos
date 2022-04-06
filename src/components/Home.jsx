import Match from "./Match";

import { useEffect, useState, Suspense } from "react";
import { Element, scroller, animateScroll as scroll } from "react-scroll";
import { Spinner } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiReload } from "@mdi/js";

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
        Empezar
      </button>
      <p className="lead" style={{ height: "600px" }}></p>
      <div className="row">
        <div className="col-sm"></div>
      </div>
      {show ? (
        <Element name="target">
          <Suspense
            fallback={
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            }
          >
            <Match />
          </Suspense>
          <Button
            variant="dark"
            style={{
              position: "fixed",
              bottom: "100px",
              right: "1px",
              borderRadius: "5px",
            }}
            onClick={() => setShow(false)}
          >
            <Icon path={mdiReload} size={1} />
          </Button>
        </Element>
      ) : null}
    </div>
  );
}
