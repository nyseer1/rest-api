import axios from "axios";
import dotenv from "dotenv";
import Listing from "@/models/listing";

const baseUrl =
	process.env.NODE_ENV === "production"
		? "http://https://nyseer-ecommerce-site.vercel.app/api"
		: "http://localhost:3000/api";

const http = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

const modelName = "/listings/"; //TODO USE THIS INSTEAD

const getAll = () => {
	console.log("get all request was made here from axios");
	return http.get(`${modelName}`);
};

const getOne = (id) => {
	return http.get(`${modelName + id}`);
};

const create = async (data) => {
	return http.post(`${modelName}`, data);
};

const updateOne = (id, data) => {
	return http.put(`${modelName + id}`, data);
};

const deleteOne = (id) => {
	return http.delete(`${modelName + id}`);
};

const deleteAll = () => {
	return http.delete(`${modelName}`);
};

const getOneByName = (name) => {
	return http.get(`${$modelName}` + `?name=${name}`);
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
