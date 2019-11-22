'use strict';

import {renderPost} from '../services/renderPosts.js';
import { getPosts } from '../controllers/getPosts.js'

let upDownVote = (action, postId) => {
  let vote = new XMLHttpRequest;
  vote.open('PUT', `http://localhost:8080/posts/${postId}/${action}`, true);
  vote.send();
  vote.onload = () => {
    let newScore = JSON.parse(vote.response).score;
    let scoreDisp = document.getElementById(`#${postId}`);
    scoreDisp.innerText = newScore;
  }
};

export { upDownVote };