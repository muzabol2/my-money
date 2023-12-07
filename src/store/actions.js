import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "config";

import { FirestoreType as FT, ErrorMessages as E } from "models";

export const actions = (collectionName, dispatch, isCancelled) => {
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
      dispatchIfNotCancelled({ type: FT.ERROR, payload: E.COULD_NOT_DELETE });
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
      dispatchIfNotCancelled({ type: FT.ERROR, payload: E.COULD_NOT_UPDATE });
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
      dispatchIfNotCancelled({ type: FT.ERROR, payload: E.COULD_NOT_DELETE });
    }
  };

  return {
    addDocument,
    deleteDocument,
    addUser,
    updateCategories,
    deleteCategories,
  };
};
