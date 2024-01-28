import DropList from "./drop-list";

export default {
  component: DropList,
  title: "DropList",
};

const Template = (args: any) => <DropList {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  label: "Default dropdown",
  list: ["elem 1", "elem 2", "elem 3"],
};
