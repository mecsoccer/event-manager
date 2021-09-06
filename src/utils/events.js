import { getUserProfile } from './auth';

export const getUserEvents = () => {
  const user = getUserProfile();
  const allEvents = JSON.parse(localStorage.getItem('events')) || {};
  const events = allEvents[user.email] || [];
  return events;
};
  
export const createNewEvent = (payload) => {
  const user = getUserProfile();
  const allEvents = JSON.parse(localStorage.getItem('events'));
  const events = getUserEvents();

  localStorage.setItem('events', JSON.stringify({
    ...allEvents,
    [user.email]: [
      ...events,
      payload
    ]
  }))
};
  
export const deleteCreatedEvent = (name, cb) => {
  const user = getUserProfile();
  const allEvents = JSON.parse(localStorage.getItem('events'));
  const events = getUserEvents();
  const namedEventIndex = events.findIndex((item) => item.name === name);

  events.splice(namedEventIndex, 1);

  localStorage.setItem('events', JSON.stringify({
    ...allEvents,
    [user.email]: events
  }));
  cb();
};
