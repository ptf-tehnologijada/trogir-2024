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
    fetchData(db, "volleyball", setData, false);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>Odbojka</h1>

        {data && data[matchEnum.groupStage] ? (
          <Table
            tag="G1"
            data={calculateTotalPoints(
              data[matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.firstGroup
              )
            )}
            matches={data[matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.firstGroup
            )}
            showAdditional={true}
            hideDraw={true}
          />
        ) : (
          <Table tag="G1" data={null} showAdditional={false} />
        )}

        {data && data[matchEnum.groupStage] ? (
          <Table
            tag="G2"
            data={calculateTotalPoints(
              data[matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.secondGroup
              )
            )}
            matches={data[matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.secondGroup
            )}
            showAdditional={true}
            hideDraw={true}
          />
        ) : (
          <Table tag="G2" data={null} showAdditional={false} />
        )}

        <h2>Za 7. mjesto</h2>
        {data && data[matchEnum.seventhPlace] ? (
          data[matchEnum.seventhPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Za 5. mjesto</h2>
        {data && data[matchEnum.fiftPlace] ? (
          data[matchEnum.fiftPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Polufinale</h2>
        {data && data[matchEnum.semifinal] ? (
          data[matchEnum.semifinal].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <>
            <ResultCard data={null} />
            <ResultCard data={null} />
          </>
        )}

        <h2>Za 3. mjesto</h2>
        {data && data[matchEnum.thirdPlace] ? (
          data[matchEnum.thirdPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Finale</h2>
        {data && data[matchEnum.final] ? (
          data[matchEnum.final].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}
      </div>
    </>
  );
};

export default Volleyball;
