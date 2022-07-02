import React from "react";

import DocumentCard from "./DocumentCard";

const GroupedDocuments = ({ group }) => {
  return (
    <div className="mt-4">
      <p className="text-3xl text-gray-400 font-semibold">{group.filter}</p>

      <div className="flex flex-wrap ml-4">
        {group.docs.map((id) => (
          <DocumentCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default GroupedDocuments;
