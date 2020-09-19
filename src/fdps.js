/**
 * fdps.js
 * @author Andrew Roberts
 */

import produce from "immer";
import { identifierPrefixes, aircraftIdentifierPrefixes } from "./mock-data";

// fdps

export function createFdpsPositionFeedSource(publish) {
  let interval;

  function start() {
    setInterval(() => {
      let mockFdpsPositionTick = createMockFdpsPositionTick();
      publish(createFdpsPositionTopic(mockFdpsPositionTick), mockFdpsPositionTick, { qos: 0 });
    }, 2); // interval between data — this is set to 2 ms
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  return produce({}, (draft) => {
    draft.start = start;
    draft.stop = stop;
  });
}

function createMockFdpsPositionTick() {
  let randomIdentifierPrefix = identifierPrefixes[Math.floor(Math.random() * identifierPrefixes.length - 1)];
  let randomIdentifierNumber = createRandomIntBetween(10000000, 90000000);

  let randomAircraftIdentifierPrefix =
    aircraftIdentifierPrefixes[Math.floor(Math.random() * aircraftIdentifierPrefixes.length - 1)];
  let randomAircraftIdentifierNumber = createRandomIntBetween(1, 9000);

  let randomLatInteger = createRandomIntBetween(25, 50);
  let randomLatDecimal = Math.random();

  let randomLonInteger = createRandomIntBetween(65, 125);
  let randomLonDecimal = Math.random();

  let randomActualSpeed = createRandomIntBetween(100, 650);

  let randomAltitude = createRandomIntBetween(100, 40000);

  let _ = createRandomIntBetween(0, 1);
  let randomSign = _ == 0 ? "" : "-";
  let randomTrackVelocityX = createRandomIntBetween(100, 600);
  let randomTrackVelocityY = createRandomIntBetween(100, 600);

  return {
    root: `FDPS`,
    feed: `position`,
    identifier: `${randomIdentifierPrefix}${randomIdentifierNumber}`,
    fdpsFlightStatus: "ACTIVE",
    aircraftIdentifier: `${randomAircraftIdentifierPrefix}${randomAircraftIdentifierNumber}`,
    lat: (randomLatInteger + randomLatDecimal).toFixed(6),
    lon: `${randomSign}${(randomLonInteger + randomLonDecimal).toFixed(6)}`,
    actualSpeed: randomActualSpeed.toFixed(1),
    altitude: randomAltitude.toFixed(1),
    trackVelocityX: `${randomSign}${randomTrackVelocityX.toFixed(1)}`,
    trackVelocityY: `${randomSign}${randomTrackVelocityY.toFixed(1)}`,
  };
}

function createFdpsPositionTopic(fdpsPositionTick) {
  return `${fdpsPositionTick.root}/${fdpsPositionTick.feed}/${fdpsPositionTick.identifier}/${fdpsPositionTick.fdpsFlightStatus}/${fdpsPositionTick.aircraftIdentifier}/${fdpsPositionTick.lat}/${fdpsPositionTick.lon}/${fdpsPositionTick.actualSpeed}/${fdpsPositionTick.altitude}/${fdpsPositionTick.trackVelocityX}/${fdpsPositionTick.trackVelocityY}`;
}

// utils

function createRandomIntBetween(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
