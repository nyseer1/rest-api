import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const getAll = () => {
    return http.get("/listings");
};

const getOne = (id) => {
    return http.get(`/listings/${id}`);
};

const create = (data) => {
    return http.post("/listings", data);
};

const updateOne = (id, data) => {
    return http.put(`/listings/${id}`, data);
};

const deleteOne = (id) => {
    return http.delete(`/listings/${id}`);
};

const deleteAll = () => {
    return http.delete("/listings");
};

const getOneByName = (name) => {
    return http.get(`/listings?name=${name}`);
};

export default {
    getAll,
    getOne,
    create,
    updateOne,
    deleteOne,
    deleteAll,
    getOneByName,
};