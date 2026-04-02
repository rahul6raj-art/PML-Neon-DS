/**
 * Maps logo names → local image paths.
 * Images live in /public/logos/{category}/{name}.png and are served
 * by Vite at /logos/{category}/{name}.png.
 */

const MF: Record<string, string> = {
  Nippon: '/logos/mutualFunds/Nippon.png',
  Kotak: '/logos/mutualFunds/Kotak.png',
  ICICI: '/logos/mutualFunds/ICICI.png',
  HDFC: '/logos/mutualFunds/HDFC.png',
  HSBC: '/logos/mutualFunds/HSBC.png',
  IDBI: '/logos/mutualFunds/IDBI.png',
  Axis: '/logos/mutualFunds/Axis.png',
  Mirae: '/logos/mutualFunds/Mirae.png',
  UTI: '/logos/mutualFunds/UTI.png',
  LIC: '/logos/mutualFunds/LIC.png',
  Quant: '/logos/mutualFunds/Quant.png',
  Quantum: '/logos/mutualFunds/Quantum.png',
  Edelweiss: '/logos/mutualFunds/Edelweiss.png',
  Motilal: '/logos/mutualFunds/Motilal.png',
  Bandhan: '/logos/mutualFunds/Bandhan.png',
  Invesco: '/logos/mutualFunds/Invesco.png',
  PPFAS: '/logos/mutualFunds/PPFAS.png',
  ITC: '/logos/mutualFunds/ITC.png',
  DSP: '/logos/mutualFunds/DSP.png',
  'JIO BlackRock': '/logos/mutualFunds/JIO BlackRock.png',
  JIO: '/logos/mutualFunds/JIO.png',
  Tata: '/logos/mutualFunds/Tata.png',
  'Canara Robeco': '/logos/mutualFunds/Canara Robeco.png',
  'Sundaram MF': '/logos/mutualFunds/Sundaram MF.png',
  'Baroda BNP Paribas': '/logos/mutualFunds/Baroda BNP Paribas.png',
  'Mahindra Manulife': '/logos/mutualFunds/Mahindra Manulife.png',
  'Bajaj Finserv': '/logos/mutualFunds/Bajaj Finserv.png',
  Navi: '/logos/mutualFunds/Navi.png',
  Groww: '/logos/mutualFunds/Groww.png',
  AngelOne: '/logos/mutualFunds/AngelOne.png',
  PGIM: '/logos/mutualFunds/PGIM.png',
  Reliance: '/logos/mutualFunds/Reliance.png',
  SBI: '/logos/mutualFunds/SBI.png',
  'Aditya Birla': '/logos/mutualFunds/Aditya Birla.png',
};

const PAY: Record<string, string> = {
  Paytm: '/logos/payments/Paytm.png',
  Phonepe: '/logos/payments/Phonepe.png',
  GPay: '/logos/payments/GPay.png',
  CRED: '/logos/payments/CRED.png',
  BHIM: '/logos/payments/BHIM.png',
  BarathPay: '/logos/payments/BarathPay.png',
};

const BANK: Record<string, string> = {
  'SBI (State Bank of India': '/logos/banks/SBI (State Bank of India.png',
  HDFC: '/logos/banks/HDFC.png',
  'South Indian Bank': '/logos/banks/South Indian Bank.png',
  'Axis Bank': '/logos/banks/Axis Bank.png',
  HSBC: '/logos/banks/HSBC.png',
  ICICI: '/logos/banks/ICICI.png',
  'PNB Punjab National Bank': '/logos/banks/PNB Punjab National Bank.png',
  'Union Bank': '/logos/banks/Union Bank.png',
  'Canara Bank': '/logos/banks/Canara Bank.png',
  'Aditya Birla Payment Bank': '/logos/banks/Aditya Birla Payment Bank.png',
  'Jana Bank': '/logos/banks/Jana Bank.png',
};

