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
        console.log("querySnapshot", querySnapshot);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("data", data);
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
      console.log("All documents added successfully!");
      alert("All documents added successfully!");
    } catch (error) {
      console.error("Error adding documents: ", error);
      alert("Error adding documents!");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Guess Game Data</h2>
      {documents.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="border p-2 my-2">
              <strong>ID:</strong> {doc.id} <br />
              <strong>Data:</strong> {JSON.stringify(doc)}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => addGuessGameDocuments()}>ADDD</button>
    </div>
  );
};

export default FetchGuessGameData;
