import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import axios from "axios";

const UPLOAD_URL = "localhost:3000";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setUrl(url);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    const payload={
      file:formData,
      question:question
    }
    axios.post(UPLOAD_URL,payload).then(res=>{
      setAnswer(res.answer)
    }).catch(err=>{
      alert('Something went wrong!')
    });
  };
  return (
    <div className="main-div">
      <div className="main-container">
        <div className="image-and-question">
          <div className="question-image-container">
            <div className="file-and-file-name">
              <label for="file-upload" class="custom-file-upload">
                <FontAwesomeIcon icon={faCloudUploadAlt} /> Select image
              </label>
              <input id="file-upload" type="file" onChange={onFileChange} />
              <div className="file-name">
                {selectedFile ? selectedFile.name : "No file selected"}
              </div>
            </div>
            <input
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              placeholder="Enter your question"
              className="question-input"
            />
            <button
              onClick={onFileUpload}
              className="upload-button"
              disabled={!selectedFile}
            >
              Upload!
            </button>
          </div>
          <div>
            <img src={url} className="img-preview" />
          </div>
        </div>
        <div className="answer">
          {answer && (
            <div>
              <h3>Q. {question}</h3>
              <h3>Answer: {answer}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
