import React, { useState, useEffect, useMemo } from 'react';

interface StorySectionProps {
  t: any;
}

const StorySection: React.FC<StorySectionProps> = ({ t }) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const storyParas = useMemo(
    () => [
      t.storyPara1,
      t.storyPara2,
      t.storyPara3,
      t.storyPara4,
      t.storyPara5,
      t.storyPara6,
      t.storyPara7,
      t.storyHighlight
    ],
    [t]
  );

  useEffect(() => {
    let currentParaIndex = 0;
    let currentCharIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentParaIndex < storyParas.length) {
        const currentPara = storyParas[currentParaIndex];
        if (currentCharIndex < currentPara.length) {
          setDisplayedText((prev) => {
            // 只保留本輪已打出的段落，語系切換重跑時自動清掉舊內容
            const next = prev.slice(0, currentParaIndex + 1);
            next[currentParaIndex] = currentPara.substring(
              0,
              currentCharIndex + 1
            );
            return next;
          });
          currentCharIndex++;
        } else {
          currentParaIndex++;
          currentCharIndex = 0;
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // 每 50ms 顯示一個字

    return () => clearInterval(typingInterval);
  }, [storyParas]);

  return (
    <section className="story-section">
      <div className="story-box">
        <h2 className="section-title">{t.storyTitle}</h2>
        <div className="story-text">
          {displayedText.map((text, index) => (
            <p
              key={index}
              className={index === storyParas.length - 1 ? 'highlight' : ''}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
