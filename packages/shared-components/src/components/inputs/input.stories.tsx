import Input from "./input";

export default {
  component: Input,
  title: "Input",
};

const Template = (args: any) => <Input {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  label: "Username",
  name: "username",
};

export const WithDefaultValue: any = Template.bind({});
WithDefaultValue.args = {
  label: "Username",
  name: "username",
  value: "John Doe",
};

export const CorrectValue: any = Template.bind({});
CorrectValue.args = {
  label: "Username",
  name: "username",
  value: "Correct value",
  isValueCorrect: true,
};

export const WrongValue: any = Template.bind({});
WrongValue.args = {
  label: "Username",
  name: "username",
  value: "Wrong value",
  isValueCorrect: false,
};
