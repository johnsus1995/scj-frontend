import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import fallbackRender from '../error-boundary/fallbackRender';

const AuthLayout = () => {
  return (
    <div className="w-full h-full">
      {/* <HeaderComponent /> */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center h-full">
        <div className="left bg-red-500 w-full">left</div>
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
    </div>
  );
};

export default AuthLayout;
