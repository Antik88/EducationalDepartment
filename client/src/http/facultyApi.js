import { $host } from "./index.js";

export const createFaculty = async (faculty) => {
    const {data} = await $host.post("/faculty/create", faculty)
    return data
}

export const fatchAllFacultis = async () => {
    const {data} = await $host.get("/faculty/all")
    return data
}

export const fatchAllCategories = async () => {
    const {data} = await $host.get("/categories/all")
    return data
}