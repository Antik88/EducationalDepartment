import { $host } from "./index.js";

export const createEvent = async (event) => {
    const { data } = await $host.post("/event/create", event)
    return data
}

export const fatchAllEvents = async () => {
    const { data } = await $host.get("/event/all")
    return data
}

export const fatchAllEventsParams = async (subdivisions) => {
    const { data } = await $host.get("/event/params/subdiv", {
        params: {
            subdivisions: subdivisions 
        }
    })
    return data
}

export const fetchOneEvent = async (id) => {
    const { data } = await $host.get("/event/" + id)
    return data
}