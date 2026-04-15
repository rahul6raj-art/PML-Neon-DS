/** Mock data for MTF (Margin Trading Facility) home — replace with portfolio / MTF APIs. */

export interface MtfReturnOnMarginSummary {
  headlinePct: string;
  insightBadge: string;
  marginLabel: string;
  marginValue: string;
  profitLabel: string;
  profitValue: string;
  interestLabel: string;
  interestValue: string;
}

export interface MtfQuickAction {
  id: string;
  label: string;
  icon: string;
}

export interface MtfActivePosition {
  id: string;
  name: string;
  marginLabel: string;
  pnlLabel: string;
  pnlSentiment: 'positive' | 'negative';
  leverageBadge: string;
}

export interface MtfScannerCard {
  id: string;
  name: string;
  category: string;
  tagBadge: string;
  leverageLine: string;
  riskLabel: string;
  riskSentiment: 'positive' | 'negative';
}

export interface MtfFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface MtfHealthSummary {
  title: string;
  subtitle: string;
  riskBadge: string;
  /** 0–100 — filled portion of buying-power bar */
  buyingPowerUsedPct: number;
  buyingPowerLabel: string;
  buyingPowerDetail: string;
  buyingPowerPctDisplay: string;
}

export const MTF_RETURN_ON_MARGIN_MOCK: MtfReturnOnMarginSummary = {
  headlinePct: '+24.6%',
  insightBadge: 'You earned 15x more than interest paid',
  marginLabel: 'Margin',
  marginValue: '₹40k',
  profitLabel: 'Profit',
  profitValue: '+9,208',
  interestLabel: 'Interest',
  interestValue: '-₹620',
};

export const MTF_QUICK_ACTIONS_MOCK: MtfQuickAction[] = [
  { id: 'add-margin', label: 'Add Margin', icon: 'rupee' },
  { id: 'calculator', label: 'Calculator', icon: 'chart' },
  { id: 'pledge', label: 'Pledge', icon: 'briefcase_outline' },
  { id: 'exit-all', label: 'Exit All', icon: 'arrow_right_outline' },
];

export const MTF_ACTIVE_POSITIONS_MOCK: MtfActivePosition[] = [
  {
    id: '1',
    name: 'Reliance Industries',
    marginLabel: 'Margin: ₹5,000',
    pnlLabel: '+₹1,240.40',
    pnlSentiment: 'positive',
    leverageBadge: '4x Lev',
  },
  {
    id: '2',
    name: 'Tata Steel',
    marginLabel: 'Margin: ₹5,000',
    pnlLabel: '-₹240.40',
    pnlSentiment: 'negative',
    leverageBadge: '4x Lev',
  },
];

export const MTF_SCANNER_CARDS_MOCK: MtfScannerCard[] = [
  {
    id: 's1',
    name: 'HDFC Bank',
    category: 'Banking',
    tagBadge: 'Stable Giant',
    leverageLine: 'Leverage: 3.5x',
    riskLabel: 'Low',
    riskSentiment: 'positive',
  },
  {
    id: 's2',
    name: 'HDFC Bank',
    category: 'Banking',
    tagBadge: 'Stable Giant',
    leverageLine: 'Leverage: 3.5x',
    riskLabel: 'Low',
    riskSentiment: 'positive',
  },
];

export const MTF_FAQ_MOCK: MtfFaqItem[] = [
  {
    id: 'q1',
    question: 'When is interest charged?',
    answer:
      'Interest is calculated daily on the funded amount (end of day) and debited from your ledger monthly.',
  },
  {
    id: 'q2',
    question: 'What is Pledging',
    answer:
      'Pledging lets you use eligible securities as collateral to increase your MTF buying power, subject to exchange and broker rules.',
  },
];

export const MTF_HEALTH_MOCK: MtfHealthSummary = {
  title: 'MTF Health',
  subtitle: 'Based on your holdings & volatility',
  riskBadge: 'Low Risk',
  buyingPowerUsedPct: 40,
  buyingPowerLabel: 'Buying Power Used',
  buyingPowerDetail: '₹37k / ₹122k ',
  buyingPowerPctDisplay: '(40%)',
};
