import axios from "axios";
import dotenv from 'dotenv';
const baseUrl = (process.env.NODE_ENV === 'production') ? "http://https://nyseer-ecommerce-site.vercel.app/api" : "http://localhost:3000/api";

const http = axios.create({

    baseURL: baseUrl,
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