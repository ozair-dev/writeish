import { createSelector } from "reselect";

import {
  ADD_DOCUMENT,
  ADD_DOCUMENTS,
  CLEAR_DOCUMENTS,
  INCREMENT_DOCUMENT_LIMIT,
  REMOVE_DOCUMENT,
  UPDATE_DOCUMENT,
} from "./actions.types";

import parseDate from "../../utils/hooks/parseDate";

import { selectFilters } from "../settings";

const initialState = {
  docs: [],
  limit: 10,
};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOCUMENT: {
      return {
        ...state,
        docs: [action.payload, ...state.docs],
      };
    }

    case UPDATE_DOCUMENT: {
      const { id, data } = action.payload;
      return {
        ...state,
        docs: state.docs.map((doc) => {
          if (doc.id === id) return { id, data };
          return doc;
        }),
      };
    }

    case ADD_DOCUMENTS: {
      let docs = [...action.payload, ...state.docs];
      docs = docs.filter(
        (doc, idx) => docs.findIndex((i) => i.id === doc.id) === idx
      );

      return {
        ...state,
        docs,
      };
    }

    case REMOVE_DOCUMENT: {
      return {
        ...state,
        docs: state.docs.filter((doc) => doc.id !== action.payload),
      };
    }

    case CLEAR_DOCUMENTS: {
      return {
        ...state,
        docs: [],
      };
    }

    case INCREMENT_DOCUMENT_LIMIT: {
      return {
        ...state,
        limit: state.limit + 10,
      };
    }

    default: {
      return state;
    }
  }
};

export const selectDocuments = (state) => state.documents.docs;

export const selectDocumentsIds = createSelector(selectDocuments, (documents) =>
  documents.map((doc) => doc.id)
);

// to group documents based on filters
export const selectGroupedDocs = createSelector(
  selectDocuments,
  selectFilters,
  (documents, filters) =>
    documents.reduce((prev, next) => {
      const lastItem = prev[prev.length - 1];
      if (
        lastItem &&
        lastItem.filter === parseDate(next.data[filters.field].toDate())
      ) {
        lastItem.docs.push(next.id);
      } else {
        prev.push({
          filter: parseDate(next.data[filters.field].toDate()),
          docs: [next.id],
        });
      }
      return prev;
    }, [])
);

export const selectDocumentById = createSelector(
  [selectDocuments, (state, id) => id],
  (docs, id) => docs.find((doc) => doc.id === id)
);

export default documentsReducer;
