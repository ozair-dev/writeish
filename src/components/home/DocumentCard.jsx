import React from "react";

import { Link } from "react-router-dom";

import MDEditor from "@uiw/react-md-editor";

import { useSelector } from "react-redux";

import { selectDocumentById } from "../../reducer/documents";

import { AiFillEdit, AiFillEye } from "react-icons/ai";
import parseDate from "../../utils/hooks/parseDate";

const DocumentCard = ({ id }) => {
  const { data } = useSelector((state) => selectDocumentById(state, id));

  return (
    <div className="p-1 pb-0 flex flex-col bg-emerald-400 text-white dark:bg-slate-700 h-52 w-48 m-2 rounded-lg shadow-md shadow-emerald-200 dark:shadow-slate-700 overflow-hidden relative group">
      <p className="truncate text-xl font-semibold ">{data.title}</p>
      <p className="truncate text-lg font-medium">{data.type}</p>

      <MDEditor.Markdown
        source={data.value}
        className="mx-1 flex-1 overflow-hidden h-12 text-xs rounded bg-gray-200 dark:bg-slate-400 dark:text-slate-900 whitespace-pre-wrap p-1"
      />

      <p className="text-gray-500 dark:text-white text-xs text-right w-full">
        Created: {parseDate(data.createdAt.toDate())}
      </p>

      <div className="absolute top-0 right-0">
        <Link to={`preview/${id}`}>
          <button className="hidden rounded group-hover:block bg-sky-600 text-white my-1 p-1">
            <AiFillEye className="text-xl" />
          </button>
        </Link>

        <Link to={`edit/${id}`}>
          <button className="hidden rounded group-hover:block bg-green-600 text-white my-1 p-1">
            <AiFillEdit className="text-xl" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;
