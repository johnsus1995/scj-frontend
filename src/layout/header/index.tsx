import { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AllExams from '@/pages/allExams';

const headerNavs = [
  {
    key: '/exams',
    label: 'Exams',
    element: <AllExams />,
  },
];

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.overflowY = 'auto';
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('scj-tok');
    navigate('/auth/login');
  };

  return (
    <header className="bg-secondary sticky top-0 w-full inset-x-0 z-30 h-16 shadow-xl flex items-center ">
      <div className="max-w-[1128px] w-full flex justify-between items-center m-auto px-2 md:px-4 relative">
        <h1 className="text-busanJames font-extrabold text-2xl">BUSAN JAMES</h1>
        <div className="hidden md:flex gap-3 items-center">
          {headerNavs.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className="text-sm hover:bg-busanJames p-1 hover:text-white rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <Button className="p-1 h-fit" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div
          className={cn(
            'bg-gray-200 w-full h-[93dvh] absolute top-[48px] left-0 hidden',
            {
              'hide-body-scroll block': isOpen,
            },
          )}
        >
          <nav className="list-none mt-5 ml-5 flex flex-col gap-3 text-2xl font-bold">
            <Link onClick={() => setIsOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/editor">
              Editor
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/exams">
              Exams
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/announcements">
              Announcements
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/jss">
              JSS
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setIsOpen(false)} to="/logout">
              Logout
            </Link>
          </nav>
        </div>

        <Menu
          className={cn('w-8 h-8 md:hidden', {
            hidden: isOpen,
          })}
          onClick={() => setIsOpen(true)}
        />
        <X
          className={cn('w-8 h-8 md:hidden', {
            hidden: !isOpen,
          })}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </header>
  );
};

export default HeaderComponent;
