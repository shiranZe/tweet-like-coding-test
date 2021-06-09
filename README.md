![image](https://user-images.githubusercontent.com/2545447/118928968-95fd7180-b94c-11eb-9dc8-94dbca7a039b.png)


**Task description:**

Right now the app renders two static tweets.

  1. Use the fetchTweets function to fetch tweets and render them (id, name, handle and text).
  
  2. When the ♥️ is clicked, **optimistically update** the ui to show the new tweet liked state
     and update the server state using the likeTweet api method. 
     (likeTweet has a 50% chance of succeeding)
  
  3. When liking/unliking a tweet, a message should appear with a countdown of 3
     seconds. Within these 3 seconds the user can cancel his like. 
     Please add some kind of visual indication for this countdown so the user sees how much time he
     has left

  4. This Undo message should close when clicking outside of it. Closing the message should
     send the tweet like/unlike request immediately

**Terms:**

Optimistically update the UI - This means that the like/unlike action should be performed immediatly, regardless of the server response. And in case of a server failure it should be reverted.

Undo message - Don't worry too much about styling this message. It can be as simple as a div in the corner of the screen.
