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

const LikeButton = ({id, likeTweet}) => {
  const [color, setColor] = useState(false);
  const handleClick = async ()=>{
    setColor(!color)
    await likeTweet(id)
  }

  return <i onClick={handleClick} className={color? `fa fa-heart like-button liked`: "fa fa-heart like-button"} />;
}

const MoreOPtionsButton = () => (
  <i className="fa fa-ellipsis-h more-options-button" />
);
