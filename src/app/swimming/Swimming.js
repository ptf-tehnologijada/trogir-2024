import Table from "../shared/components/table/Table";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";
import { fetchData } from "../shared/hooks/useFetchData";
import { genderEnum } from "../shared/constants/genderEnum";

const Swimming = () => {
  const [data, setData] = useState(null);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const getData = useCallback(() => {
    fetchData(db, "swimming", setData);
  }, [db]);

  useEffect(() => {
    fetchData(db, "swimming", setData, true, false, true);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>{`Plivanje (M)`}</h1>

        {data?.[genderEnum.male] && (
          <Table
            data={data?.[genderEnum.male]}
            showAdditional={false}
            isOnePerson={true}
          />
        )}
      </div>

      <div>
        <h1>{`Plivanje (Ž)`}</h1>

        {data?.[genderEnum.female] && (
          <Table
            data={data?.[genderEnum.female]}
            showAdditional={false}
            isOnePerson={true}
          />
        )}
      </div>
    </>
  );
};

export default Swimming;
