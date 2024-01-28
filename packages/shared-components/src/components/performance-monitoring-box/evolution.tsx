import { useEffect, useState } from 'react';

type EvolutionProps = {
  before: number;
  after: number;
};

export default function Evolution(props: EvolutionProps) {
  const [evolution, setEvolution] = useState(0);

  useEffect(() => {
    setEvolution(props.after - props.before);
  }, [props.before, props.after]);

  return (
    <div
      className={`whitespace-nowrap w-fit h-fit px-[7px] py-[4px] rounded-sm ${
        evolution >= 0 ? 'bg-light-green' : 'bg-light-red'
      } ${isFinite(evolution) ? '' : 'invisible'}`}
    >
      <p
        className={`font-roboto text-sm font-light ${
          evolution >= 0 ? 'text-green' : 'text-red'
        }`}
      >
        {evolution >= 0 ? '+' : '-'} {Math.abs(evolution).toFixed(1)}%
      </p>
    </div>
  );
}
