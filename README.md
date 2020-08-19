# faa-scds-feeds-simulator

Lightweight Node.js applications that generate and publish dummy FAA SWIM flight position data using MQTT. Currently only the FDPS feed is completed, but we plan to add more SCDS feeds in the future.

## Running the applications

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

### Running multiple simulator processes

[pm2](https://github.com/Unitech/pm2/) is a cool Node.js process manager that can be used to run multiple processes of an app from one terminal window (non-exclusive statement). If for some reason you want to run multiple processes of this simulator, you can edit the "instances" property on line 6 of `pm2.json` to the number of processes you want, and then run:

```
pm2 start pm2.json
```

If you want a nice full sized console to view the active process list as well as their logs, you can run:

```
pm2 monit
```

To kill all processes, run:

```
pm2 kill
```

## Resources

For more information try these resources:

- Get a better understanding of [Solace Event Brokers](https://solace.com/products/event-broker/)
- The Solace [Developer Portal](https://solace.dev)
- Check out the [Solace blog](https://solace.com/blog/) for other interesting discussions around Solace technology
- Ask the [Solace community](https://solace.community/) for help
