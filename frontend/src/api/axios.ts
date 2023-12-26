import axios from "axios";

const getApi = async (url: string) => {
  try {
    const res = await axios.get(`http://localhost:3000/${url}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return res;
  } catch (error: any) {
    return error;
  }
};

const postApi = async (url: string, body: FormData) => {
  try {
    const res = await axios.post(`http://localhost:3000/${url}`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "mutlipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    return error;
  }
};

export { getApi, postApi };
