import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import './LoginPage.css';

export interface LoginPageProps {
  colorScheme?: 'light' | 'dark';
  /** Back control — e.g. return to previous shell screen */
  onBack?: () => void;
  /** Create account — e.g. navigate to sign up */
  onNavigateToSignUp?: () => void;
}

export const LoginPage = ({
  colorScheme = 'dark',
  onBack,
  onNavigateToSignUp,
}: LoginPageProps) => {
  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-page">
      <div className="login-page__content">
        <Header
          key={colorScheme}
          type="large"
          title="Log in"
          subtitle="Use your registered mobile number or email"
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          showBackButton
          onBack={onBack}
          showGradient={false}
          className="login-page__header"
        />

        <div className="login-page__body">
          <div className="login-page__brand">
            <BrandLogo theme={brandLogoTheme} size={40} alt="Paytm Money" />
          </div>

          <Card className="login-page__card">
            <form
              className="login-page__form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
            >
              <TextField
                emphasis="high"
                label="Mobile or email"
                type="email"
                name="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                emphasis="high"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                showTrailingIcon
                trailingIcon="eye_open_filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="login-page__submit">
                <Button
                  htmlType="submit"
                  variant="filled"
                  size="large"
                  label="Log in"
                  icon="none"
                />
              </div>
            </form>
          </Card>

          <div className="login-page__links">
            <Button
              htmlType="button"
              variant="link"
              size="medium"
              label="Forgot password?"
              icon="none"
            />
            <div className="login-page__row">
              <span className="login-page__muted">New to Paytm Money?</span>
              <Button
                htmlType="button"
                variant="link"
                size="medium"
                label="Create account"
                icon="none"
                onClick={onNavigateToSignUp}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
