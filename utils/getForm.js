import { loadDB } from "../firebase";

export default async formID => {
  const db = await loadDB();
  const form = await db
    .firestore()
    .collection("forms")
    .doc(formID)
    .get();
  return form;
};
