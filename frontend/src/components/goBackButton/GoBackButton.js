import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <i onClick={goBack} className="fa fa-angle-left"></i>
    </div>
  );
};

export default GoBackButton;
