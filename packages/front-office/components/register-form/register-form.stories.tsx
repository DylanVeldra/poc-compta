import RegisterForm from "./register-form";

const registerForm = {
  component: RegisterForm,
  title: "RegisterForm",
};

export default registerForm;

const Template = (args) => <RegisterForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
