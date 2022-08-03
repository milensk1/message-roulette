const EVENT = "message";
// errors
const NO_CLIENTS = "No one is connected!";
const NO_PARAM = '"count" param is missing!';
// messages
const RANDOM = "This was sent to you randomly.";
const TO_ALL = "This was sent to everyone.";

export const handleSpin = (io) => {
  let clientIds = getConnectedClientIds(io);
  if (clientIds?.length === 0) {
    throw new Error(NO_CLIENTS);
  }

  let randomId = getRandomItem(clientIds);
  io.to(randomId).emit(EVENT, RANDOM);
};

export const handleWild = (io, num) => {
  if (!num) {
    throw new Error(NO_PARAM);
  }

  let clientIds = getConnectedClientIds(io);
  if (clientIds?.length === 0) {
    throw new Error(NO_CLIENTS);
  }

  let randomIds = getMultipleRandomItems(clientIds, num);
  for (const randomId of randomIds) {
    io.to(randomId).emit(EVENT, RANDOM);
  }
};

export const handleBlast = (io) => {
  io.emit(EVENT, TO_ALL);
};

function getConnectedClientIds(io) {
  return Array.from(io.sockets.sockets.keys());
}

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getMultipleRandomItems(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
