import ResultCard from "../shared/components/resultCard/ResultCard";
import Table from "../shared/components/table/Table";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { FsContext } from "../../index";
import { calculateTotalPoints } from "../shared/utils/calculateTotalPoints";
import { matchEnum } from "../shared/constants/matchEnum";
import { groupEnum } from "../shared/constants/groupEnum";
import { fetchData } from "../shared/hooks/useFetchData";

const Volleyball = () => {
  const [data, setData] = useState(null);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const getData = useCallback(() => {
    fetchData(db, "volleyball", setData);
  }, [db]);

  useEffect(() => {
    fetchData(db, "volleyball", setData);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>Odbojka</h1>

        {data && (
          <Table
            data={calculateTotalPoints(
              data[matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.firstGroup
              )
            )}
          />
        )}

        {data && (
          <Table
            data={calculateTotalPoints(
              data[matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.secondGroup
              )
            )}
          />
        )}

        <h2>Za 7. mjesto</h2>
        {data &&
          data[matchEnum.seventhPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))}

        <h2>Za 5. mjesto</h2>
        {data &&
          data[matchEnum.fiftPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))}

        <h2>Polufinale</h2>
        {data &&
          data[matchEnum.semifinal].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))}

        <h2>Za 3. mjesto</h2>
        {data &&
          data[matchEnum.thirdPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))}

        <h2>Finale</h2>
        {data &&
          data[matchEnum.final].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))}
      </div>
    </>
  );
};

export default Volleyball;
