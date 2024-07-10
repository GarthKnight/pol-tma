import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import ChildContract, { Bet } from "./ChildContract";
import { Constants } from "./Constants";
import ParentContract from "./ParentContract";

async function getChildContract(addressString: string) {
    const contractAddress = Address.parse(addressString);
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    const contract = new ChildContract(contractAddress);
    const child = client.open(contract);
    return child
}

async function getParentContract() {
    const contractAddress = Address.parse(Constants.addressString);
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });
    const contract = new ParentContract(contractAddress);
    const parent = client.open(contract);
    return parent
}
//real data uncomment 
export async function fetchContracts() {
    const contract = await getParentContract();
    const addressMap = await contract.getGetAllAddresses();
    console.log("fetchContracts: ", addressMap.size.toString());
    return addressMap.values()
}

export async function fetchContractsWithData(active: boolean) {
    const contract = await getParentContract();
    const addressMap = await contract.getGetAllAddresses();
    console.log("fetchContracts: ", addressMap.size.toString());

    let result: Bet[] = [];

    for (const address of addressMap.values()) {
        console.log("fetchContracts: ", address.toString())

        const betInfo = await getBetInfo(address.toString())
        const isFinish = await getIsFinished(address.toString())

        console.log("is finish: ", isFinish)


        // if (active && betInfo.finishDate === BigInt(0)) {
        //     console.log("BET IS ACTIVE: ", betInfo.title)
            result.push({ $$type: "Bet", betInfo: betInfo, address: address })
        // }

        if (!active && betInfo.finishDate > BigInt(0)) {
            console.log("BET IS EXPIRED: ", betInfo.title)
            result.push({ $$type: "Bet", betInfo: betInfo, address: address })
        }
    }

    return result
}

export async function getIsFinished(address: string) {
    const contract = await getChildContract(address);
    const isFinished = await contract.getIsFinalized();
    console.log("getIsFinished:", isFinished.toString());
    return isFinished
}

export async function getBetInfo(address: string) {
    const contract = await getChildContract(address);

    const betInfo = await contract.getGetBetInfo();

    console.log("title:", betInfo.title);
    console.log("finish date:", betInfo.finishDate);

    return betInfo
}