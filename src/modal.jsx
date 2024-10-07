import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changetext } from "./features/textslice";

export default function Modal() {
  let dispatch = useDispatch();
  let { text, mode } = useSelector((state) => state.text);

  const [value, setvalue] = useState({
    replace: "",
    replacewith: "",
  });
  function handlechange(e) {
    setvalue({ ...value, [e.target.name]: e.target.value });
  }

  function handlesubmit() {
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Ensure value is defined and has the expected properties
    if (
      value &&
      typeof value.replace === "string" &&
      typeof value.replacewith === "string"
    ) {
      let replacedtext = text.replace(
        new RegExp(escapeRegExp(value.replace.toLowerCase()), "g"),
        value.replacewith
      );

      dispatch(changetext(replacedtext));

      // Reset the value object
      setvalue({
        replace: "",
        replacewith: "",
      });

      // Hide the modal
      $("#replaceModal").modal("hide");
    } else {
      console.error("Invalid value object:", value);
      // Handle the error, e.g., show a message to the user
    }
  }
  let customstyle = {
    backgroundColor: mode == "dark" ? "#2c3e50" : "white",
    color: mode == "dark" ? "white" : "#2c3e50",
  };
  let inputstyle = {
    backgroundColor: mode == "dark" ? "#95a5a6" : "white",
    color: mode == "dark" ? "#F7F7F7" : "black",
  };
  return (
    <>
      <div
        className="modal fade"
        id="replaceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="replaceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" style={customstyle}>
              <h5 className="modal-title" id="replaceModalLabel">
                Replace Text
              </h5>
            </div>
            <div className="modal-body" style={customstyle}>
              <form id="replaceForm">
                <div className="form-group">
                  <label htmlFor="replaceText">Replace Text</label>
                  <input
                    type="text"
                    className="form-control"
                    id="replaceText m-2 mt-2"
                    placeholder="Enter text  you want to replace "
                    name="replace"
                    onChange={handlechange}
                    value={value.replace}
                    style={inputstyle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="replaceWith">Replace With</label>
                  <input
                    type="text"
                    className="form-control m-2 mt-2"
                    id="replaceWith"
                    placeholder="Enter text you want to replace with"
                    name="replacewith"
                    onChange={handlechange}
                    value={value.replacewith}
                    style={inputstyle}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={customstyle}>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  $("#replaceModal").modal("hide");
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlesubmit}
                disabled={value.replace === "" || value.replacewith === ""}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
