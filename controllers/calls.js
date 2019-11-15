'use strict';

import { renderPost } from '../services/render.js'

function getPosts() {
  fetch('http://localhost:8080/posts')
    .then((response) => {
      return response.json();
    })
    .then(response => renderPost(response));
}

export { getPosts };



