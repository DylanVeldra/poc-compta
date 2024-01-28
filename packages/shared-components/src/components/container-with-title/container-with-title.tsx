import { ReactNode } from "react";
import { Container } from "@shared-components/container";
import { LinkButton } from "@shared-components/buttons";
import { StepTitle } from "@shared-components/step-title";

interface ContainerWithTitleProps {
  children: ReactNode;
  step: number;
  title: string;
  buttonText?: string;
  onClick?: () => void;
  marginBottom?: boolean;
  noBorder?: boolean;
  overflowHidden?: boolean;
  fontWeight?: string;
}
export default function ContainerWithTitle(props: ContainerWithTitleProps) {
  return (
    <div>
      <StepTitle step={props.step} text={props.title} />
      <p
        className={`${
          props.buttonText ? "py-1" : "py-3"
        } flex justify-end text-sm`}
      >
        <LinkButton
          label={props.buttonText || ""}
          onClick={props.onClick}
          fontWeight={props.fontWeight}
        />
      </p>
      <Container
        noBorder={props.noBorder}
        marginBottom={props.marginBottom}
        overflowHidden={props.overflowHidden}
      >
        {props.children}
      </Container>
    </div>
  );
}
