export function getTokenLogoUrl(token: string) {
  const logoMapName: Record<string, string> = {
    USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    USDC: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    BUSD: "https://cryptologos.cc/logos/binance-usd-busd-logo.png",
  };

  return logoMapName[token] || "";
}
