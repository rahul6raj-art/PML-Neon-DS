import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import './SignUpPage.css';

export interface SignUpPageProps {
  colorScheme?: 'light' | 'dark';
  onBack?: () => void;
  /** Navigate to log in (e.g. shell switches to login screen) */
  onLogIn?: () => void;
}

export const SignUpPage = ({
  colorScheme = 'dark',
  onBack,
  onLogIn,
}: SignUpPageProps) => {
  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="sign-up-page">
      <div className="sign-up-page__content">
        <Header
          key={colorScheme}
          type="large"
          title="Create account"
          subtitle="Enter your details to open a Paytm Money account"
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          showBackButton
          onBack={onBack}
          showGradient={false}
          className="sign-up-page__header"
        />

        <div className="sign-up-page__body">
          <div className="sign-up-page__brand">
            <BrandLogo theme={brandLogoTheme} size={40} alt="Paytm Money" />
          </div>

          <Card className="sign-up-page__card">
            <form
              className="sign-up-page__form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
            >
              <TextField
                emphasis="high"
                label="Full name"
                type="text"
                name="name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                emphasis="high"
                label="Mobile or email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                emphasis="high"
                label="Password"
                type="password"
                name="new-password"
                autoComplete="new-password"
                showTrailingIcon
                trailingIcon="eye_open_filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                emphasis="high"
                label="Confirm password"
                type="password"
                name="confirm-password"
                autoComplete="new-password"
                showTrailingIcon
                trailingIcon="eye_open_filled"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="sign-up-page__submit">
                <Button
                  htmlType="submit"
                  variant="filled"
                  size="large"
                  label="Create account"
                  icon="none"
                />
              </div>
            </form>
          </Card>

          <div className="sign-up-page__links">
            <div className="sign-up-page__row">
              <span className="sign-up-page__muted">Already have an account?</span>
              <Button
                htmlType="button"
                variant="link"
                size="medium"
                label="Log in"
                icon="none"
                onClick={onLogIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
