import { loadDB } from "../firebase";

export default async limit => {
  const db = await loadDB();
  let orgs = await db
    .firestore()
    .collection("orgs")
    .get();
  return orgs;
};
