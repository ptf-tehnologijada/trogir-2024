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
      text: "Domaci tim",
      key: "homeName",
      id: 1,
    },
    {
      text: "Domaci poeni",
      key: "homeNum",
      id: 2,
    },
    {
      text: "Gostujuci tim",
      key: "awayName",
      id: 3,
    },
    {
      text: "Gostujuci poeni",
      key: "awayNum",
      id: 4,
    },
    {
      text: "Vrijeme",
      key: "time",
      id: 5,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, db_path), orderBy("time", "asc"))
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
          showGenerate={true}
        />
      </div>
    </>
  );
};

export default AdminChees;
