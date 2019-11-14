const create = data => {
  return fetch("/.netlify/functions/posts-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/posts-read-all").then(response => {
    return response.json();
  });
};

const deletePost = postId => {
  return fetch(`/.netlify/functions/posts-delete/${postId}`, {
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

export default {
  create: create,
  readAll: readAll,
  // update: update,
  delete: deletePost
  // batchDelete: batchDeleteTodo
};
