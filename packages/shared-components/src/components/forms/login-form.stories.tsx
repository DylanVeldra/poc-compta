import LoginForm from "./login-form";

export default {
  component: LoginForm,
  title: "LoginForm",
};

const Template = (args: any) => <LoginForm {...args} />;

export const Default: any = Template.bind({});
Default.args = {};
