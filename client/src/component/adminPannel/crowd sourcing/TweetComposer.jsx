import React, { useState } from "react";
import { Mention } from "react-twitter-widgets";

const TweetComposer = () => {
  const [inputText, setInputText] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [username, setusername] = useState("");

  // Function to handle multiple hashtags input
  const handleHashtagsChange = (e) => {
    const value = e.target.value;

    setHashtags(value); // Join hashtags with comma and space
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;

    setusername(value); // Join hashtags with comma and space
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write Tweet"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Hashtags (comma-separated)"
            value={hashtags}
            onChange={handleHashtagsChange} // Handle input change for hashtags
          />
          <input
            className="form-control mb-3"
            type="text"
            placeholder="User Name (comma-separated)"
            value={username}
            onChange={handleUsernameChange} // Handle input change for hashtags
          />
          <Mention
            className="btn btn-primary btn-block mb-5 pb-4 "
            url="http://localhost:3000/Campaigns"
            username={username}
            // eslint-disable-next-line no-useless-concat
            options={{
              size: "large",
              text:
                inputText +
                "\n" +
                "This is campaign url: http://localhost:3000/Campaigns ",
              hashtag: hashtags,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;
