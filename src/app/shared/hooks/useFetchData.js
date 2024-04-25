import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { mockData } from "../models/mockData";
import _ from "lodash";

export const fetchData = async (
  db,
  path,
  setData,
  groupByGender = false,
  mockRequest = false,
  isSoloSport = false,
  exactPoints = false
) => {
  if (mockRequest) {
    setData(mockData);
    return;
  }
  try {
    let groupedData;

    if (isSoloSport) {
      const querySnapshot = await getDocs(
        query(
          collection(db, path),
          orderBy("time_solo", !exactPoints ? "asc" : "desc")
        )
      );

      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      groupedData = _.groupBy(fetchedData, "gender");
      setData(groupedData);
      return;
    }

    const querySnapshot = await getDocs(collection(db, path));

    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (groupByGender) {
      // Group by gender first, and then by matchNum within each gender group
      groupedData = _.groupBy(fetchedData, "gender");
      Object.keys(groupedData).forEach((gender) => {
        groupedData[gender] = _.groupBy(groupedData[gender], "matchNum");
      });
    } else {
      // Group only by matchNum
      groupedData = _.groupBy(fetchedData, "matchNum");
    }

    // console.log(fetchedData);

    // const groupedData = Object.groupBy(fetchedData, ({ matchNum }) => matchNum);

    setData(groupedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
