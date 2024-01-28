import PhoneInput from "./phone-input";

export default {
  component: PhoneInput,
  title: "PhoneInput",
};

const Template = (args: any) => <PhoneInput {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  label: "Phone number",
  name: "Phoner number",
};
