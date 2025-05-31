// import React, { useContext, useState, useEffect } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../Firebase/firebaseConfig";
// import { ConfigContext } from "../Context/ConfigContext";

// const AdminForm = () => {
//   const { config, setConfig } = useContext(ConfigContext);
//   const [sheetID, setSheetID] = useState("");
//   const [formData, setFormData] = useState({
//     googleFormUrl: "",
//     sheetUrl: `https://opensheet.elk.sh/${sheetID}/1`,
//     instructions: "",
//     quizDuration: 15,
//     Thought: "",
//   });

//   useEffect(() => {
//     if (config) {
//       setFormData(config);
//       // Extract sheet ID from config.sheetUrl if present
//       if (config.sheetUrl) {
//         // Example: https://opensheet.elk.sh/<sheetID>/1
//         const match = config.sheetUrl.match(/opensheet\.elk\.sh\/([^/]+)/);
//         if (match && match[1]) {
//           setSheetID(match[1]);
//           // console.log((match[1]));
//         }
//       }
//     }
//   }, [config]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "quizDuration" ? parseInt(value) : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const docRef = doc(db, "config", "quizSettings");
//     console.log(formData)
//     try {
//       await updateDoc(docRef, formData);
//       alert("Settings updated successfully!");
//       setConfig(formData);
//     } catch (err) {
//       console.error("Error updating config:", err);
//       alert("Failed to update settings.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg space-y-4">
//       <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">🛠 Admin Control Panel</h2>

//       <div>
//         <label className="block text-black font-medium">Google Form URL</label>
//         <input
//           type="text"
//           name="googleFormUrl"
//           value={formData.googleFormUrl}
//           onChange={handleChange}
//           className="w-full text-black border p-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium text-black">Google Sheet ID (JSON)</label>
//         <input
//           type="text"
//           name="sheetUrl"
//           value={sheetID}
//           onChange={(e) => setSheetID(e.target.value)}
//           placeholder="Enter Google Sheet ID"
//           className="w-full border text-black p-2 rounded"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-black font-medium">Quiz Instructions</label>
//         <textarea
//           name="instructions"
//           value={formData.instructions}
//           onChange={handleChange}
//           className="w-full text-black border p-2 rounded"
//           rows="4"
//         ></textarea>
//       </div>

//       <div>
//         <label className="block text-black font-medium">Quiz Duration (minutes)</label>
//         <input
//           type="number"
//           name="quizDuration"
//           value={formData.quizDuration}
//           onChange={handleChange}
//           className="w-full text-black border p-2 rounded"
//           required
//           min="1"
//         />
//       </div>

//       <div>
//         <label className="block text-black font-medium">Thought</label>
//         <input
//           type="text"
//           name="Thought"
//           placeholder="Enter your thought"
//           value={formData.Thought}
//           onChange={handleChange}
//           className="w-full text-black border p-2 rounded"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
//       >
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default AdminForm;

import React, { useContext, useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { ConfigContext } from "../Context/ConfigContext";

const AdminForm = () => {
  const { config, setConfig } = useContext(ConfigContext);
  const [sheetID, setSheetID] = useState("");
  const [formData, setFormData] = useState({
    googleFormUrl: "",
    sheetUrl: `https://opensheet.elk.sh/${sheetID}/1`,
    instructions: "",
    quizDuration: 15,
    Thought: "",
  });

  useEffect(() => {
    if (config) {
      setFormData(config);
      if (config.sheetUrl) {
        const match = config.sheetUrl.match(/opensheet\.elk\.sh\/([^/]+)/);
        if (match && match[1]) {
          setSheetID(match[1]);
        }
      }
    }
  }, [config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quizDuration" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      sheetUrl: `https://opensheet.elk.sh/${sheetID}/1`,
    };
    const docRef = doc(db, "config", "quizSettings");

    try {
      await updateDoc(docRef, updatedData);
      alert("✅ Settings updated successfully!");
      setConfig(updatedData);
    } catch (err) {
      console.error("Error updating config:", err);
      alert("❌ Failed to update settings.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">
          🛠 Admin Control Panel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Google Form URL */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Form URL
            </label>
            <input
              type="text"
              name="googleFormUrl"
              value={formData.googleFormUrl}
              onChange={handleChange}
              placeholder="https://docs.google.com/forms/..."
              className="w-full text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Google Sheet ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Sheet ID
            </label>
            <input
              type="text"
              name="sheetUrl"
              value={sheetID}
              onChange={(e) => setSheetID(e.target.value)}
              placeholder="e.g. 1A2B3C..."
              className="w-full text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Quiz Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Duration (minutes)
            </label>
            <input
              type="number"
              name="quizDuration"
              value={formData.quizDuration}
              onChange={handleChange}
              className="w-full text-gray-700 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1"
              required
            />
          </div>

          {/* Thought */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thought
            </label>
            <textarea
              rows="4"
              type="text"
              name="Thought"
              placeholder="Daily thought or inspiration"
              value={formData.Thought}
              onChange={handleChange}
              className="w-full h-32 text-gray-700 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>

          {/* Instructions */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Instructions
            </label>
            <textarea
              name="instructions"
              rows="4"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Write quiz instructions here..."
              className="w-full h-32 text-gray-700 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          💾 Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
