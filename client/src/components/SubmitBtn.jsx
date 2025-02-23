import { Loader2 } from "lucide-react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn, onClick }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-primary w-full`}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="size-5 animate-spin" /> 'Submitting...'
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
};
export default SubmitBtn;