const STOCK: Record<string, string> = {
  'Yes Bank': '/logos/stocks/Yes Bank.png',
  'Reliance Industries': '/logos/stocks/Reliance Industries.png',
  'Tata Motors': '/logos/stocks/Tata Motors.png',
  Wipro: '/logos/stocks/Wipro.png',
  Vi: '/logos/stocks/Vi.png',
  LG: '/logos/stocks/LG.png',
  One97: '/logos/stocks/One97.png',
  'PC Jewellers': '/logos/stocks/PC Jewellers.png',
  Axis: '/logos/stocks/Axis.png',
  MRF: '/logos/stocks/MRF.png',
  Adani: '/logos/stocks/Adani.png',
  Infosys: '/logos/stocks/Infosys.png',
  SBI: '/logos/stocks/SBI.png',
  NSDL: '/logos/stocks/NSDL.png',
};

const INDEX: Record<string, string> = {
  'Nifty 50': '/logos/indices/Nifty 50.png',
  'Nifty Bank': '/logos/indices/Nifty Bank.png',
  Sensex: '/logos/indices/Sensex.png',
  'All Nifty': '/logos/indices/All Nifty.png',
  'All BSE': '/logos/indices/All BSE.png',
  'Gift Nifty': '/logos/indices/Gift Nifty.png',
};

export const LOGO_IMAGE_MAP: Record<string, Record<string, string>> = {
  mutualFunds: MF,
  payments: PAY,
  banks: BANK,
  stocks: STOCK,
  indices: INDEX,
};

/** All names flattened (category-agnostic lookup) */
const ALL_LOGOS: Record<string, string> = {
  ...MF,
  ...PAY,
  ...BANK,
  ...STOCK,
  ...INDEX,
};

/**
 * Resolve a logo image path. Checks category-specific map first,
 * then falls back to global lookup.
 */
export function getLogoSrc(
  name: string,
  category?: string,
): string | undefined {
  if (category && LOGO_IMAGE_MAP[category]?.[name]) {
    return LOGO_IMAGE_MAP[category][name];
  }
  return ALL_LOGOS[name];
}

export const LOGO_BRAND_COLORS: Record<string, { bg: string; fg: string }> = {
  Nippon:              { bg: '#ED1C24', fg: '#FFFFFF' },
  Kotak:               { bg: '#ED232A', fg: '#FFFFFF' },
  ICICI:               { bg: '#F58220', fg: '#FFFFFF' },
  HDFC:                { bg: '#004C8F', fg: '#FFFFFF' },
  HSBC:                { bg: '#DB0011', fg: '#FFFFFF' },
  IDBI:                { bg: '#00A550', fg: '#FFFFFF' },
  Axis:                { bg: '#97144D', fg: '#FFFFFF' },
  Mirae:               { bg: '#0055A5', fg: '#FFFFFF' },
  UTI:                 { bg: '#6C2D91', fg: '#FFFFFF' },
  LIC:                 { bg: '#0D4C92', fg: '#FFFFFF' },
  Quant:               { bg: '#1A1A2E', fg: '#00D4FF' },
  Quantum:             { bg: '#1B6D36', fg: '#FFFFFF' },
  Edelweiss:           { bg: '#00529B', fg: '#FFFFFF' },
  Motilal:             { bg: '#6D2077', fg: '#FFFFFF' },
  Bandhan:             { bg: '#E3001B', fg: '#FFFFFF' },
  Invesco:             { bg: '#003DA5', fg: '#FFFFFF' },
  PPFAS:               { bg: '#1A3C6D', fg: '#FFFFFF' },
  ITC:                 { bg: '#003F72', fg: '#FFD700' },
  DSP:                 { bg: '#004B87', fg: '#FFFFFF' },
  JIO:                 { bg: '#002F87', fg: '#FFFFFF' },
  Tata:                { bg: '#0055A5', fg: '#FFFFFF' },
  Navi:                { bg: '#5C6BC0', fg: '#FFFFFF' },
  Groww:               { bg: '#5D35B1', fg: '#FFFFFF' },
  AngelOne:            { bg: '#FF6F00', fg: '#FFFFFF' },
  SBI:                 { bg: '#22409A', fg: '#FFFFFF' },
  Paytm:               { bg: '#00BAF2', fg: '#002970' },
  Phonepe:             { bg: '#5F259F', fg: '#FFFFFF' },
  GPay:                { bg: '#4285F4', fg: '#FFFFFF' },
  CRED:                { bg: '#1A1A1A', fg: '#D4AF37' },
};

export function getBrandColors(name: string): { bg: string; fg: string } {
  return LOGO_BRAND_COLORS[name] ?? { bg: '#E0E0E0', fg: '#555555' };
}
