import { loadDB } from "../firebase";
import slugify from "./slugify";

export default async state => {
  const db = await loadDB();
  const { id, releaseName, date, items } = state;
  for (let item of items) {
    item.selectedTags = item.selectedTags
      ? item.selectedTags.map(tag =>
          db.firestore().doc(`/tags/${slugify(tag)}`)
        )
      : [];
  }

  await db
    .firestore()
    .collection("releases")
    .doc(id)
    .set({ id, releaseName, date, items });
  return true;
};
