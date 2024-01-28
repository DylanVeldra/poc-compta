import { fetchJSON } from "@shared-utils";

export async function getAddressList() {
  const addresses = await (await fetchJSON("/address/enabled")).body;
  return addresses;
}
