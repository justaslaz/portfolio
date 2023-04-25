interface Props {
  id: string;
  position: string;
  company: string;
  years: string;
  duration: string;
  details: string[];
}

function ExperienceItem({
  position,
  company,
  years,
  duration,
  details,
}: Props) {
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-1 text-xs sm:flex-row sm:flex-wrap sm:gap-4 md:text-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-violet-500 px-2 py-1 font-semibold text-violet-50">
            {years}
          </span>
          <h3 className="text-lg font-semibold tracking-wide">{position}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-400">{company}</p>
        <p className="text-gray-400 dark:text-gray-500">{duration}</p>
      </div>
      <ul className="my-2 mb-12 list-inside list-disc marker:text-violet-400 dark:marker:text-violet-500">
        {details.map((detail) => (
          <li className="text-base font-normal" key={Math.random().toString()}>
            {detail}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ExperienceItem;
