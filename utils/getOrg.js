import { loadDB } from "../firebase";

export default async orgID => {
  const db = await loadDB();
  const org = await db
    .firestore()
    .collection("orgs")
    .doc(orgID)
    .get();
  return org;
};
