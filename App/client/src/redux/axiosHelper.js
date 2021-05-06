import axios from "axios";
import { 
    notification,
    message
 } from "antd";
import { formatValidation, clearToken } from "helpers/utility";
import {history} from "./store"
//const BASE_URL = process.env.REACT_APP_API_URL;

const BASE_URL = "http://localhost:3000"

const getHeaders = (formData = false) => {
    let authToken = localStorage.auth_token ? localStorage.auth_token : null;
    let config = {
        headers: {
            Accept: "application/json",
        },
    };
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    if (formData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
};

const checkError = (error) => {
    if(error.response.status === 401){
        clearToken()
        history.push("/signin")
    }
    
    if (error.response && error.message) {
        let { data, status } = error.response;
        if(status === 422){
            notification["error"]({
                message: data.message,
            });
        }else{
            if (data.data) {
                let description = formatValidation(data.data);
                notification["error"]({
                    message: data.message,
                    description: description,
                });
            } else {
                notification["error"]({
                    message: data.message,
                });
            }
        }
    }else {
        notification["error"]({
            message: error.message,
        });
    }
};

const axiosGet = async (url) => {
    try {
        const request = await axios.get(
            `${BASE_URL}/${url}`, 
            getHeaders(),
        );
        if (request.data && request.data.message) {
           //await successMessage(request.data.message);
           message.success(request.data.message)
        }
        return request;
    } catch (error) {
        checkError(error);
        throw error.message;
    }
};

const axiosPost = async (data, url, formData = false) => {
    try {
        const request = await axios.post(
            `${BASE_URL}/${url}`,
            data,
            getHeaders()
        );
        if (request.data && request.data.message) {
            //await successMessage(request.data.message);
            message.success(request.data.message);
        }
        return request;
    } catch (error) {
        checkError(error);
        throw error.message;
    }
};

const axiosPut = async (data, url, formData = false) => {
    try {
        const request = await axios.put(
            `${BASE_URL}/${url}`,
            data,
            getHeaders(formData)
        );
        if (request.data && request.data.message) {
            //await successMessage(request.data.message);
            message.success(request.data.message)
        }
        return request;
    } catch (error) {
        checkError(error);
        throw error.message;
    }
};

const axiosSave = async (oldTask, newTask, url) => {
    try {
        const request = await axios.put(
            `${BASE_URL}/${url}`,
            {
                id: oldTask.id,
                task: newTask,
            },
            getHeaders()
        );
        if (request.data && request.data.message) {
            //await successMessage(request.data.message);
            message.success(request.data.message)
        }
        return request;
    } catch (error) {
        checkError(error);
        throw error.message;
    }
};

const axiosDelete = async (id, url) => {
    try {
        const request = await axios.delete(
            `${BASE_URL}/${url}/${id}`,
            getHeaders()
        );
        if (request.data && request.data.message) {
            //await successMessage(request.data.message);
            message.success(request.data.message)
        }
        return request;
    } catch (error) {
        checkError(error);
        throw error.message;
    }
};

export {
    axiosGet,
    axiosPost,
    axiosDelete,
    axiosSave,
    axiosPut,
    getHeaders,
    checkError,
};
