interface Props {
  id: string;
  title: string;
  imgUrl: string;
  projectUrl: string;
  languagesAndTools: string[];
  isNew: boolean;
}

export default function ProjectItem({
  title,
  imgUrl,
  projectUrl,
  languagesAndTools,
  isNew,
}: Props) {
  return (
    <a
      target="_blank"
      href={projectUrl}
      className="basis-96 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-700"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          className="h-48 w-full object-cover transition-all duration-500 ease-in-out hover:scale-110"
        />
      </figure>

      <div className="flex w-full flex-col gap-2 p-4 md:gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
          {isNew && (
            <span className="animate-pulse rounded-lg bg-green-600 px-2 py-1 text-xs font-medium uppercase tracking-wide text-white">
              New
            </span>
          )}
        </div>
        <p className="flex flex-row flex-wrap items-center justify-start gap-2 text-xs md:text-sm">
          {languagesAndTools.map((tool) => (
            <span
              className="inline-block rounded-md border-2 border-violet-400 px-2 py-1 font-semibold"
              key={Math.random().toString()}
            >
              {tool}
            </span>
          ))}
        </p>
      </div>
    </a>
  );
}
