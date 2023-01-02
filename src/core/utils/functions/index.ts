import moment from "moment";

export const wait = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const getTimeWithDuration = (date: number) => {
  {
    return moment.duration(-(Date.now() - date)).humanize(true);
  }
};
