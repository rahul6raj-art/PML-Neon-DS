import { Icon } from '../Icon';
import './OverflowMenu.css';

export interface OverflowMenuIconAction {
  /** Icon name */
  icon: string;
  /** Label below icon */
  label: string;
  /** Click handler */
  onClick?: () => void;
}

export interface OverflowMenuTextAction {
  /** Leading icon name */
  icon: string;
  /** Label text */
  label: string;
  /** Click handler */
  onClick?: () => void;
}

export interface OverflowMenuSection {
  /** Optional section title */
  title?: string;
  /** List of text action items */
  items: OverflowMenuTextAction[];
}

export interface OverflowMenuProps {
  /** Show the top icon actions row */
  showIconsSection?: boolean;
  /** Icon action items (top row) */
  iconActions?: OverflowMenuIconAction[];
  /** Text sections with dividers */
  sections?: OverflowMenuSection[];
  /** Additional CSS class */
  className?: string;
}

const DEFAULT_ICON_ACTIONS: OverflowMenuIconAction[] = [
  { icon: 'share_ios', label: 'Share' },
  { icon: 'copy_outline', label: 'Copy' },
  { icon: 'bookmark_outline', label: 'Save' },
];

const DEFAULT_SECTIONS: OverflowMenuSection[] = [
  {
    title: 'Section Title',
    items: [
      { icon: 'eye_outline', label: 'View' },
      { icon: 'copy_outline', label: 'Duplicate' },
      { icon: 'download_outline', label: 'Download' },
      { icon: 'bin_outline', label: 'Delete' },
    ],
  },
  {
    title: 'Section Title',
    items: [
      { icon: 'lock_outline', label: 'Lock' },
      { icon: 'info_circle_outline', label: 'Info' },
      { icon: 'help', label: 'Help' },
      { icon: 'logout_outline', label: 'Log Out' },
    ],
  },
];

export const OverflowMenu = ({
  showIconsSection = true,
  iconActions = DEFAULT_ICON_ACTIONS,
  sections = DEFAULT_SECTIONS,
  className,
}: OverflowMenuProps) => {
  const wrapperCls = ['om', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls} role="menu">
      {showIconsSection && iconActions.length > 0 && (
        <div className="om__icons-row">
          {iconActions.map((action, i) => (
            <button
              key={i}
              className="om__icon-action"
              type="button"
              role="menuitem"
              onClick={action.onClick}
            >
              <Icon name={action.icon} size={20} />
              <span className="om__icon-label">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {sections.map((section, si) => (
        <div key={si} className="om__section">
          <div className="om__divider" />
          <div className="om__section-content">
            {section.title && (
              <span className="om__section-title">{section.title}</span>
            )}
            {section.items.map((item, ii) => (
              <button
                key={ii}
                className="om__text-action"
                type="button"
                role="menuitem"
                onClick={item.onClick}
              >
                <Icon name={item.icon} size={20} />
                <span className="om__text-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
