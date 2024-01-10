import { getDocs, collection } from "firebase/firestore";

export const fetchData = async (db, path, setData) => {
  try {
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
