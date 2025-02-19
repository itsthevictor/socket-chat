import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, onClick }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && `form-btn`}`}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
export default SubmitBtn;
