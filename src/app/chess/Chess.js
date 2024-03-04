import Table from "../shared/components/table/Table";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";
import { calculateTotalPoints } from "../shared/utils/calculateTotalPoints";
import { fetchData } from "../shared/hooks/useFetchData";

const Chess = () => {
  const [data, setData] = useState(null);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const getData = useCallback(() => {
    fetchData(db, "chess", setData);
  }, [db]);

  useEffect(() => {
    fetchData(db, "chess", setData);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>Šah</h1>

        {data && (
          <Table
            data={calculateTotalPoints(data[1])}
            showAdditional={false}
            hideDraw={true}
          />
        )}
      </div>
    </>
  );
};

export default Chess;
