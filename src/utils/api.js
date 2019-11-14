const create = data => {
  return fetch("/.netlify/functions/posts-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

export default {
  create: create
  // readAll: readAll,
  // update: update,
  // delete: deleteTodo,
  // batchDelete: batchDeleteTodo
};
