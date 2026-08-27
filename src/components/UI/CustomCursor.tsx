import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. 偵測裝置環境：如果是觸控裝置 (coarse pointer) 或不支援 hover，則完全停用
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(any-hover: none)').matches;

    if (isTouchDevice) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    // 2. 顯示／隱藏一律成對操作，避免兩個 class 狀態脫鉤。
    //    classList.add/remove 具冪等性，每次 move 都呼叫也不會造成多餘的 reflow，
    //    因此移除原本用 ref 旗標做的快取守衛——那正是讓 .visible 卡住回不來的元凶。
    const showCursor = () => {
      ringRef.current?.classList.add('visible');
      document.body.classList.add('custom-cursor-active');
    };

    const hideCursor = () => {
      ringRef.current?.classList.remove('visible');
      document.body.classList.remove('custom-cursor-active');
    };

    const updateCursor = (x: number, y: number) => {
      showCursor();

      requestAnimationFrame(() => {
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = !!target.closest(
        'button, a, input, select, textarea, .radio-group label, .checkbox-grid label, .clickable, .admin-trigger, .close-btn, .slot-tag i'
      );

      if (isClickable) {
        ringRef.current?.classList.add('hover');
      } else {
        ringRef.current?.classList.remove('hover');
      }
    };

    const onMouseLeave = () => {
      hideCursor();
    };

    const onMouseEnter = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY);
    };

    // 切換分頁、alt-tab 失焦時也視為離開，避免狀態卡死
    const onWindowBlur = () => {
      hideCursor();
    };

    // mouseenter / mouseleave 綁在 documentElement (<html>) 上，跨瀏覽器才會穩定觸發；
    // 綁在 document 物件上在某些瀏覽器不會發生，正是「某些主機才異常」的根因。
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('blur', onWindowBlur);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 2147483646
        }}
      >
        <svg viewBox="0 0 100 100">
          <g transform="rotate(22.5 50 50)">
            <path
              className="bagua-octagon"
              d="M 50 5 L 82 18 L 95 50 L 82 82 L 50 95 L 18 82 L 5 50 L 18 18 Z"
              fill="none"
              stroke="var(--primary-gold)"
              strokeWidth="1.2"
              opacity="0.8"
            />
          </g>
          
          {/* 核心太極圖：包含魚眼 */}
          <g className="taiji-center" opacity="0.6">
            <circle cx="50" cy="50" r="12" fill="none" stroke="var(--primary-gold)" strokeWidth="0.5" />
            <path
              d="M 50 38 A 6 6 0 0 1 50 50 A 6 6 0 0 0 50 62 A 12 12 0 0 1 50 38 Z"
              fill="var(--primary-gold)"
            />
            {/* 魚眼 */}
            <circle cx="50" cy="44" r="1.5" fill="var(--card-bg)" />
            <circle cx="50" cy="56" r="1.5" fill="var(--primary-gold)" />
          </g>

          <g
            className="trigrams"
            stroke="var(--primary-gold)"
            strokeWidth="0.4"
          >
            {/* 乾 - 頂部平邊 */}
            <g transform="rotate(0 50 50)">
              <line x1="44" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="56" y2="20" />
            </g>
            {/* 兌 */}
            <g transform="rotate(45 50 50)">
              <line x1="44" y1="12" x2="49" y2="12" />
              <line x1="51" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="56" y2="20" />
            </g>
            {/* 離 */}
            <g transform="rotate(90 50 50)">
              <line x1="44" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="49" y2="16" />
              <line x1="51" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="56" y2="20" />
            </g>
            {/* 震 */}
            <g transform="rotate(135 50 50)">
              <line x1="44" y1="12" x2="49" y2="12" />
              <line x1="51" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="49" y2="16" />
              <line x1="51" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="56" y2="20" />
            </g>
            {/* 坤 */}
            <g transform="rotate(180 50 50)">
              <line x1="44" y1="12" x2="49" y2="12" />
              <line x1="51" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="49" y2="16" />
              <line x1="51" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="49" y2="20" />
              <line x1="51" y1="20" x2="56" y2="20" />
            </g>
            {/* 艮 */}
            <g transform="rotate(225 50 50)">
              <line x1="44" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="49" y2="16" />
              <line x1="51" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="49" y2="20" />
              <line x1="51" y1="20" x2="56" y2="20" />
            </g>
            {/* 坎 */}
            <g transform="rotate(270 50 50)">
               <line x1="44" y1="12" x2="49" y2="12" /> <line x1="51" y1="12" x2="56" y2="12" />
               <line x1="44" y1="16" x2="56" y2="16" />
               <line x1="44" y1="20" x2="49" y2="20" /> <line x1="51" y1="20" x2="56" y2="20" />
            </g>
            {/* 巽 */}
            <g transform="rotate(315 50 50)">
              <line x1="44" y1="12" x2="56" y2="12" />
              <line x1="44" y1="16" x2="56" y2="16" />
              <line x1="44" y1="20" x2="49" y2="20" />
              <line x1="51" y1="20" x2="56" y2="20" />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
