import { createClient } from "redis";

const client = createClient({
    socket: {
        host: "localhost",
        port: 6379,
    }
})

client.connect();
client.on("error", (err) => {
console.log('Redis Client Error', err)
})

export {client}