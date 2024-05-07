const IndexPage = () => {
  return (
    <>
      <h1>Tehnologijada 2024.</h1>
      <h3>Mjesto održavanja: Trogir</h3>
      <h3>Datum održavanja: 13.5-19.5.</h3>
      <p style={{ fontSize: "18px", lineHeight: 1.4 }}>
        Znanstveno-sportski susret studenata i djelatnika s područja:
        prehrambenih, biotehničkih, grafičkih, kemijskih, metalurških i
        tekstilnih znanosti s ciljem promicanja tih znanosti i stavljanje
        naglaska na važnost sporta i rekreacije među studentima.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: "64px",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        <img
          src="https://ptf-tehnologijada.github.io/trogir-2024/ptf_logo.png"
          alt="PTF logo"
          width={250}
        ></img>
        <img
          src="https://ptf-tehnologijada.github.io/trogir-2024/tehno_logo.jpg"
          alt="Tehno logo"
          width={250}
        ></img>
      </div>
    </>
  );
};

export default IndexPage;
