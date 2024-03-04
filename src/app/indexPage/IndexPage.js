const IndexPage = () => {
  return (
    <>
      <h1>Dobrodošli</h1>
      <h2>Tehnologijada 2024.</h2>
      <h3>Mjesto: Trogir</h3>
      <h3>Datum održavanja: 14.5-18.5.</h3>
      <p>
        Ovdje ćete moći pratiti sve rasporede odigravanja utakmica i rezultate
        istih.
      </p>
      <p></p>
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
