import Form from "./form";
import { Input } from "../inputs";

export default {
  component: Form,
  title: "Form",
};

const Template = (args: any) => <Form {...args} />;

function Children() {
  return (
    <>
      <Input label="First Name" name="firstname" onChange={() => {}} />
      <Input label="Last Name" name="lastname" onChange={() => {}} />
    </>
  );
}

export const Default: any = Template.bind({});
Default.args = {
  children: <Children />,
  submitLabel: "Register!",
};

export const Inline: any = Template.bind({});
Inline.args = {
  children: <Children />,
  inline: true,
  submitLabel: "Give my name!",
};
