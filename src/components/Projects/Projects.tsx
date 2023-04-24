import { Popover } from '@headlessui/react';
import projects from '../../data/projects';
import Title from '../Title';
import ProjectItem from './ProjectItem';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  return (
    <div
      id="projects"
      className="mb-20 flex scroll-mt-20 flex-col items-center justify-center"
    >
      <Title>Projects</Title>
      <div className="flex w-11/12 max-w-7xl flex-wrap items-center justify-center gap-4">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            id={project.id}
            title={project.title}
            imgUrl={project.imgUrl}
            projectUrl={project.projectUrl}
            languagesAndTools={project.languagesAndTools}
            isNew={project.isNew}
          />
        ))}

        <Popover className="relative flex basis-96 justify-center p-6">
          <Popover.Button className="flex items-center gap-3 rounded-md bg-gray-200 px-3 py-1.5 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:bg-gray-300 hover:shadow-md focus:outline-none dark:bg-gray-700 dark:ring-white/5 dark:hover:bg-gray-600">
            <span>What's next?</span>
            <ChevronDownIcon className="h-4 w-4" />
          </Popover.Button>

          <Popover.Panel className="absolute top-0 z-10 w-full rounded-md bg-white p-4 shadow-md ring-1 ring-gray-900/5 dark:bg-gray-700 dark:ring-white/5">
            <h3 className="mb-2 font-semibold">Redo Food Recipes Website</h3>
            <p className="text-sm">
              Using React,{' '}
              <strong className="font-medium dark:font-bold">
                Next.JS, Firebase
              </strong>
              , TypeScript and Tailwind CSS.
            </p>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
}
