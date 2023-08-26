'use client';

import { useState, useEffect, FC } from 'react';
import styles from './styles/QuoteBox.module.css';
import TypingText from './TypingText';

interface Quote {
  text: string;
  author: string;
}

type RGB = {
  r: number;
  g: number;
  b: number;
}

//好きなものを追加する
const quotes: Quote[] = [
  { text: 'うそはうそであると見抜ける人でないと (掲示板を使うのは)難しい', author: 'ひろゆき' },
  { text: '築地市場は 閉場/営業 しています', author: 'アイスクライマー' },
  { text: 'It\'a true wolrd.', author: 'インターネット' },
  { text: 'このスレッドは荒れているので閉じます', author: 'モデレータ' },
  { text: '弟子やったらパンパンやな', author: 'オール巨人' },
  { text: 'デンジ君が開けて?', author: 'マキマ' }
]

//ランダムにコピペをゲットするロジック
const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)]
}
// 明度の計算
const calculateLuminance = (rgb: RGB): number => {
  return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
}

// ランダムな色の設定ロジック
const getRandomRgb = (): RGB => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
};

// 16進数にする
const rgbToHex = (rgb: RGB): string => {
  return `#${Object.values(rgb).map(n => n.toString(16).padStart(2, '0')).join('')}`
}


const adjustColor = (rgb: RGB): RGB => {
  const luminance = calculateLuminance(rgb);
  // もし明度128以上なら半分
  if (luminance > 128) {
    return {
      r: Math.floor(rgb.r / 2),
      g: Math.floor(rgb.g / 2),
      b: Math.floor(rgb.b / 2),
    };
  }
  return rgb;
}

const QuoteBox: FC = () => {
  //ステートの定義
  const [quote, setQuote] = useState<Quote | null>(null);
  const [typingText, setTypingText] = useState<string>("");
  const [typingAuthor, setTypingAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  //マウント時に一度updateQuoteさせる
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      updateQuote();
      setIsLoading(false);
    }, 500) // 非同期のシュミレート。500msecでローディング解除

  }, [])

  //#new-quoteを押すと呼び出し
  const loadNewQuoteAndChangeColor = () => {
    updateQuote();
    changeColor();
  }

  //Quoteを変える処理
  const updateQuote = (): void => {
    const newQuote = (getRandomQuote());
    setQuote(newQuote);
    setTypingText(newQuote.text);
    setTypingAuthor(newQuote.author);
  }

  // ランダムなrgb生成 -> 明度128以下にする -> 16進数にする
  const getRandomColor = (): string => {
    let rgb = getRandomRgb();
    rgb = adjustColor(rgb);
    const adjustedHexColor = rgbToHex(rgb);
    return adjustedHexColor;
  }

  //色ステートの設定
  const changeColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
  };

  //#post-quoteを押すと呼び出し
  const postQuote = (): void => {
    if (quote) {
      const postText = `${quote.text} - ${quote.author}`;
      const postUrl = `http://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`
      window.open(postUrl, "_blank")
    }
  };

  //レンダー
  return (
    <div id="quote-box" className={styles.quoteBox} style={{ backgroundColor: backgroundColor }}>
      {isLoading ? (<div className={styles.loading}>Loading...</div>) : quote ? (
        <>
          <div id="text" className={styles.quoteText}><TypingText text={typingText} /></div>
          <div id="author" className={styles.quoteAuthor}><TypingText text={typingAuthor} /></div>
        </>
      ) : (
        <p>No quote Available</p>
      )}

      <button id="new-quote" onClick={loadNewQuoteAndChangeColor} className={styles.button}>新しくインターネットを補充する</button>
      <a id="post-quote" onClick={postQuote} href="#" target="_blank" rel="noopener norefferer" className={styles.button}>XでPostする</a>
    </div>
  )
}

export default QuoteBox