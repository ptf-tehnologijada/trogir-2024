import AdminTable from "../shared/components/adminTable/AdminTable";
import {
  getFirestore,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";

const AdminChees = () => {
  const [data, setData] = useState([]);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const db_path = "chess";

  const dataMapping = [
    {
      text: "Fakultet",
      key: "faculty",
      id: 1,
    },
    {
      text: "Bodovi",
      key: "time_solo",
      id: 5,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, db_path), orderBy("time_solo", "desc"))
      );

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [db, fetchData]);

  return (
    <>
      <div>
        <h1>{`Šah`}</h1>
        <AdminTable
          data={data}
          dataMapping={dataMapping}
          fetchFunction={fetchData}
          path={db_path}
          showGenerate={false}
          isSoloSport={true}
          onlyPoints={true}
        />
      </div>
    </>
  );
};

export default AdminChees;
