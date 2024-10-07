import { useSelector } from "react-redux";
import {
  averageWordLength,
  countQuestionMarks,
  countSentences,
  countSpecialCharacters,
  countstatement,
} from "./summaryhelper";

export default function Summary() {
  let { text } = useSelector((state) => state.text);
  return (
    <div className="container">
      <h2 className="mt-2">Text Summary</h2>
      <div>
        <span className="mt-2 ml-1">
          Characters <strong>{text.length}</strong>
        </span>{" "}
        &nbsp;
        <span className="mt-2 ml-1">
          Words{" "}
          <strong>
            {text.split(" ").filter((element) => element != "").length}
          </strong>
        </span>
        &nbsp;
        <span className="mt-2 ml-1">
          Sentences <strong>{countSentences(text)}</strong>
        </span>
        &nbsp;
        <span className="mt-2 ml-1">
          Statements <strong>{countstatement(text)}</strong>
        </span>
        &nbsp;
        <span className="mt-2 ml-1">
          Average Word Length <strong>{averageWordLength(text)}</strong>
        </span>
        &nbsp;
        <span className="mt-2 ml-1">
          Questions <strong>{countQuestionMarks(text)}</strong>
        </span>
        &nbsp;
        <span className="mt-2 ml-1">
          Special Characters <strong>{countSpecialCharacters(text)}</strong>
        </span>
      </div>
    </div>
  );
}
