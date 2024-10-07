import { useSelector } from "react-redux";
import "./App.css";
import Form from "./form";
import Modal from "./modal";
import Navbar from "./navbar";
import Preview from "./preview";
import Summary from "./Summary";
import { useEffect } from "react";
function App() {
  const { mode } = useSelector((state) => state.text);
  

  useEffect(() => {
    if (mode === "dark") {
      document.body.style.backgroundColor = "#2c3e50";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [mode]);

  return (
    <>
      <Navbar></Navbar>
      <Modal />
      <Form />
      <Summary />
      <Preview />
    </>
  );
}

export default App;
