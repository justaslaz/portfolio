import experience from '../../data/experience';
import Title from '../Title';
import ExperienceItem from './ExperienceItem';

export default function Experience() {
  return (
    <div
      id="experience"
      className="mx-8 mb-20 flex scroll-mt-20 flex-col items-center justify-center"
    >
      <div className="w-full md:w-3/4 lg:w-1/2">
        <Title>Experience</Title>
        {experience
          .slice()
          .reverse()
          .map((exp) => (
            <ExperienceItem
              key={exp.id}
              id={exp.id}
              position={exp.position}
              company={exp.company}
              years={exp.years}
              duration={exp.duration}
              details={exp.details}
            />
          ))}
      </div>
    </div>
  );
}
