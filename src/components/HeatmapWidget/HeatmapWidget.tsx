/**
 * HeatmapWidget — horizontal sector strip with a category wheel (Index / Stocks / F&O), mosaic cells per sector,
 * and equal-height cards. **Index** and **F&O** use a taller mosaic than **Stocks** (`hmw--mosaic-tall`).
 *
 * Wire **`sectorsByWheel`** so each key matches a label in **`wheelItems`**. Pass **`wheelRepeatCount`** to the inner
 * `WheelCarousel` as `repeatCount` to tune infinite-scroll behaviour.
 */
import { useCallback, useMemo, useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import { WheelCarousel } from '../WheelCarousel';
import './HeatmapWidget.css';

export type HeatmapTone = 'lime-strong' | 'lime-medium' | 'red-medium' | 'red-strong';

export interface HeatmapCellData {
  name: string;
  /** Percent change, e.g. 1.2 → +1.20% */
  changePct: number;
  tone: HeatmapTone;
}

export type HeatmapSector =
  | {
      id: string;
      kind: 'tech4';
      sectorName: string;
      scriptCount: number;
      /** e.g. "4 Indices" or "4 Contracts" — overrides `${scriptCount} Scripts` when set */
      scriptLabel?: string;
      cells: [HeatmapCellData, HeatmapCellData, HeatmapCellData, HeatmapCellData];
    }
  | {
      id: string;
      kind: 'bank5';
      sectorName: string;
      scriptCount: number;
      scriptLabel?: string;
      cells: [
        HeatmapCellData,
        HeatmapCellData,
        HeatmapCellData,
        HeatmapCellData,
        HeatmapCellData,
      ];
    };

export interface HeatmapWidgetProps {
  className?: string;
  /** Section title in the header row (with chevron). */
  title?: string;
  /** When false, only the sector strip is rendered (no title / wheel). */
  showHeader?: boolean;
  /** Makes the title keyboard-activable and clickable (e.g. navigate to full heatmap). */
  onTitleClick?: () => void;
  /** Wheel tab labels in scroll order. Must align with keys in `sectorsByWheel`. Default: `Index`, `Stocks`, `F&O`. */
  wheelItems?: string[];
  /**
   * When `wheelItems` use custom display labels, pass the same-length list of canonical tab ids (`Index`, `Stocks`, `F&O`)
   * so mosaic height (taller for Index / F&O) still matches the correct dataset. Omit when labels match the canonical names.
   */
  wheelCanonicalTabOrder?: string[];
  /** Controlled: which wheel tab is selected. */
  wheelValue?: string;
  /** Uncontrolled: initial wheel tab (must exist in `wheelItems`). */
  defaultWheelValue?: string;
  onWheelChange?: (value: string) => void;
  /**
   * Forwarded to `WheelCarousel` as `repeatCount`: how many times `wheelItems` are repeated in the infinite scroll
   * track (odd numbers recommended; WheelCarousel default is 51).
   */
  wheelRepeatCount?: number;
  /**
   * Limits how many sector cards appear in the horizontal strip (applied after resolving the active tab).
   * Omit to show the full list.
   */
  maxSectorCards?: number;
  /**
   * Sectors shown per wheel tab. Keys must match `wheelItems`.
   * Default: `HEATMAP_DEFAULT_SECTORS_BY_WHEEL` (Index, Stocks, F&O, plus Commodities, ETF, Crypto, Debt for long wheels).
   */
  sectorsByWheel?: Record<string, HeatmapSector[]>;
  /**
   * When set, shows this list only and ignores `sectorsByWheel` / wheel switching (still respects `maxSectorCards` when set).
   */
  sectors?: HeatmapSector[];
}

function formatChangePct(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/** Cash / equity heatmap — “Stocks” wheel tab (aligned with StocksScreen mock). */
export const HEATMAP_STOCKS_SECTORS: HeatmapSector[] = [
  {
    id: 'stx-tech',
    kind: 'tech4',
    sectorName: 'Technology',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Wipro', changePct: 1.2, tone: 'lime-strong' },
      { name: 'Tech Mahindra', changePct: 0.79, tone: 'lime-medium' },
      { name: 'Infosys', changePct: -0.79, tone: 'red-medium' },
      { name: 'TCS', changePct: -1.79, tone: 'red-strong' },
    ],
  },
  {
    id: 'stx-bank',
    kind: 'bank5',
    sectorName: 'Banking & Finance',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'HDFC', changePct: 0.79, tone: 'lime-medium' },
      { name: 'Yes Bank', changePct: -0.79, tone: 'red-medium' },
      { name: 'SBI', changePct: -0.79, tone: 'red-medium' },
      { name: 'ICICI', changePct: -1.79, tone: 'red-strong' },
      { name: 'Bajaj', changePct: -1.79, tone: 'red-strong' },
    ],
  },
  {
    id: 'stx-pharma',
    kind: 'tech4',
    sectorName: 'Pharma',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Sun Pharma', changePct: 1.45, tone: 'lime-strong' },
      { name: 'Dr Reddy', changePct: 0.88, tone: 'lime-medium' },
      { name: 'Cipla', changePct: 0.6, tone: 'lime-medium' },
      { name: "Divi's Lab", changePct: -0.35, tone: 'red-medium' },
    ],
  },
  {
    id: 'stx-auto',
    kind: 'tech4',
    sectorName: 'Automobile',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Maruti Suzuki', changePct: 2.73, tone: 'lime-strong' },
      { name: 'M&M', changePct: 1.85, tone: 'lime-strong' },
      { name: 'Bajaj Auto', changePct: 0.92, tone: 'lime-medium' },
      { name: 'Hero Moto', changePct: -0.45, tone: 'red-medium' },
    ],
  },
  {
    id: 'stx-energy',
    kind: 'bank5',
    sectorName: 'Energy',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'ONGC', changePct: 1.88, tone: 'lime-strong' },
      { name: 'Power Grid', changePct: 0.65, tone: 'lime-medium' },
      { name: 'NTPC', changePct: 0.38, tone: 'lime-medium' },
      { name: 'Coal India', changePct: -0.42, tone: 'red-medium' },
      { name: 'IOC', changePct: -1.15, tone: 'red-strong' },
    ],
  },
  {
    id: 'stx-metal',
    kind: 'tech4',
    sectorName: 'Metal',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Vedanta', changePct: 0.52, tone: 'lime-medium' },
      { name: 'Hindalco', changePct: -0.95, tone: 'red-medium' },
      { name: 'JSW Steel', changePct: -1.68, tone: 'red-strong' },
      { name: 'Tata Steel', changePct: -2.15, tone: 'red-strong' },
    ],
  },
];

