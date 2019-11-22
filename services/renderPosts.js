'use strict';

import { calcTimeAgo } from './calcTimeAgo.js';
import { upDownVote } from '../controllers/upDownVote.js';

let upvoteAsset = 'assets/upvote.png'
let downVoteAsset = 'assets/downvote.png'

function renderPost(postData) {

  let postsCont = document.querySelector('.postsCont');
  let postList = postData.posts
  // console.log(postList);

  for(let i = 0; i < postList.length; i++){
  
  let postId = postList[i].post_id;
  let title = postList[i].title;
  let url = postList[i].url;
  let timeStamp = postList[i].timestamp;
  let scoreData = postList[i].score;
  let owner = postList[i].owner;

  let post = document.createElement('div');
  post.setAttribute('class', 'post');

  let voteCont = document.createElement('div');
  voteCont.setAttribute('class', 'voteCont');
  post.appendChild(voteCont);

  let upVote = document.createElement('img');
  upVote.setAttribute('class', `upVote ${postId}`);
  upVote.setAttribute('src', `${upvoteAsset}`);
  voteCont.appendChild(upVote);

  let score = document.createElement('p');
  score.setAttribute('class', 'score');
  score.setAttribute('id', `${postId}`);
  score.innerText = `${scoreData}`;
  voteCont.appendChild(score);

  let downVote = document.createElement('img');
  downVote.setAttribute('class', `downVote`);
  downVote.setAttribute('src', `${downVoteAsset}`);
  downVote.setAttribute('onclick', `upDownVote('downvote', ${postId})`);
  voteCont.appendChild(downVote);
  
  let postText = document.createElement('div');
  postText.setAttribute('class', 'postText');
  post.appendChild(postText);
  
  let postTitle = document.createElement('a');
  postTitle.setAttribute('class', 'postTitle');
  postTitle.setAttribute('href', `${url}`);
  postTitle.innerText = title;
  postText.appendChild(postTitle);
  
  let postUrl = document.createElement('a');
  postUrl.setAttribute('class', 'postUrl');
  postUrl.innerText = url;
  postText.appendChild(postUrl);
  
  let submittedOn = document.createElement('p');
  submittedOn.setAttribute('class', 'timestamp');
  submittedOn.innerText = `Submitted ${calcTimeAgo(timeStamp)} minutes ago by ${owner}`;
  postText.appendChild(submittedOn);
  
  let postLinks = document.createElement('div');
  postLinks.setAttribute('class', 'postLinks');
  postText.appendChild(postLinks);
  
  let actionModify = document.createElement('a');
  actionModify.setAttribute('class', 'action modify');
  actionModify.innerText = 'Modify';
  // actionModify.setAttribute('href', 'TBC');
  postLinks.appendChild(actionModify);
  
  let actionRemove = document.createElement('a');
  actionRemove.setAttribute('class', 'action remove');
  actionRemove.innerText = 'Remove';
  // actionRemove.setAttribute('href', 'TBC');
  postLinks.appendChild(actionRemove);
  
  postsCont.appendChild(post);
}
}

export { renderPost };