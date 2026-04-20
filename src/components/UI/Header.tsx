import React from 'react';
import { Lang, Theme } from '../../types';

interface HeaderProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: any;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, theme, toggleTheme, t }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="seal-zh.svg" alt="Logo" className="header-logo" />
      </div>
      <div className="lang-switcher">
        <button 
          className={lang === 'zh' ? 'active' : ''} 
          onClick={() => setLang('zh')}
        >
          中
        </button>
        <button 
          className={lang === 'en' ? 'active' : ''} 
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button className="theme-toggle" onClick={toggleTheme} title={t.themeToggle}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
      <div className="era-badge">{t.eraBadge}</div>
      <h1>{t.mainTitle}</h1>
      <h2 className="main-title">{t.subTitle}</h2>
    </header>
  );
};

export default Header;
