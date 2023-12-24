import { $host } from "./index.js";

export const createInvite = async (invite) => {
    const { data } = await $host.post("/invites/create", invite)
    return data
}

export const fatchAll = async () => {
    const { data } = await $host.get("/invites/all")
    return data
}

export const getOneInvite = async (id) => {
    const { data } = await $host.get("/invites/one/" + id)
    return data
}