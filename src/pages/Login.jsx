import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithGoogle } = UserAuth();
  console.log(currentUser);
  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Dobrodošli </h1>
          <p className="py-6">
            Pristupite Turk's Chat instant razgovorima, upoznajte nove ljude,
            družite se, možda su isto 💫 kao i vi!
          </p>
          <button onClick={handleLogin} className="btn btn-outline btn-primary">
            Logiraj se s Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
