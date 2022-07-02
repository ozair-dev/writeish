import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import {
  ADD_DOCUMENTS,
  CLEAR_DOCUMENTS,
  INCREMENT_DOCUMENT_LIMIT,
  REMOVE_DOCUMENT,
  UPDATE_DOCUMENT,
} from "./actions.types";

export const initializeDocuments = (docsLimit, uid) => (dispatch, getState) => {
  let firstLoad = true;

  const {
    settings: {
      filters: { field, order },
    },
  } = getState();

  const q = query(
    collection(db, uid),
    orderBy(field, order < 0 ? "desc" : undefined),
    limit(docsLimit)
  );

  // dispatch({ type: CLEAR_DOCUMENTS });
  return onSnapshot(q, (snapshot) => {
    let documents = [];

    snapshot.docChanges().forEach((change) => {
      const { id } = change.doc;
      const data = change.doc.data();

      if (change.type === "added") {
        documents = [...documents, { id, data }];
      } else if (change.type === "modified") {
        dispatch({ type: UPDATE_DOCUMENT, payload: { id, data } });
      } else if (change.type === "removed") {
        dispatch({ type: REMOVE_DOCUMENT, payload: id });
      }
    });

    if (documents.length) {
      if (firstLoad) {
        dispatch({ type: CLEAR_DOCUMENTS });
        firstLoad = false;
      }
      dispatch({ type: ADD_DOCUMENTS, payload: documents });
    }
  });
};

export const incrementDocumentsLimit = () => {
  return { type: INCREMENT_DOCUMENT_LIMIT };
};
