import PasswordVerification from "./password-verification";

export default {
  component: PasswordVerification,
  title: "PasswordVerification",
};

const Template = (args) => <PasswordVerification {...args} />;

export const Default = Template.bind({});
Default.args = {};
