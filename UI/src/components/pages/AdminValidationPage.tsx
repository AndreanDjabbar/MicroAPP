import React, { useEffect, useState } from "react";
import adminValidationService from "../../services/adminValidationService";
import { useNavigate } from "react-router-dom";

const AdminValidationPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("tokenAuth");
      if(!token) {
        navigate("/login");
      }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAdmin = adminValidationService(password);
    if (isAdmin) {
        navigate("../show-feedback");
    } else {
        setError("Access Denied or Session Expired");
    }
    }


  return (
    <div className="mx-auto w-[800px] max-w-[400px] mt-15">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%]  bg-white/35 backdrop-blur-lg shadow-xl p-4 flex items-center justify-between rounded-2xl border border-white/30">
      <a href="./login" className="text-xl font-bold text-gray-900 drop-shadow-md">MicroApp</a>
      <ul className="flex space-x-6">
      </ul>
    </nav>
      <div className="border-2 border-black p-[20px] rounded-[20px] bg-white">
        <div className="text-[1.3rem] mb-[20px] font-semibold"><p>Input the <span className="font-extrabold">Admin</span> Password</p></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
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
            {error && <span className="text-red-500">{error}</span>}
          </div>

          <div className="flex flex-col gap-3">
            <button className="bg-sky-500 text-white p-3 rounded-2xl w-full hover:bg-sky-700" type="submit">
              Submit
            </button>
            <div className="acc-text">
              <span>
                <p className="text-red-500">You need to input admin password before access the page.</p>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminValidationPage;