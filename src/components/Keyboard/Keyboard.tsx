import { HomeIndicator } from '../HomeIndicator';
import './Keyboard.css';

export type KeyboardMode = 'light' | 'dark';
export type KeyboardType = 'alphabetic' | 'numeric' | 'dictation' | 'emoji';

export interface KeyboardProps {
  mode?: KeyboardMode;
  type?: KeyboardType;
  className?: string;
}

const ALPHA_ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const ALPHA_ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const ALPHA_ROW_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const NUM_KEYS: { num: string; letters: string }[] = [
  { num: '1', letters: '' },
  { num: '2', letters: 'ABC' },
  { num: '3', letters: 'DEF' },
  { num: '4', letters: 'GHI' },
  { num: '5', letters: 'JKL' },
  { num: '6', letters: 'MNO' },
  { num: '7', letters: 'PQRS' },
  { num: '8', letters: 'TUV' },
  { num: '9', letters: 'WXYZ' },
];

const EMOJI_GRID = [
  ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂'],
  ['🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩'],
  ['😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜'],
  ['🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐'],
  ['🤨', '😐', '😑', '😶', '😏', '🤤', '🤡', '😬'],
];

const EMOJI_CATEGORIES = ['🕐', '😀', '🐻', '🍔', '⚽', '✈️', '💡', '🔣', '🏁'];

function ShiftIcon() {
  return (
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 0L18.5 10H13V17H6V10H1L9.5 0Z" fill="currentColor" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.15 0.5H21C21.8284 0.5 22.5 1.17157 22.5 2V15C22.5 15.8284 21.8284 16.5 21 16.5H8.15C7.72326 16.5 7.31597 16.3249 7.025 16.017L0.875 9.517C0.332 8.943 0.332 8.057 0.875 7.483L7.025 0.983C7.31597 0.675071 7.72326 0.5 8.15 0.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M10 5L16 12M16 5L10 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13.5" cy="13.5" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="11" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="11" r="1.5" fill="currentColor" />
      <path d="M8.5 16.5C9.5 18.5 11.3 19.5 13.5 19.5C15.7 19.5 17.5 18.5 18.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="0.5" width="7" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1 12C1 15.866 4.13401 19 8 19C11.866 19 14 15.866 14 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7.5" y1="19" x2="7.5" y2="24" stroke="currentColor" strokeWidth="1.3" />
      <line x1="4" y1="24" x2="11" y2="24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="11.5" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="13" cy="13" rx="5" ry="11.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="1.5" y1="9" x2="24.5" y2="9" stroke="currentColor" strokeWidth="1.3" />
      <line x1="1.5" y1="17" x2="24.5" y2="17" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="28" height="15" rx="2" stroke="currentColor" strokeWidth="1" />
      <rect x="3" y="3" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="8" y="3" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="13" y="3" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="18" y="3" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="23" y="3" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="3" y="8" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="8" y="8" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="13" y="8" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="18" y="8" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="23" y="8" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="7" y="12.5" width="15" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function MicMutedIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="6" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="2" />
      <path d="M7 22C7 30.284 13.716 37 22 37C30.284 37 37 30.284 37 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="37" x2="22" y2="42" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="42" x2="28" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="38" x2="38" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function AlphabeticKeyboard() {
  return (
    <div className="kb__alpha">
      <div className="kb__rows">
        <div className="kb__row">
          {ALPHA_ROW_1.map((k) => (
            <span key={k} className="kb__key kb__key--letter">{k}</span>
          ))}
        </div>
        <div className="kb__row">
          {ALPHA_ROW_2.map((k) => (
            <span key={k} className="kb__key kb__key--letter">{k}</span>
          ))}
        </div>
        <div className="kb__row">
          <span className="kb__key kb__key--action kb__key--shift">
            <ShiftIcon />
          </span>
          {ALPHA_ROW_3.map((k) => (
            <span key={k} className="kb__key kb__key--letter">{k}</span>
          ))}
          <span className="kb__key kb__key--action kb__key--delete">
            <DeleteIcon />
          </span>
        </div>
        <div className="kb__row kb__row--bottom">
          <span className="kb__key kb__key--action kb__key--num">123</span>
          <span className="kb__key kb__key--letter kb__key--space">space</span>
          <span className="kb__key kb__key--action kb__key--return">Go</span>
        </div>
      </div>
      <div className="kb__toolbar">
        <span className="kb__toolbar-icon"><EmojiIcon /></span>
        <HomeIndicator />
        <span className="kb__toolbar-icon"><MicIcon /></span>
      </div>
    </div>
  );
}

function NumericKeyboard() {
  return (
    <div className="kb__numeric">
      <div className="kb__num-grid">
        {NUM_KEYS.map(({ num, letters }) => (
          <span key={num} className="kb__numkey">
            <span className="kb__numkey-num">{num}</span>
            {letters && <span className="kb__numkey-letters">{letters}</span>}
          </span>
        ))}
        <span className="kb__numkey kb__numkey--empty" />
        <span className="kb__numkey">
          <span className="kb__numkey-num">0</span>
        </span>
        <span className="kb__numkey kb__numkey--delete">
          <DeleteIcon />
        </span>
      </div>
      <HomeIndicator />
    </div>
  );
}

function DictationKeyboard() {
  return (
    <div className="kb__dictation">
      <div className="kb__wave-area">
        <div className="kb__waveform">
          {Array.from({ length: 60 }, (_, i) => {
            const center = 30;
            const dist = Math.abs(i - center) / center;
            const height = Math.max(3, (1 - dist * dist) * 80 * (0.3 + 0.7 * Math.random()));
            return <span key={i} className="kb__wave-bar" style={{ height }} />;
          })}
        </div>
        <span className="kb__mic-muted"><MicMutedIcon /></span>
      </div>
      <div className="kb__toolbar kb__toolbar--dictation">
        <span />
        <HomeIndicator />
        <span className="kb__toolbar-icon"><KeyboardIcon /></span>
      </div>
    </div>
  );
}

function EmojiKeyboard() {
  return (
    <div className="kb__emoji">
      <p className="kb__emoji-title">SMILEYS &amp; PEOPLE</p>
      <div className="kb__emoji-grid">
        {EMOJI_GRID.flat().map((emoji, i) => (
          <span key={i} className="kb__emoji-cell">{emoji}</span>
        ))}
      </div>
      <div className="kb__emoji-cats">
        {EMOJI_CATEGORIES.map((cat, i) => (
          <span
            key={i}
            className={`kb__emoji-cat ${i === 1 ? 'kb__emoji-cat--active' : ''}`}
          >
            {cat}
          </span>
        ))}
        <span className="kb__emoji-cat kb__emoji-cat--delete">
          <DeleteIcon />
        </span>
      </div>
      <div className="kb__toolbar">
        <span className="kb__toolbar-icon"><GlobeIcon /></span>
        <HomeIndicator />
        <span className="kb__toolbar-icon"><MicIcon /></span>
      </div>
    </div>
  );
}

export const Keyboard = ({
  mode = 'light',
  type = 'alphabetic',
  className,
}: KeyboardProps) => {
  const cls = [
    'kb',
    `kb--${mode}`,
    `kb--${type}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} aria-label={`${type} keyboard`}>
      {type === 'alphabetic' && <AlphabeticKeyboard />}
      {type === 'numeric' && <NumericKeyboard />}
      {type === 'dictation' && <DictationKeyboard />}
      {type === 'emoji' && <EmojiKeyboard />}
    </div>
  );
};
