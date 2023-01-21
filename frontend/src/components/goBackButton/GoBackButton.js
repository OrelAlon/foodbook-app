import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const GoBackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <TiArrowBack onClick={goBack} fontSize={40} />
    </div>
  );
};

export default GoBackButton;
