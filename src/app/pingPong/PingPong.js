import Table from "../shared/components/table/Table";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";
import { fetchData } from "../shared/hooks/useFetchData";

const Chess = () => {
  const [data, setData] = useState(null);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const getData = useCallback(() => {
    fetchData(db, "ping_pong", setData, false, false, true, true);
  }, [db]);

  useEffect(() => {
    fetchData(db, "ping_pong", setData, false, false, true, true);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>Stolni tenis</h1>

        {data && data[undefined] ? (
          <Table
            data={data[undefined]}
            showAdditional={false}
            hideDraw={true}
            isOnePerson={true}
            onlyPoints={true}
          />
        ) : (
          <Table
            data={null}
            showAdditional={false}
            hideDraw={true}
            isOnePerson={true}
            onlyPoints={true}
          />
        )}
      </div>
    </>
  );
};

export default Chess;
