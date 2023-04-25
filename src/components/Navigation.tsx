import { useEffect, useState } from 'react';
import { Menu, Switch, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks/useDebounce';

const navLinks = [
  { title: 'Projects', href: '#projects' },
  { title: 'Experience', href: '#experience' },
  { title: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavShown, setIsNavShown] = useState(true);

  ////////////////////
  // Navigation - show OR hide:
  const scrollPosHandler = () => {
    // user scrolls up - nav hidden
    if (window.scrollY < lastScrollY) {
      setIsNavShown(false);
    }
    // user scrolls down OR page is on top - nav shown
    if (window.scrollY >= lastScrollY || window.scrollY < 80) {
      setIsNavShown(true);
    }
    setLastScrollY(window.scrollY);
  };
  const debouncedScrollPosHandler = useDebounce(
    scrollPosHandler,
    500,
    'leading',
    'trailing'
  );

  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollPosHandler);
    return () =>
      window.removeEventListener('scroll', debouncedScrollPosHandler);
  }, [debouncedScrollPosHandler]);

  ////////////////////
  // Theme - light OR dark:
  const darkModeHandler = () => {
    setIsDarkMode((curState) => !curState);
  };

  // Initial state based on user settings
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Adding/removing 'dark' class for Tailwind selection
  useEffect(
    () =>
      isDarkMode
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark'),
    [isDarkMode]
  );

  return (
    <div
      className={`sticky top-0 z-20 grid w-full grid-cols-2 place-items-center gap-6 border-b-2 bg-violet-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-700 lg:grid-cols-3 ${
        isNavShown
          ? 'translate-y-0 transition-transform duration-500 ease-in-out'
          : '-translate-y-full transition-transform duration-500 ease-in-out'
      }`}
    >
      <nav className="hidden sm:flex sm:gap-2 sm:justify-self-start lg:col-start-2 lg:justify-self-center">
        {navLinks.map((navLink) => (
          <a
            key={navLink.title}
            href={navLink.href}
            className="cursor-pointer rounded-md border-2 border-violet-400 px-4 py-1 font-medium shadow-sm transition-all duration-300 hover:bg-violet-400 hover:text-violet-50 hover:shadow-md"
          >
            {navLink.title}
          </a>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <Menu as="div" className="relative justify-self-start sm:hidden">
        <Menu.Button>
          <Bars3Icon className="ui-open:hidden h-7 w-7" />
          <XMarkIcon className="ui-not-open:hidden h-7 w-7" />
        </Menu.Button>
        <Transition
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          enter="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          leave="transition duration-75 ease-out"
        >
          <Menu.Items className="absolute flex flex-col gap-4 rounded-md bg-gray-50/95 p-3 text-sm shadow-lg">
            {navLinks.map((navLink) => (
              <Menu.Item
                as="a"
                key={navLink.title}
                href={navLink.href}
                className="transition-colors hover:text-violet-500"
              >
                {navLink.title}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="col-start-2 flex place-items-center gap-1 justify-self-end lg:col-start-3">
        <SunIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        <Switch
          checked={isDarkMode}
          onChange={darkModeHandler}
          className="ui-checked:bg-violet-500 relative inline-flex h-5 w-10 items-center rounded-full bg-violet-400"
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <span className="ui-checked:translate-x-5 ui-checked:bg-violet-200 inline-block h-4 w-4 translate-x-1 transform rounded-full bg-violet-50 transition"></span>
        </Switch>
        <MoonIcon className="text h-5 w-5 text-indigo-900 dark:text-indigo-500" />
      </div>
    </div>
  );
}
