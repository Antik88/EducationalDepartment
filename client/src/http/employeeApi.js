import { $host } from "./index.js";

export const createEmployee = async (employee) =>{
    const {data} = await $host.post("/employee/create", employee)
    return data
}

export const fatchAllEmployeers = async () =>{
    const {data} = await $host.get("/employee/all")
    return data
}

export const login = async (user) => {
    const {data} = await $host.post("/user/login", user)
    return data
}
