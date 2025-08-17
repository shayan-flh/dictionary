import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // const [allWords, setAllWords] = useState([]);
  const [word, setWord] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  // useEffect(() => {
  //   const getAll = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/words`);
  //       setAllWords(res.data);
  //     } catch (error) {
  //       console.log('error is', error);
  //     }
  //   };
  //   getAll();
  // }, []);

  useEffect(() => {
    if (word.trim().length === 0) {
      setSuggestion([]);
      return;
    }

    const getWordFromBack = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/search?query=${word}`)
        setSuggestion(res.data.results)
        
      } catch (error) {
        console.log('error is ', error);
      }
    }
    getWordFromBack()
  }, [word]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">دیکشنری انگلیسی به فارسی</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Type an English word..."
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {suggestion.length === 0 && word.length >= 2 && (
            <p className="text-gray-500 text-sm">نتیجه‌ای یافت نشد.</p>
          )}
          {suggestion.map((item, i) => (
            <div key={i} className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
              <div className="text-lg font-semibold text-blue-800">{item.EnglishWord}</div>
              <div className="text-sm text-gray-700 mt-1">{item.Meanings.join("، ")}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
