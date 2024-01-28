import RangeDropList from "./range-drop-list";

export default {
  component: RangeDropList,
  title: "RangeDropList",
};

const Template = (args: any) => <RangeDropList {...args} />;

export const Range: any = Template.bind({});
Range.args = {
  label: "Range dropdown",
  min: 5,
  max: 150,
};