/** @deprecated Use HEATMAP_STOCKS_SECTORS */
export const HEATMAP_DEFAULT_SECTORS = HEATMAP_STOCKS_SECTORS;

/** Index groups — “Index” wheel tab (StocksScreen heatmapData.Index). */
export const HEATMAP_INDEX_SECTORS: HeatmapSector[] = [
  {
    id: 'idx-nifty',
    kind: 'tech4',
    sectorName: 'NIFTY',
    scriptCount: 4,
    scriptLabel: '4 Indices',
    cells: [
      { name: 'NIFTY 50', changePct: 0.33, tone: 'lime-medium' },
      { name: 'NIFTY 100', changePct: 0.45, tone: 'lime-medium' },
      { name: 'NIFTY Next50', changePct: -0.52, tone: 'red-medium' },
      { name: 'NIFTY 200', changePct: -0.28, tone: 'red-medium' },
    ],
  },
  {
    id: 'idx-sensex',
    kind: 'bank5',
    sectorName: 'SENSEX',
    scriptCount: 5,
    scriptLabel: '5 Indices',
    cells: [
      { name: 'BSE Smallcap', changePct: 1.88, tone: 'lime-strong' },
      { name: 'BSE Midcap', changePct: 1.45, tone: 'lime-strong' },
      { name: 'BSE 200', changePct: 0.52, tone: 'lime-medium' },
      { name: 'BSE 100', changePct: 0.38, tone: 'lime-medium' },
      { name: 'SENSEX', changePct: 0.28, tone: 'lime-medium' },
    ],
  },
  {
    id: 'idx-banknifty',
    kind: 'tech4',
    sectorName: 'BANKNIFTY',
    scriptCount: 4,
    scriptLabel: '4 Indices',
    cells: [
      { name: 'NIFTY Energy', changePct: 0.75, tone: 'lime-medium' },
      { name: 'NIFTY Pvt Bank', changePct: -0.82, tone: 'red-medium' },
      { name: 'NIFTY PSU Bank', changePct: -1.45, tone: 'red-strong' },
      { name: 'NIFTY Metal', changePct: -1.68, tone: 'red-strong' },
    ],
  },
  {
    id: 'idx-bankex',
    kind: 'tech4',
    sectorName: 'BANKEX',
    scriptCount: 4,
    scriptLabel: '4 Indices',
    cells: [
      { name: 'Midcap 50', changePct: 1.88, tone: 'lime-strong' },
      { name: 'Smallcap 50', changePct: 2.42, tone: 'lime-strong' },
      { name: 'Midcap 100', changePct: 1.35, tone: 'lime-strong' },
      { name: 'Smallcap 100', changePct: 1.92, tone: 'lime-strong' },
    ],
  },
  {
    id: 'idx-finnifty',
    kind: 'bank5',
    sectorName: 'FINNIFTY',
    scriptCount: 5,
    scriptLabel: '5 Indices',
    cells: [
      { name: 'NIFTY Infra', changePct: 1.25, tone: 'lime-strong' },
      { name: 'NIFTY Oil & Gas', changePct: 0.68, tone: 'lime-medium' },
      { name: 'NIFTY FMCG', changePct: -0.16, tone: 'red-medium' },
      { name: 'NIFTY Media', changePct: -0.45, tone: 'red-medium' },
      { name: 'NIFTY Commodity', changePct: -0.95, tone: 'red-medium' },
    ],
  },
  {
    id: 'idx-strategy',
    kind: 'tech4',
    sectorName: 'Strategy Indices',
    scriptCount: 4,
    scriptLabel: '4 Indices',
    cells: [
      { name: 'NIFTY Dividend', changePct: 0.55, tone: 'lime-medium' },
      { name: 'NIFTY Growth', changePct: 0.92, tone: 'lime-medium' },
      { name: 'NIFTY Value 20', changePct: 0.38, tone: 'lime-medium' },
      { name: 'NIFTY Alpha 50', changePct: 1.48, tone: 'lime-strong' },
    ],
  },
];

