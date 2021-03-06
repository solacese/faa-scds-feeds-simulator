/**
 * index.js
 * @author Andrew Roberts
 */

// polyfill async
import "core-js/stable";
import "regenerator-runtime";

// app modules
import { createMqttClient } from "./mqtt-client";
import { createFdpsPositionFeedSource } from "./fdps";

async function run() {
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_HOST_MQTT,
    options: {
      username: process.env.SOLACE_USERNAME,
      password: process.env.SOLACE_PASSWORD,
    },
  };

  let mqttClient = createMqttClient(mqttClientConfig);

  mqttClient = await mqttClient.connect().catch(() => {
    // handle retry logic here, for this simulator just blow up if connection fails
    process.exit(1);
  });

  let fdpsPositionFeedSource = createFdpsPositionFeedSource(mqttClient.publish);

  fdpsPositionFeedSource.start();

  // run until sigint
  console.log("Running until a SIGINT signal is received...");
  process.stdin.resume();
  process.on("SIGINT", function () {
    console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
    console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
    process.exit();
  });
}

console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
console.log("+-+-+-+-+-+-+-+-+-+-+-+-+-+");
console.log(new Date().toLocaleTimeString());
console.log("Starting mock FAA feeds...");

run();
