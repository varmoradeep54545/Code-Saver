import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };
    if(!paste.title && !paste.content) {
        toast.error("Please enter title and content", {position: 'top-right'});
        return;
      }

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }


  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 pl-4 rounded-2xl mt-3 w-[72%]"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className="p-3 rounded-2xl mt-3">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-5 flex flex-col ">
<div className="flex justify-end rounded-t-lg bg-[#121212] ">
      <button className="bg-[#121212] "
                    onClick={() => {
                      navigator.clipboard.writeText(value);
                      toast.success("Copied to Clipboard", {position: 'top-right'});
                    }}
                    title="Copy"
                  >
                   <FaCopy />
                  </button> </div> <hr/>
       <textarea
          className="  min-w-[700px] p-4 "
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea> </div>
       
        </div>
   
  );
};

export default Home;
