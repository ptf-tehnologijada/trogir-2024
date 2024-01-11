import { getDocs, collection } from "firebase/firestore";
import { mockData } from "../models/mockData";

export const fetchData = async (db, path, setData, mockRequest = false) => {
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

    const groupedData = Object.groupBy(fetchedData, ({ matchNum }) => matchNum);

    setData(groupedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
