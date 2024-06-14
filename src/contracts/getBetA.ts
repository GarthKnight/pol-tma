import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import MyContract from "./Counter";

const contractAddress = Address.parse("EQDrh9fzMhH0WIJdArEZHrjtm7arM532C0yssbYNaW-TX2_1");

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