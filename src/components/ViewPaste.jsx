import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

 
  if (!paste) {
    return <div className="text-center mt-10 text-red-500">Paste not found</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 pl-4 rounded-2xl mt-2 w-[66%]"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          readOnly 
        />
      </div>
      <div className="mt-6">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          readOnly 
          placeholder="Enter content here"
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
