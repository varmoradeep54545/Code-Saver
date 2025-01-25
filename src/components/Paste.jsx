import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import Modal from "react-modal";
import {
  FaLinkedin,
  FaSquareXTwitter,
  FaTelegram,
  FaSquareWhatsapp,
} from "react-icons/fa6";
import { FaEdit, FaCopy } from "react-icons/fa";
import { MdDelete, MdOutlineIosShare } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const Paste = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (pasteId) => {
    const urlLink = `http://localhost:5173/paste/${pasteId}`;
    setCurrentUrl(urlLink);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className="rounded-2xl p-3 min-w-[600px] mt-5"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="rounded-2xl flex flex-col gap-5 mt-5 justify-evenly w-[900px] border p-3 bg-[#121212]">
        <h1>All Pastes</h1>
        <hr />
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="border h-[200px] rounded-2xl"
                key={paste._id}
                style={{ padding: "20px", position: "relative" }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {paste.title}
                </div>

                <div className="flex flex-row justify-end gap-3 text-[15px] mt-5 text-right">
                  <div>
                    <FaRegCalendarAlt className="text-[20px]" />
                  </div>
                  <div>
                    {new Date(paste.createAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div
                  className="line-clamp-3 overflow-hidden text-ellipsis"
                  style={{
                    fontSize: "18px",
                    textAlign: "left",
                    marginTop: "7px",
                  }}
                >
                  {paste.content}
                </div>

                <div
                  className="flex flex-row gap-4"
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <button className="" title="Edit">
                    <a href={`/?pasteId=${paste?._id}`}>
                      <FaEdit />
                    </a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard", {
                        position: "top-right",
                      });
                    }}
                    title="Copy"
                  >
                    <FaCopy />
                  </button>
                  <button onClick={() => openModal(paste?._id)} title="Share">
                    <MdOutlineIosShare />
                  </button>
                </div>

                <Modal
                  ariaHideApp={false}
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Share Modal"
                  style={{
                    overlay: {
                      backgroundColor: "rgb(10 8 8 / 20%)",
                      backdropFilter: "blur(5px)",
                    },
                    content: {
                      top: "50%",
                      left: "50%",
                      right: "auto",
                      bottom: "auto",
                      marginRight: "-50%",
                      width: "30%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      backgroundColor: "rgba(15, 15, 15)",
                    },
                  }}
                >
                  <button
                    onClick={closeModal}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "none",
                      border: "none",
                      outline: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    ✖
                  </button>

                  <h2>Share this URL</h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "25px",
                    }}
                  >
                    <input
                      type="text"
                      value={currentUrl}
                      readOnly
                      style={{
                        width: "80%",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentUrl);
                        toast.success("URL Copied!",{
                        position: "top-right",
                        });
                      }}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        backgroundColor: "rgb(54, 137, 209)",
                        color: "white",
                      }}
                    >
                      Copy
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <a
                      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        style={{
                          padding: "0px",
                          fontSize: "40px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <FaLinkedin />
                      </button>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        style={{
                          padding: "0px",
                          fontSize: "40px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <FaSquareXTwitter />
                      </button>
                    </a>
                    <a
                      href={`https://telegram.me/share/url?url=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        style={{
                          padding: "0px",
                          fontSize: "40px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <FaTelegram />
                      </button>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        currentUrl
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button
                        style={{
                          padding: "0px",
                          fontSize: "40px",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        <FaSquareWhatsapp />
                      </button>
                    </a>
                  </div>
                </Modal>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;