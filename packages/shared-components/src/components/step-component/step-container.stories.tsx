import StepContainer from "./step-container";
import { Input } from "../inputs";

export default {
  component: StepContainer,
  title: "StepContainer",
};

const Template = (args: any) => <StepContainer {...args} />;

function Children() {
  return (
    <>
      <Input label="First Name" name="firstname" onChange={() => {}} />
      <Input label="Last Name" name="lastname" onChange={() => {}} />
    </>
  );
}

export const Default: any = Template.bind({});
Default.args = {
  step: 1,
  title: "This is a sample title",
};

export const WithChildren: any = Template.bind({});
WithChildren.args = {
  step: 50,
  title: "This is a sample title",
  children: <Children />,
};
