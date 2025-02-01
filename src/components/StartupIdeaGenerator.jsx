import { useState } from "react";
import axios from "axios";
import "./StartupIdeaGenerator.css";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const StartupIdeaGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    if (!keyword.trim()) return;
    setLoading(true);

    try {
      const ideaResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Generate 3 unique startup ideas in ${keyword} industry.`,
                },
              ],
            },
          ],
        }
      );

      const ideaList =
        ideaResponse.data.candidates[0].content.parts[0].text.split("\n");
      setIdeas(ideaList);
    } catch (error) {
      console.error("Error generating ideas:", error);
    }

    setLoading(false);
  };

  return (
    <div className="startup-idea-generator-container">
      <h2 className="title">🚀 AI Startup Idea Generator</h2>
      <input
        type="text"
        placeholder="Enter a keyword (e.g., AI, E-commerce)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="input"
      />
      <button onClick={generateIdeas} disabled={loading} className="button">
        {loading ? "Generating..." : "Generate Ideas"}
      </button>

      {ideas.length > 0 && (
        <div className="ideas-container">
          <h3 className="ideas-title">🌟 Startup Ideas</h3>
          {ideas.map((idea, index) => (
            <div key={index} className="idea-card">
              <div className="idea-card-content">{idea}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupIdeaGenerator;
