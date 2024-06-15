import express from "express";
import { createClient, commandOptions } from 'redis';
import { consumerGroupName, streamName } from "./keys";

const generatePort = (consumerName: string) => {
    const basePort = 6001;
    let hash = 0;

    for (let i = 0; i < consumerName.length; i++) {
        hash = consumerName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return basePort + (hash % 1000);
}

const run = async () => {
    const client = createClient();

    if (process.argv.length !== 3) {
        console.log(`usage: node stream-consumer-group.js <consumerName>`);
        process.exit(1);
    }

    const consumerName = process.argv[2];
    const port = generatePort(consumerName);

    await client.connect();

    try {
        await client.xGroupCreate(streamName, consumerGroupName, "0", {
            MKSTREAM: true
        });
        console.log('Created consumer group.');
    } catch (e) {
        console.log('Consumer group already exists, skipped creation.');
    }

    console.log(`Starting consumer ${consumerName} on port ${port}.`);

    while (true) {
        try {
            let response = await client.xReadGroup(
                commandOptions({
                    isolated: true
                }),
                consumerGroupName,
                consumerName, [
                {
                    key: streamName,
                    id: '>' 
                }
            ], {
                COUNT: 1,
                BLOCK: 5000
            });

            if (response) {
                console.log(response);
                const entryId = response[0].messages[0].id;
                await client.xAck(streamName, consumerGroupName, entryId);

                console.log(`Acknowledged processing of entry ${entryId}.`);
            } else {
                console.log('No new stream entries.');
            }
        } catch (err) {
            console.error(err);
        }
    }
}

run();

const app = express();
app.listen(generatePort(process.argv[2]), () => {
    console.log(`Consumer is running on port ${generatePort(process.argv[2])}`); 
});