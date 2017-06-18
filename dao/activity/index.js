const followDao = require('../follow');

const listeners = { };

const activities = { };

function publishActivityToMailbox(mid, activity) {
  let counter=0;
  if (!activities[mid]) { activities[mid] = []; }
  activities[mid].unshift(activity);
  publishActivityToListeners(mid, activity);
}

function publishActivityToListeners(mid, activity) {
  if(!listeners.hasOwnProperty(mid)) { return; }
  listeners[mid].forEach((socket) => {
    socket.emit('newActivity', activity);
  });
}

function retriveActivitiesFromMailbox(mid) {
  return activities[mid];
}

function addListnerToMailbox(mid, socket) {
  if (!listeners[mid]) { listeners[mid] = []; }
  if(listeners[mid].indexOf(socket) > -1) { return; }
  listeners[mid].push(socket);
  console.log('listeners:', listeners[mid].length);
}

function removeListnerFromMailbox(mid, socket) {
  if(!listeners.hasOwnProperty(mid)) { return; }
  const index=listeners[mid].indexOf(socket);
  listeners[mid].splice(index, 1);
  console.log('');
}

module.exports = {
  publishActivityToMailbox,
  retriveActivitiesFromMailbox,
  addListnerToMailbox,
  removeListnerFromMailbox,
};
