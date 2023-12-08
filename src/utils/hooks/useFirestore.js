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

import {
  FirestoreType as FT,
  ErrorMessages as E,
  Categories as C,
} from "models";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case FT.IS_PENDING:
    case FT.ADDED_DOCUMENT:
    case FT.DELETED_DOCUMENT:
    case FT.ERROR:
      return { ...initialState, ...action.payload };

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
        payload: { document: addedDocument, success: true },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: FT.ERROR,
        payload: { error: error.message },
      });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: FT.IS_PENDING, payload: { isPending: true } });
    try {
      const ref = doc(db, collectionName, id);

      await deleteDoc(ref);
      dispatchIfNotCancelled({
        type: FT.DELETED_DOCUMENT,
        payload: { isPending: false, success: true },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: FT.ERROR,
        payload: { error: E.COULD_NOT_DELETE, isPending: false },
      });
    }
  };

  const addUser = async (displayName, id) => {
    dispatch({ type: FT.IS_PENDING, payload: { isPending: true } });
    const ref = doc(db, collectionName, id);
    const data = {
      displayName,
      categories: [C.Food, C.Other],
      uid: id,
    };

    try {
      await setDoc(ref, data);
      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: { document: data, isPending: false, success: true },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: FT.ERROR,
        payload: { error: error.message, isPending: false },
      });
    }
  };

  const updateCategories = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING, payload: { isPending: true } });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayUnion(category),
      });

      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: { document: updatedDocument, isPending: false, success: true },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: FT.ERROR,
        payload: { error: E.COULD_NOT_UPDATE, isPending: false },
      });
    }
  };

  const deleteCategories = async ({ id, category }) => {
    dispatch({ type: FT.IS_PENDING, payload: { isPending: true } });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayRemove(category),
      });

      dispatchIfNotCancelled({
        type: FT.ADDED_DOCUMENT,
        payload: { document: updatedDocument, isPending: false, success: true },
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: FT.ERROR,
        payload: { error: E.COULD_NOT_DELETE, isPending: false },
      });
    }
  };

  //cleanup function
  useEffect(() => {
    () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    addUser,
    updateCategories,
    deleteCategories,
    response,
  };
};
