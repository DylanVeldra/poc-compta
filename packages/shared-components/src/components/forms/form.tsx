import { Button } from '../buttons';

interface FormProps {
  children: React.ReactNode;
  title?: string;
  submitLabel: string;
  inline?: boolean;
  onSubmit?: () => void;
  className?: string;
  buttonStyle?: string;
  marginTop?: number;
  buttonWidth?: number;
  noButton?: boolean;
}

export default function Form(props: FormProps) {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.onSubmit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        props.inline ? 'flex justify-between' : '' + ` ${props.className ?? ''}`
      }
    >
      {props.children}
      {!props.noButton && (
        <div className="w-full flex justify-center">
          <Button
            label={props.submitLabel}
            addClassName={props.buttonStyle + ` mt-[${props.marginTop}px]`}
            buttonWidth={props.buttonWidth}
          />
        </div>
      )}
    </form>
  );
}