/** F&O — “F&O” wheel tab (StocksScreen heatmapData.F&O). */
export const HEATMAP_FNO_SECTORS: HeatmapSector[] = [
  {
    id: 'fno-nifty-opt',
    kind: 'tech4',
    sectorName: 'NIFTY Options',
    scriptCount: 4,
    scriptLabel: '4 Contracts',
    cells: [
      { name: 'NFT 26000CE', changePct: 1.5, tone: 'lime-strong' },
      { name: 'NFT 26100CE', changePct: 0.85, tone: 'lime-medium' },
      { name: 'NFT 25900PE', changePct: -1.3, tone: 'red-strong' },
      { name: 'NFT 25800PE', changePct: -1.75, tone: 'red-strong' },
    ],
  },
  {
    id: 'fno-bnf-opt',
    kind: 'bank5',
    sectorName: 'Bank Nifty Options',
    scriptCount: 5,
    scriptLabel: '5 Contracts',
    cells: [
      { name: 'BNF 56000CE', changePct: 1.8, tone: 'lime-strong' },
      { name: 'BNF 56500CE', changePct: 1.45, tone: 'lime-strong' },
      { name: 'BNF 56200CE', changePct: 0.85, tone: 'lime-medium' },
      { name: 'BNF 55000PE', changePct: -1.2, tone: 'red-strong' },
      { name: 'BNF 55500PE', changePct: -1.9, tone: 'red-strong' },
    ],
  },
  {
    id: 'fno-stock-fut',
    kind: 'tech4',
    sectorName: 'Stock Futures',
    scriptCount: 4,
    scriptLabel: '4 Contracts',
    cells: [
      { name: 'RELIANCE', changePct: 0.85, tone: 'lime-medium' },
      { name: 'INFY', changePct: 0.45, tone: 'lime-medium' },
      { name: 'HDFCBANK', changePct: -0.88, tone: 'red-medium' },
      { name: 'TCS', changePct: -1.23, tone: 'red-strong' },
    ],
  },
  {
    id: 'fno-call',
    kind: 'tech4',
    sectorName: 'Stock Options - Calls',
    scriptCount: 4,
    scriptLabel: '4 Contracts',
    cells: [
      { name: 'TATAMOTORS 400CE', changePct: 1.95, tone: 'lime-strong' },
      { name: 'RELIANCE 1500CE', changePct: 1.8, tone: 'lime-strong' },
      { name: 'INFY 1500CE', changePct: 1.9, tone: 'lime-strong' },
      { name: 'HDFCBANK 950CE', changePct: -1.2, tone: 'red-strong' },
    ],
  },
  {
    id: 'fno-put',
    kind: 'bank5',
    sectorName: 'Stock Options - Puts',
    scriptCount: 5,
    scriptLabel: '5 Contracts',
    cells: [
      { name: 'TCS 2900PE', changePct: 1.4, tone: 'lime-strong' },
      { name: 'HDFCBANK 930PE', changePct: 1.8, tone: 'lime-strong' },
      { name: 'ICICIBANK 1100PE', changePct: 1.2, tone: 'lime-strong' },
      { name: 'SBIN 750PE', changePct: 0.9, tone: 'lime-medium' },
      { name: 'RELIANCE 1450PE', changePct: -1.6, tone: 'red-strong' },
    ],
  },
  {
    id: 'fno-idx-fut',
    kind: 'tech4',
    sectorName: 'Index Futures',
    scriptCount: 4,
    scriptLabel: '4 Contracts',
    cells: [
      { name: 'MIDCPNIFTY', changePct: 1.88, tone: 'lime-strong' },
      { name: 'NIFTY', changePct: 0.33, tone: 'lime-medium' },
      { name: 'FINNIFTY', changePct: -0.85, tone: 'red-medium' },
      { name: 'BANKNIFTY', changePct: -1.91, tone: 'red-strong' },
    ],
  },
];

