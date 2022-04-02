export default function Field() {
  let teamOne = [];
  let teamTwo = [];
  for (let i = 0; i < 10; i++) {
    if (i < 5) {
      teamOne.push(
        <div
          key={i}
          style={{
            backgroundColor: "white",
            border: "solid",
            height: "50px",
            width: "50px",
            borderRadius: "50px",
          }}
        ></div>
      );
    } else {
      teamTwo.push(
        <div
          key={i}
          style={{
            backgroundColor: "white",
            border: "solid",
            height: "50px",
            width: "50px",
            borderRadius: "50px",
          }}
        ></div>
      );
    }
  }
  return (
    <div
      className="d-flex align-self-center justify-content-between m-auto"
      style={{
        backgroundColor: "green",
        border: "solid",
        borderColor: "black",
        width: "80%",
      }}
    >
      <div className="align-self-center">{teamOne[0]}</div>
      <div
        className="vr align-self-center"
        style={{ height: "170px", color: "white" }}
      ></div>
      <div
        className="d-flex flex-column align-self-center"
        style={{ gap: "150px" }}
      >
        {teamOne[1]}
        {teamOne[2]}
      </div>
      <div
        className="d-flex flex-column align-self-center"
        style={{ gap: "50px" }}
      >
        {teamOne[3]}
        {teamOne[4]}
      </div>
      <div className="vr" style={{ color: "white" }}></div>
      <div
        className="d-flex flex-column align-self-center"
        style={{ gap: "50px" }}
      >
        {teamTwo[1]}
        {teamTwo[2]}
      </div>
      <div
        className="d-flex flex-column align-self-center"
        style={{ gap: "150px" }}
      >
        {teamTwo[3]}
        {teamTwo[4]}
      </div>
      <div
        className="vr align-self-center"
        style={{ height: "170px", color: "white" }}
      ></div>
      <div
        className="d-flex flex-column align-self-center"
        style={{ gap: "150px" }}
      >
        {teamTwo[0]}
      </div>
    </div>
  );
}
