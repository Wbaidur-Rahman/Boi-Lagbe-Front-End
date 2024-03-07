import "../styles/SignupModule.css";
import SignupContent from "./SignupContent";
import SignupForm from "./SignupForm";

const SignupBody = () => {
  return (
    <div className="signup">
      <SignupContent />
      <SignupForm />
    </div>
  );
};

export default SignupBody;
