import { useState } from "react";
import insertFeedbackService from "../../services/insertFeedback";

const InsertFeedbackPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
    </div>
  );
};

export default InsertFeedbackPage;