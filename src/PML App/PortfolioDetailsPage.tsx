import { useMemo, useState } from 'react';
import { AllocationBreakdownWidget } from '../components/AllocationBreakdownWidget';
import { Alert } from '../components/Alert';
import { Header } from '../components/Header';
import { HoldingsSectionWidget } from '../components/HoldingsSectionWidget';
import { Loading } from '../components/Loading';
import { PortfolioWidget, PORTFOLIO_WIDGET_CHART_PATH_POSITIVE } from '../components/PortfolioWidget';
import {
  PORTFOLIO_DETAILS_ALLOCATION,
  PORTFOLIO_DETAILS_HOLDINGS,
  PORTFOLIO_DETAILS_NAME,
  PORTFOLIO_DETAILS_SUMMARY,
} from './portfolioDetailsMockData';
import './PortfolioDetailsPage.css';

export type PortfolioDetailsPreviewState =
  | 'default'
  | 'loading'
  | 'emptyHoldings'
  | 'partialFailure';

export interface PortfolioDetailsPageProps {
  colorScheme?: 'light' | 'dark';
  onBack?: () => void;
  /** Storybook / harness — simulates fetch lifecycle */
  previewState?: PortfolioDetailsPreviewState;
  onAddFunds?: () => void;
  onRetry?: () => void;
  onDiscoverStocks?: () => void;
}

export function PortfolioDetailsPage({
  colorScheme = 'dark',
  onBack,
  previewState = 'default',
  onAddFunds,
  onRetry,
  onDiscoverStocks,
}: PortfolioDetailsPageProps) {
  const headerIsDark = colorScheme === 'dark';
  const [dismissedBanner, setDismissedBanner] = useState(false);

  const isLoading = previewState === 'loading';
  const isEmptyHoldings = previewState === 'emptyHoldings';
  const isPartial = previewState === 'partialFailure';

  const holdingsItems = useMemo(
    () => (isEmptyHoldings ? [] : PORTFOLIO_DETAILS_HOLDINGS),
    [isEmptyHoldings],
  );

  const showPartialBanner = isPartial && !dismissedBanner;

  return (
    <div className="portfolio-details">
      <div className="pd-content">
        <Header
          key={colorScheme}
          type="large"
          title={PORTFOLIO_DETAILS_NAME}
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          showBackButton={Boolean(onBack)}
          onBack={onBack}
          showGradient={false}
          rhsIcons={['search_outline']}
          className="portfolio-details__header"
        />

        {showPartialBanner && (
          <div className="pd-banner">
            <Alert
              type="sleek"
              state="warning"
              showIcon
              showTitle={false}
              showDescription
              description="Some information couldn’t be refreshed. The rest of your portfolio is up to date."
              showCta
              ctaLabel="Retry"
              ctaVariant="tonal"
              ctaSize="small"
              onCtaClick={() => {
                setDismissedBanner(true);
                onRetry?.();
              }}
              showClose
              onClose={() => setDismissedBanner(true)}
            />
          </div>
        )}

        {isLoading ? (
          <div className="pd-loading" role="status" aria-live="polite">
            <Loading type="theme" label="Loading portfolio" />
          </div>
        ) : (
          <>
            <div className="pd-hero">
              <PortfolioWidget
                headerTitle="Current value"
                totalValue={PORTFOLIO_DETAILS_SUMMARY.totalValue}
                returnsLabel={PORTFOLIO_DETAILS_SUMMARY.returnsLabel}
                returnsValue={PORTFOLIO_DETAILS_SUMMARY.returnsValue}
                investedLabel={PORTFOLIO_DETAILS_SUMMARY.investedLabel}
                investedAmount={PORTFOLIO_DETAILS_SUMMARY.investedAmount}
                overallReturnsLabel={PORTFOLIO_DETAILS_SUMMARY.overallReturnsLabel}
                overallReturnsValue={PORTFOLIO_DETAILS_SUMMARY.overallReturnsValue}
                showBuyingPower
                buyingPowerLabel={PORTFOLIO_DETAILS_SUMMARY.buyingPowerLabel}
                buyingPowerAmount={PORTFOLIO_DETAILS_SUMMARY.buyingPowerAmount}
                svgPath={PORTFOLIO_WIDGET_CHART_PATH_POSITIVE}
                chartPositive
                chartIndicatorY={32}
                chartAriaLabel="Portfolio performance chart"
                onAddFundsPress={onAddFunds}
              />
            </div>

            <section className="pd-section" aria-label="Top holdings">
              <HoldingsSectionWidget
                title="Top holdings"
                items={holdingsItems}
                emptyMessage="You don’t have any stock holdings in this portfolio yet."
                emptyCtaLabel="Discover stocks"
                onEmptyCtaClick={onDiscoverStocks}
              />
            </section>

            <section className="pd-section" aria-label="Allocation">
              <AllocationBreakdownWidget
                title="Allocation"
                rows={PORTFOLIO_DETAILS_ALLOCATION.map((row) => ({
                  label: row.assetClass,
                  valueLabel: row.valueLabel,
                  percent: row.percent,
                }))}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
