import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import CardItem from "./components/CardItem";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://catfact.ninja/facts?limit=6")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="container mt-4 pb-4">
        <h1 className="mb-4">Datos desde API</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="row g-3">
            {data.map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <CardItem title="Dato curioso" description={item.fact} darkMode={darkMode} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}