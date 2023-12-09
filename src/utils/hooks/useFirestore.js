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

import { getToastMsg } from "utils/toast-msg";

import { db } from "config";

import { INITIAL_STATE, firestoreReducer } from "reducers";

import {
  FirestoreType as T,
  ErrorMessages as E,
  Categories as C,
  FirestoreMessages as FM,
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
    dispatch({ type: T.IS_PENDING });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...document, createdAt });

      safeDispatch({ type: T.ADDED_DOC, payload: addedDocument });
      getToastMsg(FM[T.ADDED_DOC]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_ADD_DOC });
      getToastMsg(E.COULD_NOT_ADD_DOC);
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);

      await deleteDoc(ref);
      safeDispatch({ type: T.DELETED_DOC, payload: id });
      getToastMsg(FM[T.DELETED_DOC]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_DELETE });
      getToastMsg(E.COULD_NOT_DELETE);
    }
  };

  const addUser = async (displayName, id) => {
    dispatch({ type: T.IS_PENDING });
    const ref = doc(db, collectionName, id);
    const data = {
      displayName,
      categories: [C.Food, C.Other],
      uid: id,
    };

    try {
      await setDoc(ref, data);
      safeDispatch({ type: T.ADDED_USER, payload: data });
      getToastMsg(FM[T.ADDED_USER]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_CREATE_USER_ACCOUNT });
      getToastMsg(E.COULD_NOT_CREATE_USER_ACCOUNT);
    }
  };

  const addCategory = async ({ id, category }) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayUnion(category),
      });

      safeDispatch({ type: T.ADDED_CATEGORY, payload: updatedDocument });
      getToastMsg(FM[T.ADDED_CATEGORY]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_UPDATE });
      getToastMsg(E.COULD_NOT_UPDATE);
    }
  };

  const deleteCategory = async ({ id, category }) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const ref = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(ref, {
        categories: arrayRemove(category),
      });

      safeDispatch({ type: T.DELETED_CATEGORY, payload: updatedDocument });
      getToastMsg(FM[T.DELETED_CATEGORY]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_DELETE });
      getToastMsg(E.COULD_NOT_DELETE);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return {
    addDocument,
    deleteDocument,
    addUser,
    addCategory,
    deleteCategory,
    response,
  };
};
