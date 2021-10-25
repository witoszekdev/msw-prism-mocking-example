import "./App.css";
import { useState } from "react";

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const requestHandler = (url) => {
    return async () => {
      try {
        const res = await fetch(url);
        console.log(res);
        const json = await res.json();
        setResponse(json);
        setError(res.statusText);
      } catch (e) {
        setError(e?.message ?? "An error occurred");
      }
    };
  };

  return (
    <div className="app">
      <button onClick={requestHandler("http://api.dev/users/123")}>
        Make request
      </button>
      <button onClick={requestHandler("http://api.dev/users/123/123")}>
        Make bad request
      </button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
