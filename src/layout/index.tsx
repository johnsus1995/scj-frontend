import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import fallbackRender from './error-boundary/fallbackRender';
import HeaderComponent from './header';
import LeftSidebar from './leftSidebar';

const LayoutComponent = () => {
  return (
    <div className="w-full overflow-y-auto">
      <HeaderComponent />
      <div className="md:px-4 flex flex-col m-auto max-w-[1128px] h-full">
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }
          >
            <div className="flex h-[calc(100vh-64px)]">
              <LeftSidebar />
              <Outlet />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default LayoutComponent;
