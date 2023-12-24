import { $host } from "./index.js";

export const createStudent = async (student) =>{
    const {data} = await $host.post("/student/create", student)
    return data
}

export const fatchAllStudent = async () =>{
    const {data} = await $host.get("/student/all")
    return data
}