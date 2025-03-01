import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure Firebase is properly initialized
import { guessGameData } from "./guess_game_data";

const FetchGuessGameData = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "guessing-game"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocuments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const addGuessGameDocuments = async () => {
    const collectionRef = collection(db, "guessing-game");
    try {
      // Create an array of promises
      const addDocPromises = guessGameData.map((data) =>
        addDoc(collectionRef, data)
      );
      // Execute all addDoc operations in parallel
      await Promise.all(addDocPromises);
      alert("All documents added successfully!");
    } catch (error) {
      console.error("Error adding documents: ", error);
      alert("Error adding documents!");
    }
  };

  return <div></div>;
};

export default FetchGuessGameData;
