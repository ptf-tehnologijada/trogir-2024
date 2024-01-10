import ResultCard from "../shared/components/resultCard/ResultCard";
import Table from "../shared/components/table/Table";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";

const Basketball = () => {
  const [data, setData] = useState([]);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "basketball"));

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const groupedData = Object.groupBy(
          fetchedData,
          ({ matchNum }) => matchNum
        );

        setData(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db]);

  const s1 = [];

  const s2 = [];

  return (
    <>
      <div>
        <h1>{`Košarka (M)`}</h1>

        <Table data={data["1"]} />

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
      <div>
        <h1>{`Košarka (Ž)`}</h1>

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

export default Basketball;
