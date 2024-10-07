import { useDispatch, useSelector } from "react-redux";
import { changemode } from "./features/textslice";
export default function Navbar() {
  let dispatch = useDispatch();
  let { mode } = useSelector((state) => state.text);

  function togglemode() {
    dispatch(changemode());
  }

  return (
    <nav
      className={`navbar ${
        mode == "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container-fluid">
        <a
          className={`navbar-brand ${mode == "dark" ? "text-white" : ""}`}
          href="#"
        >
          <img
            src="./texturils.png"
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          Text Utils
          <span role="img" aria-label="sun" onClick={togglemode}>
            {" "}
            {mode == "dark" ? "☀️" : "🌙"}
          </span>
        </a>
      </div>
    </nav>
  );
}
