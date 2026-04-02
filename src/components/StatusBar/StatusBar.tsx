import './StatusBar.css';

export type StatusBarTheme = 'light' | 'dark';

export interface StatusBarProps {
  /** Light (dark text on light bg) or Dark (white text on dark bg) */
  theme?: StatusBarTheme;
  /** Time string displayed on the left */
  time?: string;
  className?: string;
}

const CellularIcon = () => (
  <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 0.5C18.3284 0.5 19 1.17157 19 2V11C19 11.8284 18.3284 12.5 17.5 12.5C16.6716 12.5 16 11.8284 16 11V2C16 1.17157 16.6716 0.5 17.5 0.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 3.5C13.3284 3.5 14 4.17157 14 5V11C14 11.8284 13.3284 12.5 12.5 12.5C11.6716 12.5 11 11.8284 11 11V5C11 4.17157 11.6716 3.5 12.5 3.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 6C8.32843 6 9 6.67157 9 7.5V11C9 11.8284 8.32843 12.5 7.5 12.5C6.67157 12.5 6 11.8284 6 11V7.5C6 6.67157 6.67157 6 7.5 6Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 8.5C3.32843 8.5 4 9.17157 4 10V11C4 11.8284 3.32843 12.5 2.5 12.5C1.67157 12.5 1 11.8284 1 11V10C1 9.17157 1.67157 8.5 2.5 8.5Z" fill="currentColor"/>
  </svg>
);

const WifiIcon = () => (
  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.00002 2.67203C11.2616 2.67203 13.3451 3.5819 14.8407 5.13257L15.7458 4.17397C13.9798 2.34143 11.5966 1.27203 9.00002 1.27203C6.40343 1.27203 4.02025 2.34143 2.25424 4.17397L3.15933 5.13257C4.65496 3.5819 6.73848 2.67203 9.00002 2.67203ZM9.00003 5.87203C10.5103 5.87203 11.9112 6.49721 12.917 7.56219L13.8221 6.60359C12.5459 5.25477 10.8418 4.47203 9.00003 4.47203C7.15825 4.47203 5.45418 5.25477 4.17796 6.60359L5.08305 7.56219C6.08887 6.49721 7.48973 5.87203 9.00003 5.87203ZM9 9.07203C9.76406 9.07203 10.4662 9.3798 10.9814 9.88858L9 11.972L7.01863 9.88858C7.53381 9.3798 8.23595 9.07203 9 9.07203Z" fill="currentColor"/>
  </svg>
);

const BatteryIcon = () => (
  <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.35" x="0.833" y="0.5" width="23" height="12" rx="2.167" stroke="currentColor"/>
    <path opacity="0.4" d="M25.333 4.5V8.83333C25.998 8.54033 26.443 7.87766 26.443 7.10433V6.22933C26.443 5.456 25.998 4.793 25.333 4.5Z" fill="currentColor"/>
    <rect x="2.333" y="2" width="20" height="9" rx="1.333" fill="currentColor"/>
  </svg>
);

export const StatusBar = ({
  theme = 'light',
  time = '9:41',
  className,
}: StatusBarProps) => {
  const wrapperClass = [
    'statusbar',
    `statusbar--${theme}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} aria-hidden="true">
      <div className="statusbar__time">
        <span className="statusbar__time-text">{time}</span>
      </div>

      <div className="statusbar__indicators">
        <span className="statusbar__icon statusbar__icon--cellular">
          <CellularIcon />
        </span>
        <span className="statusbar__icon statusbar__icon--wifi">
          <WifiIcon />
        </span>
        <span className="statusbar__icon statusbar__icon--battery">
          <BatteryIcon />
        </span>
      </div>
    </div>
  );
};
