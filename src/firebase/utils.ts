import {
  Firestore,
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import dbInterceptor from "./db-interceptor";

export const getCollection = <T>(
  db: Firestore,
  path: string
): CollectionReference<T> => {
  return collection(db, path).withConverter(dbInterceptor);
};

export const getDocument = <T>(
  db: Firestore,
  path: string,
  id?: string
): DocumentReference<T> => {
  return id
    ? doc(db, path, id).withConverter(dbInterceptor)
    : doc(db, path).withConverter(dbInterceptor);
};
