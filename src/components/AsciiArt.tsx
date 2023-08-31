'use client'
import React, { useState, useEffect } from "react";
import styles from "./styles/AsciiArt.module.css";  // CSSファイルをインポート

function AsciiArt() {
  const [position, setPosition] = useState(-400);
  const [showCopipe, setShowCopipe] = useState(false);

  useEffect(() => {
    const moveMona = () => {
      setPosition(prev => (prev >= window.innerWidth ? -400 : prev + 5));
    };

    const id = setInterval(moveMona, 50);
    return () => clearInterval(id);
  }, []);

  const toggleCopipe = () => {
    setShowCopipe(!showCopipe);
  };

  return (
    <div className="App">
      <button onClick={toggleCopipe}>Toggle Copipe</button>
      {showCopipe && <div>Here's a famous copipe.</div>}
      <div className={styles.mona} style={{ left: `${position}px` }}>
        <pre>{`
    ｺﾚ｡｡｡
    ∧_∧
   (*ﾟーﾟ)   ＿＿＿＿
   /つ／|        ／|　
 ～    |￣￣￣￣|　.|
､､､､（/ | ｷﾞｺﾆｬﾝ.|／,,,  ,,
        `}</pre>
      </div>
    </div>
  );
}

export default AsciiArt;
