import Table from "../shared/table/Table";

export default function Cross() {
  const dataMen = [
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
    { faculty: "FKIT", name: "Marko Mrulic", time: "4:12:01" },
  ];

  const dataWomen = [
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
    { faculty: "FKIT", name: "Ivana Brlic Mazuranic", time: "4:12:01" },
  ];

  return (
    <>
      <div>
        <h1>{`Kros (M)`}</h1>
        <Table data={dataMen} isOnePerson />

        <h1>{`Kros (Ž)`}</h1>
        <Table data={dataWomen} isOnePerson />
      </div>
    </>
  );
}
