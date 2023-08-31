import { useState, useEffect, FC } from 'react';
import styles from './styles/TypingText.module.css'

const TypingText: FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorOpacity, setCursorOpacity] = useState(1);

  useEffect(() => {
    // テキストと、インデックスの初期化
    setDisplayText('');
    setIndex(0);
    setShowCursor(true)
  }, [text]);


  useEffect(() => {
    // setTimeoutのコールバックの
    // 第二引数が 次の文字が表示されるまでの秒数を指定する.
    
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prevDisplayText) => prevDisplayText + text[index])
        setIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowCursor(false);
    }
  }, [displayText, text, index])

  useEffect(() => {
    if (showCursor) {
      const timer = setInterval(() => {
        setCursorOpacity((prevOpacity) => prevOpacity === 0 ? 1 : 0);}, 200)

        return () => clearInterval(timer);
      }
      }, [showCursor]);

  return  (
  <div className={styles.container}>
    {displayText}
    {showCursor && <span id="cursor" style={{ opacity: cursorOpacity }} className={styles.cursor}>_</span>}
  </div>
  )
}

export default TypingText;