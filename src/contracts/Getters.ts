import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import MyContract from "./MainContract";
import { Constants } from "./Constants";

const contractAddress = Address.parse(Constants.addressString);

export async function getIsFinished() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // open Counter instance by address
    // replace with your address from step 8
    const counter = new MyContract(contractAddress);
    const counterContract = client.open(counter);

    // call the getter on chain
    const counterValue = await counterContract.getIsFinalized();
    console.log("value 2:", counterValue.toString());
}

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

export async function getGetTrumpBidenData() {
    // initialize ton rpc client on testnet
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    // open Counter instance by address
    // replace with your address from step 8
    const counter = new MyContract(contractAddress);
    const counterContract = client.open(counter);

    // call the getter on chain
    const trump = await counterContract.getGetTrumpBidenData();

    console.log("value:", trump.bet_a_name);
    console.log("value:", trump.bet_b_name);
    console.log("value:", trump.image);
    console.log("value:", trump.odds_a);
    console.log("value:", trump.odds_b);
}