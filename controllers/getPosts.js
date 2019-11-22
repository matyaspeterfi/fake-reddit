'use strict';

import { renderPost } from '../services/renderPosts.js'
// import { get } from 'http';

// let getPosts = () => {
//   fetch('http://localhost:8080/posts')
//     .then((response) => {
//       return response.json();
//     })
//     .then(response => renderPost(response));
// }

let getPosts = new XMLHttpRequest;
getPosts.onreadystatechange = console.log(getPosts.readyState);

getPosts.open('GET', 'http://localhost:8080/posts', true);

getPosts.onload = () => {
  renderPost(JSON.parse(getPosts.response));
}

export { getPosts };



