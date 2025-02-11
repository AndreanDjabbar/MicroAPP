import { useState } from "react";
import registerService from "../../services/registerService";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await registerService(username, email, password);
      alert(`Register ${response.status}`);
      setUsername("")
      setEmail("")
      setPassword("")
      navigate("../login")
    } catch (error) {
      if (typeof error === "object" && error !== null && "errors" in error) {
        setErrors(error.errors as { username?: string; email?: string; password?: string });
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto w-[800px] max-w-[400px] mt-15">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%]  bg-white/35 backdrop-blur-lg shadow-xl p-4 flex items-center justify-between rounded-2xl border border-white/30">
      <a href="./login" className="text-xl font-bold text-gray-900 drop-shadow-md">MicroApp</a>
      <ul className="flex space-x-6">
        <li><a href="../login" className="text-gray-900 hover:text-gray-700 transition">Login</a></li>
      </ul>
    </nav>
      <div className="border-2 border-black p-[20px] rounded-[20px] bg-white">
        <div className="text-[1.3rem] mb-[20px] font-bold">Register your account</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <label className="font-bold text-sky-700">Username</label>
            <input
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-3xl p-2"
            />
            {errors.username && <span className="text-red-500">{errors.username}</span>}
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-sky-700">Email</label>
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-3xl p-2"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-sky-700">Password</label>
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-3xl p-2"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          <div className="flex flex-col gap-3">
            <button className="bg-sky-500 text-white p-3 rounded-2xl w-full hover:bg-sky-700">
              Submit
            </button>
            <div className="acc-text">
              <span>
                Have an account? <a href="../login" className="text-sky-700">Login</a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage