'use client';

import { useState, useEffect } from 'react';
import styles from './styles/QuoteBox.module.css';

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

//ロジック
const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

const QuoteBox: React.FC = () => {
  //ステートの定義
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [backgroundColor, setBackgroundColor] = useState('#000000');

  // 背景色のステートを変える
  const changeColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
  };

  // 明度の計算
  const calculateLuminance = (rgb: RGB): number => {
    return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  }

  // ランダムな色の設定ロジック
  const getRandomRgb= (): RGB => {
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
    if (luminance > 128) {
      return {
        r: Math.floor(rgb.r / 2),
        g: Math.floor(rgb.g / 2),
        b: Math.floor(rgb.b / 2),
      };
    }
    return rgb;
  }

  const getRandomColor = (): string => {
    let rgb = getRandomRgb();

    rgb = adjustColor(rgb);

    const adjustedHexColor = rgbToHex(rgb);

    return adjustedHexColor;
  }

  const loadNewQuoteAndChangeColor = () => {
    updateQuote();
    changeColor();
  }

  //マウント時にだけupdateQuoteさせる
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      updateQuote();
      setIsLoading(false);
    }, 500) // 非同期のシュミレート。500msecでローディング解除

  }, [])

  //呼び出し
  const updateQuote = (): void => {
    setQuote(getRandomQuote());
  }

  //Xでシェアするロジック
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
          <div id="text" className={styles.quoteText}>{quote.text}</div>
          <div id="author" className={styles.quoteAuthor}>{quote.author}</div>
        </>
      ) : (
        <p>No quote Available</p>
      )}

      <button id="new-quote" onClick={loadNewQuoteAndChangeColor} className='outline-double mx-6 p-2'>新しくインターネットを補充する</button>
      <a id="post-quote" onClick={postQuote} href="#" target="_blank" rel="noopener norefferer" className='outline-double mx-6'>XでPostする</a>
    </div>
  )
}

export default QuoteBox