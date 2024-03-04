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

const AdminSwimming = () => {
  const [data, setData] = useState([]);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const db_path = "swimming";

  const dataMapping = [
    {
      text: "Fakultet",
      key: "faculty",
      id: 1,
    },
    {
      text: "Sportaš/ica",
      key: "name",
      id: 2,
    },
    {
      text: "Vrijeme",
      key: "time_solo",
      id: 3,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, db_path), orderBy("time_solo", "asc"))
      );

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const groupedData = Object.groupBy(fetchedData, ({ gender }) => gender);

      setData(groupedData);

      console.log(fetchedData);
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
        <h1>{`Plivanje (M)`}</h1>
        <AdminTable
          data={data[2]}
          dataMapping={dataMapping}
          fetchFunction={fetchData}
          path={db_path}
          genderSelect={true}
          gender={2}
          isSoloSport={true}
        />
      </div>
      <div>
        <h1>{`Plivanje (Ž)`}</h1>
        <AdminTable
          data={data[3]}
          dataMapping={dataMapping}
          fetchFunction={fetchData}
          path={db_path}
          genderSelect={true}
          gender={3}
          isSoloSport={true}
        />
      </div>
    </>
  );
};

export default AdminSwimming;
