import {
  FirestoreDataConverter,
  Timestamp,
  DocumentSnapshot,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

export const dataConverter: FirestoreDataConverter<any> = {
  toFirestore(data: WithFieldValue<any>) {
    return {
      ...data,
      created_at:
        data.created_at instanceof Date
          ? Timestamp.fromDate(data.created_at)
          : data.created_at,
      updated_at: serverTimestamp(),
    };
  },
  fromFirestore(snapshot: DocumentSnapshot) {
    const data = snapshot.data() || {};
    return {
      ...data,
      id: snapshot.id,
      created_at:
        data.created_at instanceof Timestamp
          ? data.created_at.toDate()
          : data.created_at,
      updated_at:
        data.updated_at instanceof Timestamp
          ? data.updated_at.toDate()
          : data.updated_at,
    };
  },
};
