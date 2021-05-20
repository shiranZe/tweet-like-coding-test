import React, { useState } from "react";
import Avatar from "./Avatar";
import Message from "./Message";
import NameWithHandle from "./NameWithHandle";

export default function Tweet({ tweet, likeTweet }) {
  return (
    <div className="tweet">
      <Avatar />
      <div className="content">
        <NameWithHandle name={tweet.name} handle={tweet.handle} /> <Time />
        <Message />
        <div className="buttons">
          <Reply />
          <RetweetButton />
          <LikeButton id={tweet.id} likeTweet={likeTweet} />
          <MoreOPtionsButton />
        </div>
      </div>
    </div>
  );
}

// Accessories
const Time = () => <span className="time">1min ago</span>;

const Reply = () => <i className="fa fa-reply reply-button" />;

const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;

const LikeButton = ({ id, likeTweet }) => {
  const [counter, setCounter] = useState(0)
  const [liked, setLiked] = useState(false)

  const handleClick = () => {
    setLiked(!liked)
    if (counter === 0) {
      setCounter(3)
    }
  }

  React.useEffect(() => {
    const like = async (id) => {
      await likeTweet(id).catch((err) => {
        console.log(err)
        setLiked(false)
      })
    }

    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCounter(0);
      if (liked) {
        like(id)
      }
    }
  }, [counter, likeTweet, liked, id]);


  return (
    <>
      {counter ? <span>{counter}</span> : null}
      <i onClick={handleClick} className={liked ? `fa fa-heart like-button liked` : "fa fa-heart like-button"} />
    </>
  )
}

const MoreOPtionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);
