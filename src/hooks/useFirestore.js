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

import { FirestoreType as FT } from "models";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case FT.IS_PENDING:
      return {
        document: null,
        isPending: true,
        error: null,
        success: null,
      };
    case FT.ADDED_DOCUMENT:
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case FT.DELETED_DOCUMENT:
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    case FT.ERROR:
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, collectionName);

  // only dispatch if not cancel
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    dispatch({ type: FT.IS_PENDING });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...document, createdAt });

      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: addedDocument,
      });
    } catch (error) {
      console.error(error);
      dispatchIfNotCancelled({ type: FT.ERROR, payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);

      await deleteDoc(ref);
      dispatchIfNotCancelled({ type: FT.DELETED_DOCUMENT });
    } catch (error) {
      console.error(error);
      dispatchIfNotCancelled({ type: FT.ERROR, payload: "could not delete" });
    }
  };

  const addUser = async (displayName, id) => {
    dispatch({ type: FT.IS_PENDING });

    const ref = doc(db, collectionName, id);
    const data = {
      displayName,
      categories: ["Food", "Other"],
      uid: id,
    };

    try {
      await setDoc(ref, data);
      dispatchIfNotCancelled({ type: FT.ADDED_DOCUMENT, payload: data });
    } catch (error) {
      console.error(error);
      dispatchIfNotCancelled({ type: FT.ERROR, payload: error.message });
    }
  };

  const updateCategories = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayUnion(category),
      });

      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: updatedDocument,
      });
    } catch (error) {
      console.error(error);
      dispatchIfNotCancelled({ type: FT.ERROR, payload: "could not update" });
    }
  };

  const deleteCategories = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayRemove(category),
      });

      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: updatedDocument,
      });
    } catch (error) {
      console.error(error);
      dispatchIfNotCancelled({ type: FT.ERROR, payload: "could not delete" });
    }
  };

  //cleanup function
  useEffect(() => () => setIsCancelled(true), []);

  return {
    addDocument,
    deleteDocument,
    addUser,
    updateCategories,
    deleteCategories,
    response,
  };
};
