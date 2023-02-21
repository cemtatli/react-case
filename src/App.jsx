import { useState } from "react";
import { TiMediaPlayReverse, TiMediaPlay, TiArrowSync } from "react-icons/ti";

function App() {
  const [points, setPoints] = useState([]);
  const [data, setData] = useState([]);
  const clickHandle = (e) => {
    setPoints([...points, { x: e.clientX, y: e.clientY }]);
    // Mouse'un tıkladığı noktayı array'e ekledik. Bu array'i de state olarak tanımladığımız points state'ine atadık.

    setData([]); // Mouse'un tıkladığı noktayı array'e eklediğimiz için data state'ini boş array'e eşitledik.
  };

  const undoHandle = (e) => {
    e.stopPropagation(); // Bu event'in parent elementlerine de ulaşmasını engelledik.
    const data = [...points]; // points state'ini kopyaladık.
    const item = data.pop(); // Kopyaladığımız array'in son elemanını sildik.
    setData((data) => [...data, item]); // Sildiğimiz elemanı data state'ine ekledik.
    setPoints(data); // Yeni array'i points state'ine atadık.
  };

  const redoHandle = (e) => {
    e.stopPropagation();
    const secondData = [...data];
    const item = secondData.pop();
    setPoints((e) => [...points, item]);
    setData(secondData);
  };

  const resetHandle = (e) => {
    e.stopPropagation();
    setPoints([]);
    setData([]);
  };

  return (
    <div className="h-full bg-slate-200" onClick={clickHandle}>
      <header className="header">
        <button
          disabled={
            // points state'indeki array'in uzunluğu 0 ise undo butonunu disable ediyoruz.
            points.length === 0
          }
          className="btn disabled:btn-disabled"
          onClick={undoHandle}
        >
          <TiMediaPlayReverse />
        </button>
        <button
          disabled={
            // points state'indeki array'in uzunluğu 0 ise redo butonunu disable ediyoruz.
            data.length === 0
          }
          className="btn disabled:btn-disabled"
          onClick={redoHandle}
        >
          <TiMediaPlay />
        </button>
        <button
          disabled={
            // points state'indeki array'in uzunluğu 0 ise reset butonunu disable ediyoruz.
            points.length === 0
          }
          onClick={resetHandle}
          className="btn disabled:btn-disabled"
        >
          <TiArrowSync />
        </button>
      </header>
      {
        // Burada da state olarak tanımladığımız points state'ini map fonksiyonu ile döndürüyoruz.
        points.map((point, key) => (
          <div className="points" key={key} style={{ left: point.x, top: point.y }}></div>
        ))
      }
    </div>
  );
}

export default App;
