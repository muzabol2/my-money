import {
  CollectionReference,
  DocumentReference,
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
import { useEffect, useReducer, useState } from "react";
import { db } from "config";
import { Categories as C, ErrorMessages as E, FirestoreMessages as FM, FirestoreType as T } from "models";
import { Action, INITIAL_STATE, State, firestoreReducer } from "reducers";
import { getToastMsg } from "utils/toast-msg";

interface FirestoreResponse {
  type: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const useFirestore = (collectionName: string) => {
  const [response, dispatch] = useReducer<React.Reducer<State, Action>>(firestoreReducer, INITIAL_STATE);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref: CollectionReference = collection(db, collectionName);

  const safeDispatch = (action: FirestoreResponse) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document: Record<string, any>) => {
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

  const deleteDocument = async (id: string) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const docRef: DocumentReference = doc(db, collectionName, id);

      await deleteDoc(docRef);
      safeDispatch({ type: T.DELETED_DOC, payload: id });
      getToastMsg(FM[T.DELETED_DOC]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_DELETE });
      getToastMsg(E.COULD_NOT_DELETE);
    }
  };

  const addUser = async (displayName: string | null, id: string) => {
    dispatch({ type: T.IS_PENDING });
    const docRef: DocumentReference = doc(db, collectionName, id);
    const data = {
      displayName,
      categories: [C.Food, C.Other],
      uid: id,
    };

    try {
      await setDoc(docRef, data);
      safeDispatch({ type: T.ADDED_USER, payload: data });
      getToastMsg(FM[T.ADDED_USER]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_CREATE_USER_ACCOUNT });
      getToastMsg(E.COULD_NOT_CREATE_USER_ACCOUNT);
    }
  };

  const addCategory = async ({ id, category }: { id: string; category: string }) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const docRef: DocumentReference = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(docRef, {
        categories: arrayUnion(category),
      });

      safeDispatch({ type: T.ADDED_CATEGORY, payload: updatedDocument });
      getToastMsg(FM[T.ADDED_CATEGORY]);
    } catch (error) {
      safeDispatch({ type: T.ERROR, payload: E.COULD_NOT_UPDATE });
      getToastMsg(E.COULD_NOT_UPDATE);
    }
  };

  const deleteCategory = async ({ id, category }: { id: string; category: string }) => {
    dispatch({ type: T.IS_PENDING });
    try {
      const docRef: DocumentReference = doc(db, collectionName, id);
      const updatedDocument = await updateDoc(docRef, {
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

export { useFirestore };
