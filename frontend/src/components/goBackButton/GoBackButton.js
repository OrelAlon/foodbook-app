import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default GoBackButton;

// test
