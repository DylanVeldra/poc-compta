import Title from "./title";

export default {
  component: Title,
  title: "Title",
};

const Template = (args: any) => <Title {...args} />;

export const Default: any = Template.bind({});
Default.args = { title: "This is a sample title" };

export const WithSubtitle: any = Template.bind({});
WithSubtitle.args = {
  title: "This is a sample title...",
  subtitle: "... with a sample subtitle",
};
