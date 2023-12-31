import ResultCard from "../shared/resultCard/ResultCard";
import Table from "../shared/table/Table";

const PingPong = () => {
  const s1 = [
    { faculty: "FKIT", wins: "2", points: "4" },
    { faculty: "KTF", wins: "1", points: "2" },
    { faculty: "PBF", wins: "1", points: "2" },
    { faculty: "FKIT", wins: "0", points: "0" },
  ];

  const s2 = [
    { faculty: "MF", wins: "2", points: "4" },
    { faculty: "TTF", wins: "1", points: "2" },
    { faculty: "PTF", wins: "1", points: "2" },
    { faculty: "GRF", wins: "0", points: "0" },
  ];

  return (
    <>
      <div>
        <h1>Stolni tenis</h1>

        <Table data={s1} />

        <Table data={s2} />

        <h2>Za 7. mjesto</h2>
        <ResultCard />

        <h2>Za 5. mjesto</h2>
        <ResultCard />

        <h2>Polufinale</h2>
        <ResultCard />

        <h2>Za 3. mjesto</h2>
        <ResultCard />

        <h2>Finale</h2>
        <ResultCard />
      </div>
    </>
  );
};

export default PingPong;
