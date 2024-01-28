import TwoFactorAuthForm from "./two-factor-auth-form";
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const twoFactorAuthForm = {
  component: TwoFactorAuthForm,
  title: "TwoFactorAuthForm",
}
export default twoFactorAuthForm;

const Template = (args) => <TwoFactorAuthForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  oauthCode: "",
};

export const WithSecretKey = Template.bind({});
WithSecretKey.args = {
  oauthCode: "",
  secretKey: "This is my wonderful secret key.",
  isCodeValidated: true,
};
