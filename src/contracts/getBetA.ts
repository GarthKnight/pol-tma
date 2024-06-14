import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import MyContract from "./Counter";
import { Constants } from "./constants";

const contractAddress = Address.parse(Constants.addressString);

export async function getTotalBetA() {
  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  // open Counter instance by address
  // replace with your address from step 8
  const counter = new MyContract(contractAddress);
  const counterContract = client.open(counter);

  // call the getter on chain
  const counterValue = await counterContract.getTotalBetA();
  console.log("value:", counterValue.toString());
}