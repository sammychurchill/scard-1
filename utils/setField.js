import { loadDB } from "../firebase";

export default async (docID, field) => {
  console.log("field", field);
  const db = await loadDB();
  const form = await db
    .firestore()
    .collection("forms")
    .doc(docID)
    .get();
  const fields = form.data().fields;
  return fields.set(field, { merge: true });
};
