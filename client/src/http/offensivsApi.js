import { $host } from "./index.js";

export const createViolations = async (invite) =>{
}

export const createWStudent = async (data) => {
    const {resp} = await $host.post('/offenses/create', data)
    return resp
}

export const fatchAllViolations = async () =>{
    const {data} = await $host.get("/offenses/all")
    return data
}