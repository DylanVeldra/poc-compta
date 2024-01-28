import Chip from "./chip";

export default {
  component: Chip,
  title: "Chip",
};

const Template = (args: any) => <Chip {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  step: 1,
};

export const Secondary: any = Template.bind({});
Secondary.args = {
  step: 1,
  type: "secondary",
};
