import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectGroupedDocs } from "../../reducer/documents";
import { incrementDocumentsLimit } from "../../reducer/documents/actions";

import GroupedDocuments from "./GroupedDocuments";

const Documents = () => {
  const dispatch = useDispatch();

  const groupedDocs = useSelector(selectGroupedDocs);

  return (
    <div>
      {groupedDocs.map((group, idx) => (
        <GroupedDocuments key={idx} group={group} />
      ))}

      {!!groupedDocs.length && (
        <button
          onClick={() => dispatch(incrementDocumentsLimit())}
          className="w-full mt-2 text-center underline font-semibold text-emerald-500 dark:text-white"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Documents;
