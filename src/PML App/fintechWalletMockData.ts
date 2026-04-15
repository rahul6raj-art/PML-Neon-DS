export interface FintechWalletContact {
  id: string;
  initials: string;
  name: string;
}

export interface FintechWalletTx {
  id: string;
  merchant: string;
  when: string;
  amountLabel: string;
  amountType: 'positive' | 'negative';
  avatarInitials: string;
}

export const FINTECH_WALLET_CONTACTS: FintechWalletContact[] = [
  { id: '1', initials: 'SR', name: 'S Rizal' },
  { id: '2', initials: 'FC', name: 'Ferina C' },
  { id: '3', initials: 'AK', name: 'A Kumar' },
  { id: '4', initials: 'MP', name: 'M Patel' },
  { id: '5', initials: 'RN', name: 'R Nair' },
];

export const FINTECH_WALLET_TX: FintechWalletTx[] = [
  {
    id: 't1',
    merchant: 'Dribbble Pro',
    when: '15 Apr · 10:42',
    amountLabel: '₹573.00',
    amountType: 'negative',
    avatarInitials: 'DR',
  },
  {
    id: 't2',
    merchant: 'Salary credit',
    when: '12 Apr · 09:00',
    amountLabel: '₹1,00,000.00',
    amountType: 'positive',
    avatarInitials: 'SC',
  },
  {
    id: 't3',
    merchant: 'Swiggy',
    when: '11 Apr · 20:15',
    amountLabel: '₹428.50',
    amountType: 'negative',
    avatarInitials: 'SW',
  },
];