/** Commodities — extended wheel tab (optional 4th+ category). */
export const HEATMAP_COMMODITIES_SECTORS: HeatmapSector[] = [
  {
    id: 'com-agri',
    kind: 'tech4',
    sectorName: 'Agri',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Balrampur Chini', changePct: 1.2, tone: 'lime-strong' },
      { name: 'Triveni', changePct: 0.65, tone: 'lime-medium' },
      { name: 'Parag Milk', changePct: -0.4, tone: 'red-medium' },
      { name: 'Dabur', changePct: 0.25, tone: 'lime-medium' },
    ],
  },
  {
    id: 'com-bullion',
    kind: 'bank5',
    sectorName: 'Bullion & RM',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'Gold', changePct: 0.5, tone: 'lime-medium' },
      { name: 'Silver', changePct: 1.1, tone: 'lime-strong' },
      { name: 'Copper', changePct: -0.8, tone: 'red-medium' },
      { name: 'Zinc', changePct: 0.2, tone: 'lime-medium' },
      { name: 'Crude', changePct: -1.4, tone: 'red-strong' },
    ],
  },
  {
    id: 'com-soft',
    kind: 'tech4',
    sectorName: 'Softs',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'Cotton', changePct: 0.9, tone: 'lime-medium' },
      { name: 'Sugar', changePct: 1.2, tone: 'lime-strong' },
      { name: 'Coffee', changePct: -0.3, tone: 'red-medium' },
      { name: 'Rubber', changePct: 0.15, tone: 'lime-medium' },
    ],
  },
  {
    id: 'com-base',
    kind: 'bank5',
    sectorName: 'Base metals',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'Aluminium', changePct: 0.4, tone: 'lime-medium' },
      { name: 'Nickel', changePct: -1.1, tone: 'red-strong' },
      { name: 'Lead', changePct: 0.2, tone: 'lime-medium' },
      { name: 'Tin', changePct: 0.6, tone: 'lime-medium' },
      { name: 'Zinc', changePct: -0.2, tone: 'red-medium' },
    ],
  },
];

