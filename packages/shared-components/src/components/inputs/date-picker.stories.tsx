import DatePicker from "./date-picker";

export default {
  component: DatePicker,
  title: "DatePicker",
};

const Template = (args: any) => <DatePicker {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
