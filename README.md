If you prefer working in a codesandox environment instead of cloning the repo locally you can do it here:
https://codesandbox.io/s/tweet-like-coding-test-87ur3

###Task description:

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

###Terms:

Optimistically update the UI - This means that the like/unlike action should be performed regardless of the server response. And in case of a server failure it should be reverted.
