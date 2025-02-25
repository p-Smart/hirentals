import {
  FirestoreDataConverter,
  Timestamp,
  DocumentSnapshot,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

const dbInterceptor: FirestoreDataConverter<any> = {
  toFirestore(data: WithFieldValue<any>) {
    const isCreating = !data.created_at;
    return {
      ...data,
      created_at: isCreating ? serverTimestamp() : data.created_at,
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

export default dbInterceptor;
