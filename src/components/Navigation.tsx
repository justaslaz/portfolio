import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks/useDebounce';

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
      <nav className="flex gap-2 justify-self-start lg:col-start-2 lg:justify-self-center">
        <a
          href="#projects"
          className="cursor-pointer rounded-md border-2 border-violet-400 px-4 py-1 font-medium shadow-sm transition-all duration-300 hover:bg-violet-400 hover:text-violet-50 hover:shadow-md"
        >
          Projects
        </a>
        <a
          href="#experience"
          className="cursor-pointer rounded-md border-2 border-violet-400 px-4 py-1 font-medium shadow-sm transition-all duration-300 hover:bg-violet-400 hover:text-violet-50 hover:shadow-md"
        >
          Experience
        </a>
        <a
          href="#contact"
          className="cursor-pointer rounded-md border-2 border-violet-400 px-4 py-1 font-medium shadow-sm transition-all duration-300 hover:bg-violet-400 hover:text-violet-50 hover:shadow-md"
        >
          Contact
        </a>
      </nav>

      <div className="flex place-items-center gap-1 justify-self-end lg:col-start-3">
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
