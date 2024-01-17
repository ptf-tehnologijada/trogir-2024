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

const AdminPingPong = () => {
  const [data, setData] = useState([]);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const db_path = "ping_pong";

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
      text: "Dio natjecanja",
      key: "matchNum",
      id: 5,
    },
    {
      text: "Grupa",
      key: "groupNum",
      id: 6,
    },
    {
      text: "Vrijeme",
      key: "time",
      id: 7,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, db_path), orderBy("matchNum", "asc"))
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
        <h1>{`Stolni tenis`}</h1>
        <AdminTable
          data={data}
          dataMapping={dataMapping}
          fetchFunction={fetchData}
          path={db_path}
        />
      </div>
    </>
  );
};

export default AdminPingPong;
