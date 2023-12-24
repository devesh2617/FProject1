import axios from 'axios'


const getApi = async (url:string) => {
   try {
    const res = await axios.get(`http://localhost:3000/${url}`)
    return res
   } catch (error:any) {
    return error
   }
}

const postApi = async (url:string, body: object) => {
  try {
   const res = await axios.post(`http://localhost:3000/${url}`, body)
   return res
  } catch (error:any) {
    return error
  }
}

export {getApi, postApi}