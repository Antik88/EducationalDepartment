import { $host } from "./index.js";

export const createSubdivision = async (subdivision) =>{
    const {data} = await $host.post("/subdivisions/create", subdivision)
    return data
}

export const fatchAllSubdivisions = async () =>{
    const {data} = await $host.get("/subdivisions/all")
    return data
}