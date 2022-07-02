import React, { useEffect } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import MDEditor from "@uiw/react-md-editor";

import { selectDocumentById } from "../reducer/documents";
import { selectUser } from "../reducer/user";

import { removeDocument } from "../utils/firebase.utils";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Preview = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const document = useSelector((state) => selectDocumentById(state, id));

  const user = useSelector(selectUser);

  useEffect(() => {
    if (!id || !document) navigate("/", { replace: true });
  }, [document, id]);

  return (
    <div className="p-2 mt-2">
      <div className="flex justify-end">
        <Link to={`/edit/${document?.id}`}>
          <button className="mx-1 bg-green-600 text-white p-1 rounded">
            Edit <AiFillEdit className="text-xl inline-block" />
          </button>
        </Link>

        <button
          onClick={() =>
            window.confirm("Are you sure you want to delete this document?") &&
            removeDocument(`${user.uid}/${document?.id}`)
          }
          className="mx-1 bg-red-600 text-white p-1 rounded"
        >
          Delete <AiFillDelete className="text-xl inline-block" />
        </button>
      </div>
      <div className="p-2 mt-2 rounded-md bg-emerald-300 dark:bg-slate-600">
        <p className="text-4xl text-gray-600 dark:text-white font-semibold">
          {document?.data.title}
        </p>
        <p className="inline-block p-1 my-4 rounded-md text-xl dark:text-gray-600 bg-gray-300">
          {document?.data.type}
        </p>
        <MDEditor.Markdown
          source={document?.data.value}
          className="p-2 rounded-md dark:bg-slate-700 whitespace-pre-wrap"
        />
      </div>
    </div>
  );
};

export default Preview;
