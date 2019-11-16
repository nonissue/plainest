import { axios } from "axios";

async function create(data) {
  return axios.post(`/.netlify/functions/posts-create`, data).then(response => {
    return response.json();
  });
}

async function hydrate() {
  return axios.get(`/.netlify/functions/instagram`).then(response => {
    return response.json();
  });
}

const readAll = () => {
  return axios.get("/.netlify/functions/posts-read-all").then(response => {
    return response.json();
  });
};

const deletePost = postId => {
  return axios
    .post(`/.netlify/functions/posts-delete/${postId}`, {
      method: "POST"
    })
    .then(response => {
      return response.json();
    });
};

export default {
  create: create,
  readAll: readAll,
  hydrate: hydrate,
  // update: update,
  delete: deletePost
  // batchDelete: batchDeleteTodo
};
