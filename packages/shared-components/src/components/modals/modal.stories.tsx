import { Modal } from "./modal";

export default {
  component: Modal,
  title: "Modal",
};

const Template = (args: any) => <Modal {...args} />;

function Children() {
  return <p>This is the sample content of the modal</p>;
}

export const Default: any = Template.bind({});
Default.args = {
  title: "Title of the modal",
  subtitle:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  children: <Children />,
  isOpen: true,
};