/** ETF — extended wheel tab. */
export const HEATMAP_ETF_SECTORS: HeatmapSector[] = [
  {
    id: 'etf-idx',
    kind: 'tech4',
    sectorName: 'Index ETFs',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'NIFTYBEES', changePct: 0.33, tone: 'lime-medium' },
      { name: 'BANKBEES', changePct: 0.52, tone: 'lime-medium' },
      { name: 'GOLDBEES', changePct: 0.21, tone: 'lime-medium' },
      { name: 'MON100', changePct: -0.41, tone: 'red-medium' },
    ],
  },
  {
    id: 'etf-sector',
    kind: 'bank5',
    sectorName: 'Sector ETFs',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'ITBEES', changePct: 0.91, tone: 'lime-medium' },
      { name: 'PHARMABEES', changePct: 0.44, tone: 'lime-medium' },
      { name: 'AUTOBEES', changePct: 1.18, tone: 'lime-strong' },
      { name: 'PSUBNKBEES', changePct: -0.72, tone: 'red-medium' },
      { name: 'EVINDIA', changePct: 0.26, tone: 'lime-medium' },
    ],
  },
  {
    id: 'etf-gold',
    kind: 'tech4',
    sectorName: 'Gold & liquid',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'GOLDBEES', changePct: 0.22, tone: 'lime-medium' },
      { name: 'SILVERBEES', changePct: 0.45, tone: 'lime-medium' },
      { name: 'LIQUIDBEES', changePct: 0.02, tone: 'lime-medium' },
      { name: 'LTGILT', changePct: -0.15, tone: 'red-medium' },
    ],
  },
];

/** Crypto — extended wheel tab (watchlist-style). */
export const HEATMAP_CRYPTO_SECTORS: HeatmapSector[] = [
  {
    id: 'cry-btc',
    kind: 'tech4',
    sectorName: 'Majors',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'BTC', changePct: 1.82, tone: 'lime-strong' },
      { name: 'ETH', changePct: 2.05, tone: 'lime-strong' },
      { name: 'SOL', changePct: -0.91, tone: 'red-medium' },
      { name: 'XRP', changePct: 0.44, tone: 'lime-medium' },
    ],
  },
  {
    id: 'cry-alt',
    kind: 'bank5',
    sectorName: 'Altcoins',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: 'ADA', changePct: 0.71, tone: 'lime-medium' },
      { name: 'DOT', changePct: -1.18, tone: 'red-strong' },
      { name: 'MATIC', changePct: 0.52, tone: 'lime-medium' },
      { name: 'AVAX', changePct: 1.12, tone: 'lime-strong' },
      { name: 'LINK', changePct: 0.35, tone: 'lime-medium' },
    ],
  },
  {
    id: 'cry-defi',
    kind: 'tech4',
    sectorName: 'DeFi',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'UNI', changePct: 0.62, tone: 'lime-medium' },
      { name: 'AAVE', changePct: -0.41, tone: 'red-medium' },
      { name: 'MKR', changePct: 0.88, tone: 'lime-medium' },
      { name: 'CRV', changePct: -1.02, tone: 'red-strong' },
    ],
  },
];

/** Debt / fixed income — extended wheel tab. */
export const HEATMAP_DEBT_SECTORS: HeatmapSector[] = [
  {
    id: 'debt-gilt',
    kind: 'bank5',
    sectorName: 'Gilts',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: '91 D T-Bill', changePct: 0.01, tone: 'lime-medium' },
      { name: '10Y G-Sec', changePct: -0.05, tone: 'red-medium' },
      { name: 'SDL 5Y', changePct: 0.02, tone: 'lime-medium' },
      { name: 'SDL 10Y', changePct: 0.03, tone: 'lime-medium' },
      { name: 'FRB 15Y', changePct: -0.08, tone: 'red-medium' },
    ],
  },
  {
    id: 'debt-corp',
    kind: 'tech4',
    sectorName: 'Corporate bonds',
    scriptCount: 4,
    scriptLabel: '4 Scripts',
    cells: [
      { name: 'AAA PSU', changePct: 0.02, tone: 'lime-medium' },
      { name: 'AAA Pvt', changePct: 0.04, tone: 'lime-medium' },
      { name: 'AA+', changePct: -0.1, tone: 'red-medium' },
      { name: 'Money Mkt', changePct: 0.03, tone: 'lime-medium' },
    ],
  },
  {
    id: 'debt-cp',
    kind: 'bank5',
    sectorName: 'CP / CD',
    scriptCount: 5,
    scriptLabel: '5 Scripts',
    cells: [
      { name: '3M CP', changePct: 0.05, tone: 'lime-medium' },
      { name: '6M CD', changePct: 0.06, tone: 'lime-medium' },
      { name: '1Y CD', changePct: 0.07, tone: 'lime-medium' },
      { name: 'Floater', changePct: 0.04, tone: 'lime-medium' },
      { name: 'Ultra ST', changePct: 0.03, tone: 'lime-medium' },
    ],
  },
];

