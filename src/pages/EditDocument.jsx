import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Timestamp } from "firebase/firestore";

import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import { VscSaveAs } from "react-icons/vsc";
import { AiFillEye } from "react-icons/ai";

import { selectUser } from "../reducer/user";
import { selectDocumentById } from "../reducer/documents";

import { addDocument, updateDocument } from "../utils/firebase.utils";

const EditDocument = () => {
  const [data, setData] = useState({
    type: "",
    title: "",
    value: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const user = useSelector(selectUser);
  const document = useSelector((state) => selectDocumentById(state, id));

  // Because this page is used to both create and edit existing documents
  useEffect(() => {
    if (document) setData(document.data);
    else if (id) navigate("/", { replace: true });
  }, [document, id, navigate]);

  const handleChange = (name) => (e) => {
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timestamp = Timestamp.fromDate(new Date());

    if (user) {
      if (document) {
        await updateDocument(`${user.uid}/${id}`, {
          ...data,
          lastModified: timestamp,
        });
      } else {
        const { id } = await addDocument(user.uid, {
          ...data,
          createdAt: timestamp,
          lastModified: timestamp,
        });

        navigate(`/edit/${id}`, { replace: true });
      }
    } else {
      alert("Please login to save document");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-11/12 mx-auto flex flex-col items-center"
    >
      <div className="w-full mt-2 flex justify-end">
        {document && (
          <Link to={`/preview/${id}`}>
            <button className="p-2 ml-2 rounded-md text-white bg-sky-600 font-medium">
              Preview
              <AiFillEye className="inline ml-2 text-2xl" />
            </button>
          </Link>
        )}

        <button
          type="submit"
          className="p-2 ml-2 rounded-md text-white font-medium bg-emerald-400 dark:bg-slate-700"
        >
          Save
          <VscSaveAs className="inline ml-2 text-2xl" />
        </button>
      </div>

      <input
        value={data.title}
        onChange={handleChange("title")}
        placeholder="Enter Title"
        required
        className="mt-4 p-1 w-full text-3xl bg-transparent placeholder:text-gray-400 dark:text-white focus:outline-none border-b-2"
      />

      <input
        value={data.type}
        onChange={handleChange("type")}
        placeholder="Type (e.g, Diary or Todo)"
        required
        className="mt-4 p-1 self-start text-xl bg-transparent placeholder:text-gray-400 dark:text-white focus:outline-none border-b-2"
      />

      <div className="mt-4 w-full">
        <MDEditor
          value={data.value}
          onChange={(value) => setData((prev) => ({ ...prev, value }))}
          height={400}
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
    </form>
  );
};

export default EditDocument;
