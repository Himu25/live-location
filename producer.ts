import express from "express";
import { client } from "./client";
import axios from "axios";
import { streamName } from "./keys";
const app = express()

function generateRandomIPAddress() {
    const octet1 = Math.floor(Math.random() * 256);
    const octet2 = Math.floor(Math.random() * 256);
    const octet3 = Math.floor(Math.random() * 256);
    const octet4 = Math.floor(Math.random() * 256);

    const ipAddress = `${octet1}.${octet2}.${octet3}.${octet4}`;
    
    return ipAddress;
}

const run = async () => {
    for (let i = 0; i < 50; i++) {
        const ipAddress = generateRandomIPAddress();
        try {
            const response = await axios.get(`https://ipinfo.io/${ipAddress}/json?token=261f9d8e96642a`);
            const data = response.data;
            console.log(data);
            console.log(`Location for IP ${ipAddress}:`);
            console.log(`Latitude: ${data.loc.split(',')[0]}`);
            console.log(`Longitude: ${data.loc.split(',')[1]}`);
            await client.xAdd(streamName, "*", {
                city: data.city,
                country: data.country,
                latitude: data.loc.split(',')[0],
                longitude: data.loc.split(',')[1],
            });
        } catch (error) {
            console.error(`Error fetching data for IP ${ipAddress}:`, error);
        }
    }
}

run()

app.listen(6000, () => {
    console.log("Producer is running on port 6000"); 
});