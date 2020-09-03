# faa-scds-feeds-simulator

Lightweight Node.js applications that generate and publish dummy FAA SWIM flight position data using MQTT. Currently only the FDPS feed is completed, but we plan to add more SCDS feeds in the future.

## Running the application

First clone this repo by running...

```
git clone https://github.com/solacese/faa-scds-feeds-simulator.git
cd faa-scds-feeds-simulator
```

Then cd into whichever feed you intend to run (currently only FDPS), for example:

```
cd fdps
```

Open the `.EDIT-ME.env` in your selected feed's directory and fill in your MQTT compatible event broker's connection details. If you're like most people and don't have an MQTT broker running in the background, spin up a FREE [Solace Cloud Service](https://console.solace.cloud/login/new-account) in seconds.

After filling out the connection details, rename the file to `.env`.

Now you're ready to start the simulator. You can do this by running:

```
npm run start
```

## Resources

For more information try these resources:

- Get a better understanding of [Solace Event Brokers](https://solace.com/products/event-broker/)
- The Solace [Developer Portal](https://solace.dev)
- Check out the [Solace blog](https://solace.com/blog/) for other interesting discussions around Solace technology
- Ask the [Solace community](https://solace.community/) for help
