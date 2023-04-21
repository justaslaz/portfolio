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
      <div className="flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm">
        <span className="inline-block rounded-md bg-violet-500 px-2 py-1 font-semibold text-violet-50">
          {years}
        </span>
        <h3 className="text-lg font-semibold tracking-wide">{position}</h3>
        <p className="text-gray-700 dark:text-gray-400">{company}</p>
        <p className="text-gray-400 dark:text-gray-500">{duration}</p>
      </div>
      <ul className="my-2 mb-8 list-inside list-disc marker:text-violet-400 dark:marker:text-violet-500">
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
