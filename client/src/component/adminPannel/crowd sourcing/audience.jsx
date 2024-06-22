import React, { useState } from "react";


const Audience = () => {
  const [inputText, setInputText] = useState("");
  return (
    <div className="text-center mt-3 mb-3">
      <div>
        <input
          type="text"
          className="m-2 w-50"
          placeholder="Search Audience by Hashtag"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <a
          href={`/tweets/${inputText}`}
          style={{  width: "100px", height:"35px"}}
          className="btn btn-dark ml-3 "
        >
          Search
        </a>
      </div>
    </div>
  );
};

export default Audience;
