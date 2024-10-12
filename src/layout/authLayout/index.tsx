import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import fallbackRender from '../error-boundary/fallbackRender';
import ScjLogo from '@/assets/images/scjLogo.png';

const AuthLayout = () => {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <img
        src={ScjLogo}
        alt="scj-logo"
        className="hidden md:block md:max-w-[400px] m-auto"
      />
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <span>Loading...</span>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default AuthLayout;
