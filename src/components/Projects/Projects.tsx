import projects from '../../data/projects';
import Title from '../Title';
import ProjectItem from './ProjectItem';

export default function Projects() {
  return (
    <div
      id="projects"
      className="mb-20 flex scroll-mt-20 flex-col items-center justify-center"
    >
      <Title>Projects</Title>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </div>
  );
}
