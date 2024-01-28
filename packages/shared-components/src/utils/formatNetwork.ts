export function formatNetwork(protocolName: string) {
  const protocolMapName: Record<string, string> = {
    ERC20: "Etherum",
    BEP20: "Binance Smart Chain",
  };
  return protocolMapName[protocolName] || "N/A";
}
