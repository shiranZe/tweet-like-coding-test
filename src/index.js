import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Tweet from "./Tweet";
import Toastr from "./Toastr";
import { fetchTweets, likeTweet } from "./api";
import { isTemplateMiddle } from "typescript";

function App() {
  const [tweets, setTweets] = useState([]);
  const [showToastr, setShowToastr] = useState(false);
  const [currentLikeTweetId, setCurrentLikeTweetId] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    fetchTweetsData();
  }, []);

  const fetchTweetsData = async () => {
    const tweetsData = await fetchTweets();
    setTweets(tweetsData);
  };

  const handleLikeClick = ({ id, isLikeActivated }) => {
    const tweetsData = [...tweets];
    const likedTweetIndex = getTweetIndexById(id);
    tweetsData[likedTweetIndex] = {
      ...tweetsData[likedTweetIndex],
      isLikeActivated: !isLikeActivated,
    };
    setTweets(tweetsData);
    if (!isLikeActivated) {
      setCurrentLikeTweetId(id);
      setShowToastr(true);
      const timerId = setTimeout(() => {
        setShowToastr(false);
        likeTweetAction(id);
        setCurrentLikeTweetId("");
      }, [TOASTR_TIMEOUT]);
      setTimeoutId(timerId);
    }
  };

  const getTweetIndexById = (tweetId) => {
    return tweets.findIndex((item) => item.id === tweetId);
  };

  const handleUndoClick = () => {
    console.log("Undo");
    setShowToastr(false);
    clearTimeout(timeoutId);
    const tweetsData = [...tweets];
    const likedTweetIndex = tweetsData.findIndex(
      (item) => item.id === currentLikeTweetId
    );
    tweetsData[likedTweetIndex] = {
      ...tweetsData[likedTweetIndex],
      isLikeActivated: false,
    };
    setTweets(tweetsData);
  };

  const likeTweetAction = async (tweetId) => {
    try {
      const likeResponse = await likeTweet(tweetId);
    } catch (err) {
      console.log("failure: ", err);
      const tweetsData = [...tweets];
      const likedTweetIndex = getTweetIndexById(tweetId);
      tweetsData[likedTweetIndex] = {
        ...tweetsData[likedTweetIndex],
        isLikeActivated: false,
      };
      setTweets(tweetsData);
    }
  };

  return (
    <>
      {tweets.length &&
        tweets.map((tweetItem) => {
          return (
            <Tweet
              key={tweetItem.id}
              tweet={tweetItem}
              onLikeClick={handleLikeClick}
            />
          );
        })}
      {showToastr && <Toastr onUndoClick={handleUndoClick} />}
    </>
  );
}

const TOASTR_TIMEOUT = 3000;

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

/*
  Right now the app renders two static tweets.

  1. Use the fetchTweets function to fetch tweets and render them (id, name, handle and text).
  
  2. When the ♥️ is clicked, optimistically update the ui to show the new tweet liked state
     and update the server state using the likeTweet api method. 
     (likeTweet has a 50% chance of succeeding)
  
  3. When liking/unlining a tweet, a popover should appear with a countdown of 3
     seconds. Within these 3 seconds the user can cancel his like. 
     Please add some kind of animation for this countdown so the user sees how much time he
     has left

  4. Undo popover should close when clicking outside of it. Closing the popover should
     send the tweet like request immediately
*/
