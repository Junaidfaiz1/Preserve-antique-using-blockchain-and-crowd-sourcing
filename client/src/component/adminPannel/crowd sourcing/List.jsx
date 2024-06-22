import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Timeline } from "react-twitter-widgets";
import TweetComposer from "./TweetComposer";

const List = () => {
  const { hashtag } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change the delay as needed or remove if not required

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  return (
    <div>
      <div className="text-center">
        <div className="centered">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <h3 className="text-center">Search Query: {hashtag}</h3>
              <Timeline
                dataSource={{
                  sourceType: `profile`,
                  screenName: hashtag,
                }}
                options={{
                  height: "400",
                }}
                onLoad={() => setLoading(false)} // Set loading to false when tweets are loaded
                onError={(err) => setError(err)} // Handle errors
              />
            </>
          )}
        </div>
      </div>
      <TweetComposer />
      <div />
    </div>
  );
};

export default List;
