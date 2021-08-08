import axios from 'axios';

const URL = 'http://localhost:5000'

export const fetchPost = () => axios.get(`${URL}/posts`);
export const deletePost = (payload) => axios.post(`${URL}/posts/delete`, payload);
export const updatePost = (payload) => axios.post(`${URL}/posts/update`, payload);