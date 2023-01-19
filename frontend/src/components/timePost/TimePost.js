import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const TimePost = ({ updatedAt }) => {
  dayjs.extend(relativeTime);
  const postTime = dayjs(updatedAt).fromNow();

  return <div>Before {postTime}</div>;
};

export default TimePost;
