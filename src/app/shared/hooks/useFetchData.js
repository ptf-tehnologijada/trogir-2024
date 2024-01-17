import { getDocs, collection } from "firebase/firestore";
import { mockData } from "../models/mockData";
import _ from "lodash";

export const fetchData = async (
  db,
  path,
  setData,
  groupByGender = false,
  mockRequest = false
) => {
  if (mockRequest) {
    console.log("mock request");
    setData(mockData);
    return;
  }
  try {
    console.log("real request");
    const querySnapshot = await getDocs(collection(db, path));

    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    let groupedData;

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

    console.log(groupedData);

    setData(groupedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
