import { useMemo, useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { CompactQuantityStepperWidget } from '../components/CompactQuantityStepperWidget';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { Radio } from '../components/Radio';
import { SegmentedControl } from '../components/SegmentedControl';
import { Tabs } from '../components/Tab';
import { TextField } from '../components/TextField';
import {
  ORDER_PAD_BALANCE,
  ORDER_PAD_DEFAULT_LIMIT,
  ORDER_PAD_EXCHANGES,
  ORDER_PAD_MAX_QTY,
  ORDER_PAD_MTF_PROMO,
  ORDER_PAD_REQUIRED_ESTIMATE,
  ORDER_PAD_SCRIP_NAME,
} from './orderPadMockData';
import './OrderPadPage.css';

export type OrderPadProduct = 'delivery' | 'intraday' | 'mtf';
export type OrderPadKind = 'regular' | 'stoploss' | 'sip';
export type OrderSide = 'buy' | 'sell';
export type OrderPadExecutionType = 'limit' | 'market';

export interface OrderPadPageProps {
  colorScheme?: 'light' | 'dark';
  onBack?: () => void;
}

export function OrderPadPage({
  colorScheme = 'dark',
  onBack,
}: OrderPadPageProps) {
  const headerIsDark = colorScheme === 'dark';

  const [side, setSide] = useState<OrderSide>('buy');
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE');
  const [product, setProduct] = useState<OrderPadProduct>('delivery');
  const [orderKind, setOrderKind] = useState<OrderPadKind>('regular');
  const [qty, setQty] = useState<number | string>(1);
  const [limitPrice, setLimitPrice] = useState(ORDER_PAD_DEFAULT_LIMIT);
  const [executionType, setExecutionType] =
    useState<OrderPadExecutionType>('limit');
  const [mtfPromoChecked, setMtfPromoChecked] = useState(false);
  const [depthOpen, setDepthOpen] = useState(false);

  const selectedQuote = useMemo(
    () => ORDER_PAD_EXCHANGES.find((e) => e.code === exchange),
    [exchange],
  );

  const productSegments = useMemo(
    () => [
      { value: 'delivery', label: 'Delivery' },
      { value: 'intraday', label: 'Intraday' },
      {
        value: 'mtf',
        label: (
          <span className="op-seg-mtf">
            <span className="op-seg-mtf__pay">Pay Later</span>
            <span className="op-seg-mtf__sub">(MTF - 4x)</span>
          </span>
        ),
      },
    ],
    [],
  );

  const orderTabs = useMemo(
    () => [
      { value: 'regular', label: 'Regular' },
      { value: 'stoploss', label: 'Stop-Loss' },
      { value: 'sip', label: 'SIP' },
    ],
    [],
  );

  const titleTrailing = (
    <div className="op-header-trail">
      <Badge type="text" context="live" label="LIVE" />
      <div className="op-buysell" role="group" aria-label="Order side">
        <button
          type="button"
          className={[
            'op-buysell__btn',
            side === 'buy' && 'op-buysell__btn--active op-buysell__btn--buy',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => setSide('buy')}
        >
          Buy
        </button>
        <button
          type="button"
          className={[
            'op-buysell__btn',
            side === 'sell' && 'op-buysell__btn--active op-buysell__btn--sell',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => setSide('sell')}
        >
          Sell
        </button>
      </div>
    </div>
  );

  return (
    <div className="order-pad">
      <div className="op-scroll">
        <Header
          key={colorScheme}
          type="large"
          title={ORDER_PAD_SCRIP_NAME}
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          showBackButton={Boolean(onBack)}
          onBack={onBack}
          showGradient={false}
          titleTrailing={titleTrailing}
          className="order-pad__header"
        />

        <div className="op-section op-section--exchange">
          <fieldset className="op-exchange-fieldset">
            <legend className="op-sr-only">Exchange</legend>
            {ORDER_PAD_EXCHANGES.map((ex) => (
              <div key={ex.code} className="op-exchange-row">
                <Radio
                  name="order-pad-exchange"
                  value={ex.code}
                  checked={exchange === ex.code}
                  onChange={() => setExchange(ex.code)}
                  label={`${ex.label} ${ex.ltpFormatted}`}
                  showLabel
                  labelEmphasis="high"
                />
              </div>
            ))}
          </fieldset>
        </div>

        <div className="op-section">
          <SegmentedControl
            segments={productSegments}
            value={product}
            onChange={(v) => setProduct(v as OrderPadProduct)}
            width="100%"
            className="op-segmented"
            ariaLabel="Product type"
          />
        </div>

        <div className="op-section op-section--tabs-edge">
          <Tabs
            tabs={orderTabs}
            value={orderKind}
            onChange={(v) => setOrderKind(v as OrderPadKind)}
            width="100%"
            className="op-tabs"
            size="medium"
          />
        </div>

        <div className="op-section">
          <Card className="op-order-card">
            <div className="op-qty-row">
              <div className="op-qty-row__labels">
                <span className="op-label">Quantity</span>
                <button
                  type="button"
                  className="op-link op-link--positive"
                >
                  Get Max Qty: {ORDER_PAD_MAX_QTY}
                </button>
              </div>
              <CompactQuantityStepperWidget
                value={qty}
                min={1}
                max={ORDER_PAD_MAX_QTY}
                onChange={setQty}
                className="order-pad__qty-stepper"
              />
            </div>

            <div className="op-limit-block">
              <div className="op-limit-block__head">
                <span className="op-label">Order type</span>
                <button
                  type="button"
                  className="op-limit-type"
                  role="switch"
                  aria-checked={executionType === 'limit'}
                  aria-label={
                    executionType === 'limit'
                      ? 'Limit price order. Toggle to market order.'
                      : 'Market order. Toggle to limit price.'
                  }
                  onClick={() =>
                    setExecutionType((t) =>
                      t === 'limit' ? 'market' : 'limit',
                    )
                  }
                >
                  <span className="op-limit-type__chevrons" aria-hidden>
                    <Icon
                      name="caret_small_down_main"
                      size={16}
                      className="op-limit-type__chev op-limit-type__chev--up"
                    />
                    <Icon
                      name="caret_small_down_main"
                      size={16}
                      className="op-limit-type__chev op-limit-type__chev--down"
                    />
                  </span>
                  <span className="op-limit-type__label">
                    {executionType === 'limit' ? 'Limit' : 'Market'}
                  </span>
                </button>
              </div>
              <div className="op-limit-field">
                <TextField
                  label={
                    executionType === 'limit'
                      ? 'Limit price'
                      : 'Market price'
                  }
                  value={
                    executionType === 'limit'
                      ? limitPrice
                      : (selectedQuote?.ltpFormatted ?? '—')
                  }
                  onChange={(e) => {
                    if (executionType === 'limit') {
                      setLimitPrice(e.target.value);
                    }
                  }}
                  readOnly={executionType === 'market'}
                  showLeadingIcon={false}
                  showTrailingIcon={false}
                  inputMode={
                    executionType === 'limit' ? 'decimal' : 'text'
                  }
                  autoComplete="off"
                  className={[
                    'op-limit-textfield',
                    executionType === 'market' &&
                      'op-limit-textfield--market',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="op-section">
          <Card className="op-depth-card">
            <button
              type="button"
              className="op-depth-trigger"
              aria-expanded={depthOpen}
              onClick={() => setDepthOpen((o) => !o)}
            >
              <span className="op-depth-trigger__label">Market Depth</span>
              <Icon
                name="caret_small_down_main"
                size={20}
                className={depthOpen ? 'op-depth-trigger__caret op-depth-trigger__caret--open' : 'op-depth-trigger__caret'}
              />
            </button>
            {depthOpen && (
              <div className="op-depth-placeholder" role="region" aria-label="Market depth">
                <p className="op-depth-placeholder__text">
                  Depth ladder will appear here when connected to live quotes.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <footer className="op-footer">
        <div className="op-footer__promo">
          <Checkbox
            state={mtfPromoChecked ? 'checked' : 'unchecked'}
            layout="block"
            label={ORDER_PAD_MTF_PROMO}
            showLabel
            onChange={(e) => setMtfPromoChecked(e.target.checked)}
          />
          <button type="button" className="op-footer__info" aria-label="About MTF promo">
            <Icon name="help" size={20} />
          </button>
        </div>
        <div className="op-footer__sums">
          <div className="op-footer__sum-row">
            <span className="op-footer__sum-label">Required</span>
            <span className="op-footer__sum-value op-footer__sum-value--primary">
              {ORDER_PAD_REQUIRED_ESTIMATE}
            </span>
          </div>
          <div className="op-footer__sum-row">
            <span className="op-footer__sum-label">Balance</span>
            <span className="op-footer__sum-value">{ORDER_PAD_BALANCE}</span>
            <button type="button" className="op-footer__refresh" aria-label="Refresh balance">
              <Icon name="arrow_clockwise_outline" size={20} />
            </button>
          </div>
        </div>
        <Button
          htmlType="button"
          variant="filled"
          size="large"
          label={side === 'buy' ? 'Buy' : 'Sell'}
          icon="none"
          className={[
            'op-footer__submit',
            side === 'sell' && 'op-footer__submit--sell',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {}}
        />
      </footer>
    </div>
  );
}

export default OrderPadPage;
