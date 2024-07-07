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

// export async function fetchContractsWithData() {
//     const contract = await getParentContract();
//     const addressMap = await contract.getGetAllAddresses();
//     console.log("fetchContracts: ", addressMap.size.toString());

//     let result: Bet[] = [];

//     for (const address of addressMap.values()) {
//         const betInfo = await getBetInfo(address.toString());
//         result.push({ $$type: "Bet", betInfo: betInfo, address: address })

//     }

//     return result
// }


// mock - delete later
export async function fetchContractsWithData() {
    // Simulating an API call
    return new Promise<Bet[]>(resolve => {
        setTimeout(() => {
            resolve([
                {
                    $$type: "Bet", betInfo: {
                        $$type: "BetInfo",
                        title: "Убивал?",
                        source: "чбу",
                        bet_a_name: "Никого не убивал",
                        bet_b_name: "Не убивал никого",
                        image: "https://cv1.pikabu.ru/video/2020/08/23/1598196532275948306_640x640.jpg",
                        odds_a: 1280n,
                        odds_b: 488n,
                        finishDate: -1n,
                        total_bet_a: 228228n,
                        total_bet_b: 1488n
                    }, address: Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM")
                }
            ]);
        }, 2000); // 2 second delay
    });
};

export async function getIsFinished(address: string) {
    const contract = await getChildContract(address);
    const counterValue = await contract.getIsFinalized();
    console.log("getIsFinished:", counterValue.toString());
}

export async function getBetInfo(address: string) {
    const contract = await getChildContract(address);

    const betInfo = await contract.getGetBetInfo();

    console.log("value:", betInfo.title);
    console.log("value:", betInfo.source);
    console.log("value:", betInfo.bet_a_name);
    console.log("value:", betInfo.bet_b_name);
    console.log("value:", betInfo.image);
    console.log("value:", betInfo.odds_a);
    console.log("value:", betInfo.odds_b);

    return betInfo
}