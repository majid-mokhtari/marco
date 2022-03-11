import moment from "moment";

export const formatTime = (counter) =>
  moment().hour(0).minute(0).second(counter).format("HH : mm : ss");
