/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const addPark = (values) => {
  addDoc(collection(db, "parks"), values);
};

export const addReservation = (id, values) => {
  const docRef = doc(db, "parks", id);
  updateDoc(docRef, {
    rezervation: arrayUnion({
      ...values,
    }),
  });
};
export const updateOccupancy = async (id, values) => {
  const docRef = doc(db, "parks", id);
  await updateDoc(docRef, {
    occupancy: values,
  });
};
export const useOwnListener = () => {
  const [own, setOwn] = useState();
  const q = query(
    collection(db, "parks"),
    where("userId", "==", auth.currentUser.uid)
  );

  useEffect(() => {
    return onSnapshot(q, (onSnapshot) => {
      setOwn(
        onSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            docId: doc.id,
          };
        })
      );
    });
  }, []);
  return own;
};

export const useParksListener = () => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "parks"), (onSnapshot) => {
      setParks(
        onSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        })
      );
    });
  }, []);
  return parks;
};
export const useReservationListener = () => {
  const [reservastion, setReservastion] = useState();
  const q = query(
    collection(db, "parks"),
    where("userId", "==", auth.currentUser.uid)
  );

  useEffect(() => {
    return onSnapshot(q, (onSnapshot) => {
      setReservastion(
        onSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data.rezervation.map((d) => {
              return d;
            }),
          };
        })
      );
    });
  }, []);

  return reservastion;
};

export const useMakingReservation = () => {
  const [reservastion, setReservastion] = useState([]);

  useEffect(() => {
    setReservastion([]);
    return onSnapshot(collection(db, "parks"), (onSnapshot) => {
      onSnapshot.docs.map((doc) => {
        doc.data().rezervation.map((d) => {
          if (d.id === auth.currentUser.uid) {
            setReservastion((old) => [
              ...old,
              {
                carparkName: doc.data().carparkName,
                rezervationTime: d.time,
              },
            ]);
          }
        });
      });
    });
  }, []);
  return reservastion;
};
