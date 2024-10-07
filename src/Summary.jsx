import { useSelector } from "react-redux";
import {
  averageWordLength,
  calculateReadingTimeFast,
  calculateReadingTimeSlow,
  countQuestionMarks,
  countSentences,
  countSpecialCharacters,
  countstatement,
} from "./summaryhelper";

export default function Summary() {
  let { text } = useSelector((state) => state.text);
  return (
    <div className="container">
      <div>
        <h4 className="mt-2">Text Summary</h4>
        <span className="mt-2 ml-1">
          Characters <strong>{text.length}</strong>
        </span>{" "}
        &nbsp;
        <span className="mt-2 ml-1">
          Words{" "}
          <strong>
            {text
              ? text.split(" ").filter((element) => element != "").length
              : 0}
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
      <div>
        <h4 className="my-2">Time To Read</h4>
        <p>
          <span>
            Fast Reading{" "}
            <strong>{calculateReadingTimeFast(text)}minute(s)</strong>
          </span>
          &nbsp;
          <span>
            Slow Reading{" "}
            <strong>{calculateReadingTimeSlow(text)}minute(s)</strong>
          </span>
        </p>
      </div>
    </div>
  );
}
