import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changetext } from "./features/textslice";
import {
  capitalizeWords,
  encodeToBase64,
  extractEmailsFromString,
  extractLinksFromString,
  extractNumbersFromString,
  extractSpecialCharacters,
  formatDate,
  shuffleString,
} from "./helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [name, setname] = useState("Listen Now");

  let dispatch = useDispatch();
  let { text, mode } = useSelector((state) => state.text);
  let isvalid = text.length < 2;

  const updateText = (newText) => {
    setUndoStack([...undoStack, text]);
    setRedoStack([]); // Clear redo stack on new action
    dispatch(changetext(newText));
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastText = undoStack.pop();
      setRedoStack([...redoStack, text]);
      dispatch(changetext(lastText));
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const lastText = redoStack.pop();
      setUndoStack([...undoStack, text]);
      dispatch(changetext(lastText));
    }
  };

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    let jointext = text + " " + speechToText;
    updateText(jointext);
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      toast.error("Please allow the microphone", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      alert("An error occurred with speech recognition: " + event.error);
    }
  };

  const handleSpeechInput = () => {
    recognition.start();
  };

  function uppercase() {
    let uppercasevalue = text.toUpperCase();
    updateText(uppercasevalue);
  }

  function lowercase() {
    let lowercasevalue = text.toLowerCase();
    updateText(lowercasevalue);
  }

  function sentence() {
    let sentencevalue = capitalizeWords(text);
    updateText(sentencevalue);
  }

  function removespaces() {
    const trimmedString = text.trim();
    const result = trimmedString.replace(/\s+/g, " ");
    updateText(result);
  }

  function removespecialcharacte() {
    let removedstr = text.replace(/[^a-zA-Z0-9 ]/g, "");
    updateText(removedstr);
  }

  function copytoclipboard() {
    if (!navigator.clipboard) {
      toast.error("The browser is too old and doesn't support it", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  function cleartext() {
    updateText("");
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `textutils ${formatDate(new Date())}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  async function pastefromclipboard() {
    try {
      if (navigator.clipboard) {
        const copiedtext = await navigator.clipboard.readText();
        let jointext = text + " " + copiedtext;
        updateText(jointext);
      } else {
        toast.error("your browser don't support", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  }

  function listen() {
    if ("speechSynthesis" in window) {
      setname("Listen Now");
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      } else {
        setname("Stop Now");
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => {
          setname("Listen Now");
        };
      }
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  }

  function reverse() {
    let reversevalue = text.split("").reverse().join("");
    updateText(reversevalue);
  }

  function shuffleword() {
    let shufflevalue = shuffleString(text);
    updateText(shufflevalue);
  }

  function encode() {
    let encodevalue = encodeToBase64(text);
    updateText(encodevalue);
  }

  function extractnumber() {
    let numbers = extractNumbersFromString(text);
    updateText(numbers);
  }

  function extracttext() {
    let updatedtext = text.replace(/[^a-zA-Z]/g, "");
    updateText(updatedtext);
  }

  function extractlink() {
    let alllinks = extractLinksFromString(text);
    updateText(alllinks);
  }

  function extractemail() {
    let allemails = extractEmailsFromString(text);
    updateText(allemails);
  }

  function extractspecial() {
    let specialcharacters = extractSpecialCharacters(text);
    updateText(specialcharacters);
  }
  let customstyle = {
    backgroundColor: mode == "dark" ? "#95a5a6" : "white",
    color: mode == "dark" ? "#F7F7F7" : "black",
  };
  return (
    <div className="container mt-2">
      <ToastContainer />
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Enter the text to analyze here
        </label>
        <textarea
          style={customstyle}
          placeholder="Enter the text ..."
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="8"
          value={text}
          onChange={(e) => updateText(e.target.value)}
        ></textarea>
      </div>
      <button
        className="btn btn-primary m-2"
        onClick={uppercase}
        disabled={isvalid}
      >
        UpperCase
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={lowercase}
        disabled={isvalid}
      >
        LowerCase
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={sentence}
        disabled={isvalid}
      >
        Sentence Case
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={removespaces}
        disabled={isvalid}
      >
        Remove Extra Spaces
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={removespecialcharacte}
        disabled={isvalid}
      >
        Remove Special Characters
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={copytoclipboard}
        disabled={isvalid}
      >
        Copy Text
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={cleartext}
        disabled={isvalid}
      >
        Clear Text
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={downloadTxtFile}
        disabled={isvalid}
      >
        Download as Txt file
      </button>
      <button className="btn btn-primary m-2" onClick={pastefromclipboard}>
        Paste from clipboard
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={listen}
        disabled={isvalid}
      >
        {name}
      </button>
      <button className="btn btn-primary m-2" onClick={handleSpeechInput}>
        Speak Now
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={reverse}
        disabled={isvalid}
      >
        Reverse text
      </button>
      <button
        onClick={() => {
          $("#replaceModal").modal("show");
        }}
        className="btn btn-primary"
        disabled={isvalid}
      >
        Replace Text
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={shuffleword}
        disabled={isvalid}
      >
        Shuffle text
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={encode}
        disabled={isvalid}
      >
        Encode to base64
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={extractnumber}
        disabled={isvalid}
      >
        Extract Number
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={extracttext}
        disabled={isvalid}
      >
        Extract Text
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={extractlink}
        disabled={isvalid}
      >
        Extract Link
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={extractemail}
        disabled={isvalid}
      >
        Extract Email
      </button>
      <button
        onClick={extractspecial}
        className="btn btn-primary m-2"
        disabled={isvalid}
      >
        Extract special Characters
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={undo}
        disabled={undoStack.length <= 1}
      >
        Undo Action
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={redo}
        disabled={redoStack.length == 0}
      >
        Redo Action
      </button>
    </div>
  );
}
