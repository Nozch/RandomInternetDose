import { useState, useEffect } from 'react';
import styles from './QuoteBox.module.css';

interface Quote {
  text: string;
  author: string;
}

//好きなものを追加する
const quotes: Quote[] = [
  { text: 'うそはうそであると見抜ける人でないと (掲示板を使うのは)難しい', author: 'ひろゆき' },
  { text: '築地市場は 閉場/営業 しています', author: 'アイスクライマー' },
  { text: 'It\'a true wolrd.', author: 'インターネット' },
  { text: 'このスレッドは荒れているので閉じます', author: 'モデレータ'}
]

//ロジック
const getRandomQuote = (): Quote =>  {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

const QuoteBox: React.FC = () => {
  //ステートの定義
  const [quote, setQuote] = useState(getRandomQuote());

  //初期化  
  useEffect(() => {
    updateQuote();
  }, [])

  //呼び出し
  const updateQuote = (): void => {
    setQuote(getRandomQuote());
  }

  //Xでシェアするロジック
  const postQuote = (): void => {
    const postText = `${quote.text} - ${quote.author}`;
    const postUrl = `http://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`
    window.open(postUrl, "_blank")

  };

  //レンダー
  return (
    <div id="quote-box" className={styles.quoteBox}>
      <div id="text" className={styles.quoteText}>{quote.text}</div>
      <div id="author" className={styles.quoteAuthor}>{quote.author}</div>
      <button id="new-quote" onClick={updateQuote} className={styles.quoteButton}>今日のインターネットを補充する</button>
      <a id="post-quote" onClick={postQuote} href="#" target="_blank" rel="noopener norefferer"className={styles.postButton}>XでPostする</a>
    </div>
  )
}

export default QuoteBox