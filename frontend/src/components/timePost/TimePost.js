import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
var utc = require("dayjs/plugin/utc");

const TimePost = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);

  const postTime = dayjs.utc(createdAt).fromNow();

  return <div>{postTime}</div>;
};

export default TimePost;
