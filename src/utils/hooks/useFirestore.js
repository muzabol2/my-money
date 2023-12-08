import { useEffect, useReducer, useState } from "react";
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "config";

import { INITIAL_STATE, firestoreReducer } from "reducers";

import {
  FirestoreType as FT,
  ErrorMessages as E,
  Categories as C,
} from "models";

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, INITIAL_STATE);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, collectionName);

  const safeDispatch = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...document, createdAt });

      safeDispatch({ type: FT.ADDED_DOC, payload: addedDocument });
    } catch (error) {
      safeDispatch({ type: FT.ERROR, payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);

      await deleteDoc(ref);
      safeDispatch({ type: FT.DELETED_DOC, payload: id });
    } catch (error) {
      safeDispatch({ type: FT.ERROR, payload: error.message });
    }
  };

  const addUser = async (displayName, id) => {
    dispatch({ type: FT.IS_PENDING });
    const ref = doc(db, collectionName, id);
    const data = {
      displayName,
      categories: [C.Food, C.Other],
      uid: id,
    };

    try {
      await setDoc(ref, data);
      safeDispatch({ type: FT.ADDED_USER, payload: data });
    } catch (error) {
      safeDispatch({ type: FT.ERROR, payload: error.message });
    }
  };

  const addCategory = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayUnion(category),
      });

      safeDispatch({ type: FT.ADDED_CATEGORY, payload: updatedDocument });
    } catch (error) {
      safeDispatch({ type: FT.ERROR, payload: E.COULD_NOT_UPDATE });
    }
  };

  const deleteCategory = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayRemove(category),
      });

      safeDispatch({ type: FT.DELETED_CATEGORY, payload: updatedDocument });
    } catch (error) {
      safeDispatch({ type: FT.ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    addUser,
    addCategory,
    deleteCategory,
    response,
  };
};
