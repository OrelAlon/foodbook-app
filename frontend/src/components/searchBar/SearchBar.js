import { Input, Tooltip } from "@mantine/core";
import { IconSearch, IconAlertCircle } from "@tabler/icons";

const SearchBar = () => {
  return (
    <Input
      icon={<IconSearch size={16} />}
      placeholder='What on your mind?'
      style={{ width: "50%", margin: "auto" }}
    />
  );
};
export default SearchBar;
