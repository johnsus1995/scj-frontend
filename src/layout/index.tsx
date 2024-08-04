import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import fallbackRender from './error-boundary/fallbackRender';
import HeaderComponent from './header';

const LayoutComponent = () => {
  return (
    <div className="w-full h-full">
      <HeaderComponent />
      <div className="p-2 md:px-4 md:pt-6 flex flex-col m-auto max-w-[1128px] h-full">
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

export default LayoutComponent;
