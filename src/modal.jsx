import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changetext } from "./features/textslice";

export default function Modal() {
  let dispatch = useDispatch();
  let { text } = useSelector((state) => state.text);

  const [value, setvalue] = useState({
    replace: "",
    replacewith: "",
  });
  function handlechange(e) {
    setvalue({ ...value, [e.target.name]: e.target.value });
  }

  function handlesubmit() {
    let replacedtext = text.replace(
      new RegExp(value.replace, "g"),
      value.replacewith
    );
    dispatch(changetext(replacedtext));
    setvalue({
      replace: "",
      replacewith: "",
    });
    $("#replaceModal").modal("hide");
  }
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
            <div className="modal-header">
              <h5 className="modal-title" id="replaceModalLabel">
                Replace Text
              </h5>
            </div>
            <div className="modal-body">
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
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
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
