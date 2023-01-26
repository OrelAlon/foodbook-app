import { useNavigate } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons";

const GoBackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <IconChevronLeft onClick={goBack} size={30} />
    </div>
  );
};

export default GoBackButton;
