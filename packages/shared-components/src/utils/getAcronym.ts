export function getAcronym(protocolName: string) {
  const protocolMapName: Record<string, string> = {
    ERC20: "ETH",
    BEP20: "BSC",
  };
  return protocolMapName[protocolName] || "N/A";
}
