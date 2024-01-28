import Button from "./button";

export default {
  component: Button,
  title: "Button",
};

const Template = (args: any) => <Button {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  label: "Default button",
};

export const Disabled: any = Template.bind({});
Disabled.args = {
  disabled: true,
  label: "Disabled button",
};

export const Link: any = Template.bind({});
Link.args = {
  type: "link",
  label: "Link button",
};

export const DisabledLink: any = Template.bind({});
DisabledLink.args = {
  type: "link",
  disabled: true,
  label: "Disabled link button",
};

export const Secondary: any = Template.bind({});
Secondary.args = {
  label: "Secondary button",
  type: "secondary",
};

export const SecondaryDisabled: any = Template.bind({});
SecondaryDisabled.args = {
  label: "Disabled secondary button",
  disabled: true,
  type: "secondary",
};
