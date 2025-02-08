import React, { useEffect, useState } from "react";
import getFeedbacksService from "../../services/getFeedbacksService";
import feedback from "../layouts/feedback";

const ShowFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacksService();
        setFeedbacks(data);
      } catch (err) {
        setError("Error fetching feedbacks");
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="border-2 border-gray-800 bg-gray-900 p-6 rounded-xl shadow-lg mt-10 mb-16">
      <h1 className="text-4xl font-bold text-amber-400 mb-6 text-center">
        Feedbacks
      </h1>

      {loading && <p className="text-white text-center animate-pulse">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && feedbacks.length === 0 && (
        <p className="text-gray-400 text-center">No feedbacks available.</p>
      )}

      <ul className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide p-2">
        {feedbacks.map((fb) => (
          <li
            key={fb._id}
            className="bg-gray-800 p-5 rounded-xl shadow-md transition hover:scale-[1.02] hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-amber-400">{fb.name}</h3>
            <p className="text-white leading-relaxed">{fb.message}</p>
            <small className="text-gray-400 block mt-2">
              {new Date(fb.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowFeedbackPage;
