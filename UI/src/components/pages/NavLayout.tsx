import { useState } from "react";
import { motion } from "framer-motion";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";

const NavLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-white/35 backdrop-blur-lg shadow-xl p-4 flex flex-col items-center rounded-2xl border border-white/30 overflow-hidden">
      <div className="flex items-center justify-between w-full">
        <a href="./login" className="text-xl font-bold text-gray-900 drop-shadow-md">MicroApp</a>
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
          {isOpen ? <CircleChevronUp /> : <CircleChevronDown />}
        </button>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full overflow-hidden"
      >
        <div className="mt-4 space-y-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold bg-black p-1 rounded-lg">Employee Management</h3>
            <ul className="space-y-2">
              <li><a href="../insert-data" className="text-gray-900 hover:text-gray-700 transition">Insert Employee</a></li>
              <li><a href="../show-data" className="text-gray-900 hover:text-gray-700 transition">Show Employee</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <hr className="text-gray-800"/>
            <h3 className="text-white font-bold bg-black p-1 rounded-lg">Feedbacks</h3>
            <ul className="space-y-2">
              <li><a href="../insert-feedback" className="text-gray-900 hover:text-gray-700 transition">Insert Feedback</a></li>
              <li><a href="../show-feedback" className="text-gray-900 hover:text-gray-700 transition">Show Feedbacks</a></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavLayout;
