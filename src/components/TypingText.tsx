import { useState, useEffect, FC } from 'react';

const TypingText: FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // テキストと、インデックスの初期化
    setDisplayText('');
    setIndex(0);
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
    }
  }, [displayText, text, index])

  return <span>{displayText}</span>
}

export default TypingText;