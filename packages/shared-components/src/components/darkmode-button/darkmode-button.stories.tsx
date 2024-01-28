import DarkmodeButton from "./darkmode-button";

export default {
  component: DarkmodeButton,
  title: "DarkmodeButton",
};

const Template = (args: any) => <DarkmodeButton {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
