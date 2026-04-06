import { Card } from '../Card';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { LogoCategory } from '../Logo/Logo';
import './MFCardWidget.css';

export type MFCardWidgetSize = 'large' | 'medium' | 'small' | 'inline';

export interface MFCardWidgetProps {
  /** Layout variant (Paytm MF Liquid Fund card). */
  cardType?: MFCardWidgetSize;
  /** Blue info strip behind the card (Large / Medium / Small). */
  showAlertBanner?: boolean;
  alertText?: string;
  showTags?: boolean;
  tagsLhs?: boolean;
  tagsRhs?: boolean;
  sipActiveLabel?: string;
  externalLabel?: string;
  rhsTagLabel?: string;
  fundName: string;
  logoName?: string;
  logoCategory?: LogoCategory;
  subtext?: string;
  subtextIconName?: string;
  primaryValue?: string;
  secondaryLabel?: string;
  dataLeftTitle?: string;
  dataLeftValue?: string;
  dataRightTitle?: string;
  dataRightValue?: string;
  ratingValue?: string;
  ratingTrailingText?: string;
  footerLabel?: string;
  footerValue?: string;
  className?: string;
}

function TagsRow({
  showTags,
  tagsLhs,
  tagsRhs,
  sipActiveLabel,
  externalLabel,
  rhsTagLabel,
}: Pick<
  MFCardWidgetProps,
  'showTags' | 'tagsLhs' | 'tagsRhs' | 'sipActiveLabel' | 'externalLabel' | 'rhsTagLabel'
>) {
  if (!showTags) return null;
  if (!tagsLhs && !tagsRhs) return null;
  return (
    <div className="mfcw__tags">
      {tagsLhs && (
        <div className="mfcw__tags-lhs">
          <Badge type="text" context="positive" muted label={sipActiveLabel ?? 'SIP Active'} />
          <Badge type="text" context="default" muted label={externalLabel ?? 'External'} />
        </div>
      )}
      {tagsRhs && (
        <div className="mfcw__tags-rhs">
          <Badge type="text" context="positive" muted label={rhsTagLabel ?? 'STATUS'} />
        </div>
      )}
    </div>
  );
}

function FundNameRow({
  cardType,
  fundName,
  logoName,
  logoCategory,
  subtext,
  subtextIconName,
  primaryValue,
  secondaryLabel,
}: MFCardWidgetProps) {
  const showRhs = ['medium', 'small', 'inline'].includes(cardType ?? 'large');
  const showSubtext =
    Boolean(subtext) &&
    (cardType === 'large' || cardType === 'small' || cardType === 'inline');

  return (
    <div className="mfcw__fund">
      <div className="mfcw__fund-logo">
        <Avatar
          type="logo"
          size="small"
          logoName={logoName ?? 'HDFC'}
          logoCategory={logoCategory ?? 'mutualFunds'}
        />
      </div>
      <div className={`mfcw__fund-main ${showRhs ? 'mfcw__fund-main--split' : ''}`}>
        <div className="mfcw__fund-text">
          <p className="mfcw__fund-name">{fundName}</p>
          {showSubtext && (
            <div className="mfcw__fund-sub">
              {subtextIconName && (
                <Icon name={subtextIconName} size={16} className="mfcw__fund-sub-icon" />
              )}
              <span className="mfcw__fund-sub-label">{subtext}</span>
            </div>
          )}
        </div>
        {showRhs && (primaryValue != null || secondaryLabel != null) && (
          <div className="mfcw__fund-rhs">
            {primaryValue != null && <p className="mfcw__fund-rhs-primary">{primaryValue}</p>}
            {secondaryLabel != null && (
              <p className="mfcw__fund-rhs-secondary">{secondaryLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LargeDataRow(props: MFCardWidgetProps) {
  const {
    dataLeftTitle = 'Title',
    dataLeftValue = 'Value',
    dataRightTitle = 'Title',
    dataRightValue = 'Value',
  } = props;
  return (
    <div className="mfcw__data">
      <div className="mfcw__data-cell mfcw__data-cell--left">
        <span className="mfcw__data-label">{dataLeftTitle}</span>
        <span className="mfcw__data-value">{dataLeftValue}</span>
      </div>
      <div className="mfcw__data-cell mfcw__data-cell--right">
        <span className="mfcw__data-label">{dataRightTitle}</span>
        <span className="mfcw__data-value">{dataRightValue}</span>
      </div>
    </div>
  );
}

function MediumFooter(props: MFCardWidgetProps) {
  const {
    ratingValue = '4',
    ratingTrailingText = 'Text 2',
    footerLabel = 'Label:',
    footerValue = 'Value',
  } = props;
  return (
    <div className="mfcw__footer">
      <div className="mfcw__footer-lhs">
        <span className="mfcw__footer-rating">
          <Icon name="star_filled" size={16} className="mfcw__star" />
          <span className="mfcw__footer-rating-num">{ratingValue}</span>
        </span>
        <span className="mfcw__footer-dot" aria-hidden="true" />
        <span className="mfcw__footer-meta">{ratingTrailingText}</span>
      </div>
      <div className="mfcw__footer-rhs">
        <span className="mfcw__footer-rhs-label">{footerLabel}</span>
        <span className="mfcw__footer-rhs-value">{footerValue}</span>
      </div>
    </div>
  );
}

/**
 * Paytm MF **Liquid Fund** card — tags, fund row, separator, metrics or rating row
 * (see [Figma — MF components](https://www.figma.com/design/FYefy2l7igtb2A7C9XleT9/Paytm-MF-Components---Master?node-id=442-5710)).
 */
export const MFCardWidget = ({
  cardType = 'large',
  showAlertBanner = false,
  alertText = 'Multiline alert text goes here',
  showTags = true,
  tagsLhs = true,
  tagsRhs = false,
  className,
  ...props
}: MFCardWidgetProps) => {
  const hasTagsRow = showTags && (tagsLhs || tagsRhs);

  const rootCls = [
    'mfcw',
    `mfcw--${cardType}`,
    !hasTagsRow && 'mfcw--no-tags',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <div className="mfcw__inner">
      <TagsRow
        showTags={showTags}
        tagsLhs={tagsLhs}
        tagsRhs={tagsRhs}
        sipActiveLabel={props.sipActiveLabel}
        externalLabel={props.externalLabel}
        rhsTagLabel={props.rhsTagLabel}
      />
      <FundNameRow cardType={cardType} fundName={props.fundName} {...props} />
      {(cardType === 'large' || cardType === 'medium') && (
        <>
          <div className="mfcw__sep" role="separator" />
          {cardType === 'large' && <LargeDataRow {...props} />}
          {cardType === 'medium' && <MediumFooter {...props} />}
        </>
      )}
    </div>
  );

  if (cardType === 'small' || cardType === 'inline') {
    return (
      <div className={rootCls}>
        <div className="mfcw__stack mfcw__stack--compact">
          <Card className="mfcw__card">{inner}</Card>
          {showAlertBanner && (
            <div className="mfcw__alert" role="status">
              <Icon name="info_circle_outline" size={16} className="mfcw__alert-icon" />
              <p className="mfcw__alert-text">{alertText}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={rootCls}>
      <div className="mfcw__stack">
        <Card className="mfcw__card">{inner}</Card>
        {showAlertBanner && (
          <div className="mfcw__alert" role="status">
            <Icon name="info_circle_outline" size={16} className="mfcw__alert-icon" />
            <p className="mfcw__alert-text">{alertText}</p>
          </div>
        )}
      </div>
    </div>
  );
};
