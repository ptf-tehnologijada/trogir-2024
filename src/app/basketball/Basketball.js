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
import { genderEnum } from "../shared/constants/genderEnum";

const Basketball = () => {
  const [data, setData] = useState(null);

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const getData = useCallback(() => {
    fetchData(db, "basketball", setData);
  }, [db]);

  useEffect(() => {
    fetchData(db, "basketball", setData, true);
  }, [db, getData]);

  return (
    <>
      <div>
        <h1>{`Košarka (M)`}</h1>

        {data?.[genderEnum.male]?.[matchEnum.groupStage] ? (
          <Table
            tag="G1"
            data={calculateTotalPoints(
              data[genderEnum.male][matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.firstGroup
              )
            )}
            showAdditional={true}
            matches={data[genderEnum.male][matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.firstGroup
            )}
          />
        ) : (
          <Table tag="G1" data={null} showAdditional={false} />
        )}

        {data?.[genderEnum.male]?.[matchEnum.groupStage] ? (
          <Table
            tag="G2"
            data={calculateTotalPoints(
              data[genderEnum.male][matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.secondGroup
              )
            )}
            showAdditional={true}
            matches={data[genderEnum.male][matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.secondGroup
            )}
          />
        ) : (
          <Table tag="G2" data={null} showAdditional={false} />
        )}

        <h2>Za 7. mjesto</h2>
        {data?.[genderEnum.male]?.[matchEnum.seventhPlace] ? (
          data[genderEnum.male][matchEnum.seventhPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Za 5. mjesto</h2>
        {data?.[genderEnum.male]?.[matchEnum.fiftPlace] ? (
          data[genderEnum.male][matchEnum.fiftPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Polufinale</h2>
        {data?.[genderEnum.male]?.[matchEnum.semifinal] ? (
          data[genderEnum.male][matchEnum.semifinal].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <>
            <ResultCard data={null} />
            <ResultCard data={null} />
          </>
        )}

        <h2>Za 3. mjesto</h2>
        {data?.[genderEnum.male]?.[matchEnum.thirdPlace] ? (
          data[genderEnum.male][matchEnum.thirdPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Finale</h2>
        {data?.[genderEnum.male]?.[matchEnum.final] ? (
          data[genderEnum.male][matchEnum.final].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}
      </div>

      <div>
        <h1>{`Košarka (Ž)`}</h1>

        {data?.[genderEnum.female]?.[matchEnum.groupStage] ? (
          <Table
            tag="G1"
            data={calculateTotalPoints(
              data[genderEnum.female][matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.firstGroup
              )
            )}
            showAdditional={true}
            matches={data[genderEnum.female][matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.firstGroup
            )}
          />
        ) : (
          <Table tag="G1" data={null} showAdditional={false} />
        )}

        {data?.[genderEnum.female]?.[matchEnum.groupStage] ? (
          <Table
            tag="G2"
            data={calculateTotalPoints(
              data[genderEnum.female][matchEnum.groupStage].filter(
                (item) => item.groupNum === groupEnum.secondGroup
              )
            )}
            showAdditional={true}
            matches={data[genderEnum.female][matchEnum.groupStage].filter(
              (item) => item.groupNum === groupEnum.secondGroup
            )}
          />
        ) : (
          <Table tag="G2" data={null} showAdditional={false} />
        )}

        <h2>Za 7. mjesto</h2>
        {data?.[genderEnum.female]?.[matchEnum.seventhPlace] ? (
          data[genderEnum.female][matchEnum.seventhPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Za 5. mjesto</h2>
        {data?.[genderEnum.female]?.[matchEnum.fiftPlace] ? (
          data[genderEnum.female][matchEnum.fiftPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Polufinale</h2>
        {data?.[genderEnum.female]?.[matchEnum.semifinal] ? (
          data[genderEnum.female][matchEnum.semifinal].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <>
            <ResultCard data={null} />
            <ResultCard data={null} />
          </>
        )}

        <h2>Za 3. mjesto</h2>
        {data?.[genderEnum.female]?.[matchEnum.thirdPlace] ? (
          data[genderEnum.female][matchEnum.thirdPlace].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}

        <h2>Finale</h2>
        {data?.[genderEnum.female]?.[matchEnum.final] ? (
          data[genderEnum.female][matchEnum.final].map((item) => (
            <ResultCard key={item.id} data={item} />
          ))
        ) : (
          <ResultCard data={null} />
        )}
      </div>
    </>
  );
};

export default Basketball;
