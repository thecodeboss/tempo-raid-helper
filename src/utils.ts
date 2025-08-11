import { sortBy } from "lodash";

export interface Event {
  date: string;
  signups?: {
    name: string;
  }[];
}

export const getEvent = async (eventId: string): Promise<Event> => {
  const result = await fetch(`https://raid-helper.dev/api/event/${eventId}`);
  return await result.json();
};

export const sort = (array: string[]): string[] => {
  return sortBy(array, (el) => el.toLowerCase());
};
