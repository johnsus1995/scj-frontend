import { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useActiveMenu } from '@/hooks';
import { cn } from '@/lib/utils';
import CreateExam from '@/pages/create-exam';
import Editor from '@/pages/editor';
import TakeExam from '@/pages/takeExam';

const headerNavs = [
  {
    key: '/editor ',
    label: 'editor',
    element: <Editor />,
  },
  {
    key: '/take-exam',
    label: 'take-exam',
    element: <TakeExam />,
  },
  {
    key: '/create-exam',
    label: 'create-exam',
    element: <CreateExam />,
  },
];

const HeaderComponent = () => {
  const { checkActive } = useActiveMenu();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.overflowY = 'auto';
  }, [isOpen]);

  return (
    <header className="bg-secondary sticky top-0 w-full inset-x-0 z-30 h-16 shadow-xl flex items-center ">
      <div className="max-w-[1128px] w-full flex justify-between items-center m-auto px-2 md:px-4 relative">
        <h1 className="text-busanJames font-extrabold text-2xl">BUSAN JAMES</h1>
        <div className="hidden md:flex gap-3">
          {headerNavs.map((item) => (
            <Link key={item.key} to={item.key}>
              <span
                className={`uppercase font-bold text-sm px-4 py-2 ${
                  checkActive(item.key)
                    ? 'bg-slate-400 dark:bg-slate-700'
                    : 'bg-slate-300 dark:bg-slate-500'
                }  hover:bg-slate-400  dark:hover:bg-slate-700 rounded-md transition-all duration-150`}
              >
                {item.label}
              </span>
            </Link>
          ))}
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
