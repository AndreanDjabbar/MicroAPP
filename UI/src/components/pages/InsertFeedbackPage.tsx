import { useEffect, useState } from "react";
import insertFeedbackService from "../../services/insertFeedback";
import { useNavigate } from "react-router-dom";

const InsertFeedbackPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("tokenAuth");
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("tokenAuth");
    if(!token) {
      alert("Please login to access this page")
      navigate("/login");
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertFeedbackService(name, message);
    setName("");
    setMessage("");
  };

  return (
    <div className="w-full mx-auto bg-gray-900 text-white p-6 rounded-2xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold text-amber-400 text-center mb-4">Insert Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-amber-400">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-1 border-2 border-sky-800 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-amber-400">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 mt-1 border-2 border-sky-800 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 h-32 resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white p-3 rounded-lg font-semibold text-lg shadow-md hover:from-sky-500 hover:to-blue-600 transition duration-300"
        >
          Send Feedback
        </button>
      </form>
      <button className="fixed bottom-10 right-10  py-[15px] px-[25px] rounded-[15px] text-[#212121] bg-[#e8e8e8] font-bold text-[17px] overflow-hidden transition-all duration-[250] shadow-lg before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-[15px] before:bg-gray-800 before:-z-10 before:shadow-lg before:transition-all before:duration-[250ms] hover:before:w-full hover:text-amber-300 animate-bounce"
      onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InsertFeedbackPage;