/** Canonical order for extended heatmap wheels (matches `HEATMAP_DEFAULT_SECTORS_BY_WHEEL` keys). */
export const HEATMAP_EXTENDED_WHEEL_ORDER = [
  'Index',
  'Stocks',
  'F&O',
  'Commodities',
  'ETF',
  'Crypto',
  'Debt',
] as const;

/** Default mapping — keys must match `wheelItems`. Includes optional 4th–7th tabs for long wheels. */
export const HEATMAP_DEFAULT_SECTORS_BY_WHEEL: Record<string, HeatmapSector[]> = {
  Index: HEATMAP_INDEX_SECTORS,
  Stocks: HEATMAP_STOCKS_SECTORS,
  'F&O': HEATMAP_FNO_SECTORS,
  Commodities: HEATMAP_COMMODITIES_SECTORS,
  ETF: HEATMAP_ETF_SECTORS,
  Crypto: HEATMAP_CRYPTO_SECTORS,
  Debt: HEATMAP_DEBT_SECTORS,
};

function HeatmapCell({
  name,
  changePct,
  tone,
  compact,
  radiusClass,
}: HeatmapCellData & {
  compact?: boolean;
  radiusClass: string;
}) {
  const toneClass = `hmw__cell--${tone}`;
  return (
    <div
      className={['hmw__cell', toneClass, compact ? 'hmw__cell--compact' : '', radiusClass]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="hmw__cell-inner">
        <span className="hmw__cell-name subtext-medium">{name}</span>
        <span
          className={
            compact ? 'hmw__cell-change hmw__cell-change--compact subtext-regular' : 'hmw__cell-change body-regular'
          }
        >
          {formatChangePct(changePct)}
        </span>
      </div>
    </div>
  );
}

function SectorCardTech4({
  sectorName,
  scriptCount,
  scriptLabel,
  cells,
}: Extract<HeatmapSector, { kind: 'tech4' }>) {
  const [a, b, c, d] = cells;
  const meta = scriptLabel ?? `${scriptCount} Scripts`;
  return (
    <article className="hmw__card" aria-label={`${sectorName}, ${meta}`}>
      <div className="hmw__card-head">
        <span className="hmw__card-title body-medium">{sectorName}</span>
        <span className="hmw__card-meta subtext-regular">{meta}</span>
      </div>
      <div className="hmw__mosaic hmw__mosaic--tech4">
        <HeatmapCell
          {...a}
          radiusClass="hmw__cell-r--tech-a"
        />
        <HeatmapCell
          {...b}
          radiusClass="hmw__cell-r--tech-b"
        />
        <div className="hmw__stack hmw__stack--narrow">
          <HeatmapCell
            {...c}
            compact
            radiusClass="hmw__cell-r--tech-c"
          />
          <HeatmapCell
            {...d}
            compact
            radiusClass="hmw__cell-r--tech-d"
          />
        </div>
      </div>
    </article>
  );
}

function SectorCardBank5({
  sectorName,
  scriptCount,
  scriptLabel,
  cells,
}: Extract<HeatmapSector, { kind: 'bank5' }>) {
  const [hdfc, yb, icici, sbi, bajaj] = cells;
  const meta = scriptLabel ?? `${scriptCount} Scripts`;
  return (
    <article className="hmw__card" aria-label={`${sectorName}, ${meta}`}>
      <div className="hmw__card-head">
        <span className="hmw__card-title body-medium">{sectorName}</span>
        <span className="hmw__card-meta subtext-regular">{meta}</span>
      </div>
      <div className="hmw__mosaic hmw__mosaic--bank5">
        <HeatmapCell
          {...hdfc}
          radiusClass="hmw__cell-r--bank-a"
        />
        <div className="hmw__stack hmw__stack--bank-mid">
          <HeatmapCell
            {...yb}
            compact
            radiusClass="hmw__cell-r--bank-b"
          />
          <HeatmapCell
            {...icici}
            compact
            radiusClass="hmw__cell-r--bank-c"
          />
        </div>
        <div className="hmw__stack hmw__stack--bank-mid">
          <HeatmapCell
            {...sbi}
            compact
            radiusClass="hmw__cell-r--bank-d"
          />
          <HeatmapCell
            {...bajaj}
            compact
            radiusClass="hmw__cell-r--bank-e"
          />
        </div>
      </div>
    </article>
  );
}

export const HeatmapWidget = ({
  className,
  title = 'Heatmap',
  showHeader = true,
  onTitleClick,
  wheelItems = ['Index', 'Stocks', 'F&O'],
  wheelCanonicalTabOrder,
  wheelValue,
  defaultWheelValue = 'Stocks',
  onWheelChange,
  wheelRepeatCount,
  maxSectorCards,
  sectorsByWheel = HEATMAP_DEFAULT_SECTORS_BY_WHEEL,
  sectors: sectorsOverride,
}: HeatmapWidgetProps) => {
  const isWheelControlled = wheelValue !== undefined;
  /** Same as StocksScreen: heatmap tab tracks wheel selection immediately (WheelCarousel only fires when center tab changes). */
  const [wheelTab, setWheelTab] = useState(defaultWheelValue);

  const sectorWheel = isWheelControlled ? wheelValue! : wheelTab;

  const mosaicTall = (() => {
    const items = wheelItems ?? ['Index', 'Stocks', 'F&O'];
    const canon = wheelCanonicalTabOrder;
    if (
      canon &&
      canon.length === items.length &&
      items.includes(sectorWheel)
    ) {
      const idx = items.indexOf(sectorWheel);
      const c = canon[idx];
      return c === 'Index' || c === 'F&O';
    }
    return sectorWheel === 'Index' || sectorWheel === 'F&O';
  })();
  const rootCls = ['hmw', mosaicTall && 'hmw--mosaic-tall', className].filter(Boolean).join(' ');

  const handleWheelChange = useCallback(
    (value: string) => {
      onWheelChange?.(value);
      if (!isWheelControlled) setWheelTab(value);
    },
    [isWheelControlled, onWheelChange]
  );

  const displaySectors = useMemo(() => {
    let list: HeatmapSector[];
    if (sectorsOverride?.length) list = sectorsOverride;
    else {
      const fromTab = sectorsByWheel[sectorWheel];
      if (fromTab?.length) list = fromTab;
      else {
        const fallbackKey = wheelItems[0] ?? defaultWheelValue;
        list = sectorsByWheel[fallbackKey] ?? [];
      }
    }
    if (typeof maxSectorCards === 'number' && maxSectorCards > 0) {
      return list.slice(0, maxSectorCards);
    }
    return list;
  }, [
    sectorsOverride,
    sectorsByWheel,
    sectorWheel,
    wheelItems,
    defaultWheelValue,
    maxSectorCards,
  ]);

  const handleTitleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!onTitleClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTitleClick();
      }
    },
    [onTitleClick]
  );

  const sectionHeader = (
    <SectionHeader
      size="extra-large"
      title={title}
      showChevron
      trailing="none"
      showSubtext={false}
      className="hmw__section-header"
    />
  );

  return (
    <div className={rootCls}>
      {showHeader ? (
        <div className="hmw__header">
          {onTitleClick ? (
            <div
              className="hmw__section-header-wrap"
              role="button"
              tabIndex={0}
              onClick={onTitleClick}
              onKeyDown={handleTitleKeyDown}
              aria-label={`${title}, view details`}
            >
              {sectionHeader}
            </div>
          ) : (
            <div className="hmw__section-header-wrap">{sectionHeader}</div>
          )}
          <div className="hmw__wheel">
            <WheelCarousel
              items={wheelItems}
              value={isWheelControlled ? wheelValue : undefined}
              defaultValue={defaultWheelValue}
              onChange={handleWheelChange}
              repeatCount={wheelRepeatCount}
              aria-label="Heatmap category"
            />
          </div>
        </div>
      ) : null}

      <div className="hmw__strip">
        {displaySectors.map((sector) =>
          sector.kind === 'tech4' ? (
            <SectorCardTech4 key={sector.id} {...sector} />
          ) : (
            <SectorCardBank5 key={sector.id} {...sector} />
          )
        )}
      </div>
    </div>
  );
};
