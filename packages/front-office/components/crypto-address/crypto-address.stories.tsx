import CryptoNetwork from "./crypto-address";

const cryptoNetwork = {
  component: CryptoNetwork,
  title: "CryptoNetwork",
};

export default cryptoNetwork;

const Template = (args) => <CryptoNetwork {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Etherum",
  code: "ERC20",
  logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=022",
  fees: 20,
};

export const Default2 = Template.bind({});
Default2.args = {
  name: "Bitcoin",
  code: "BTC10",
  logoUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=022",
  fees: 55,
};
