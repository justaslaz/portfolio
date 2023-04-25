interface Props {
  children?: React.ReactNode;
}

export default function Title({ children }: Props) {
  return (
    <h2 className="mb-10 text-center text-xl font-bold uppercase tracking-wide">
      {children}
    </h2>
  );
}
