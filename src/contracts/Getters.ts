import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import ChildContract from "./ChildContract";
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
// export async function fetchContracts() {
//     const contract = await getParentContract();
//     const addressMap = await contract.getGetAllAddresses();
//     console.log("fetchContracts: ", addressMap.size.toString());
//     return addressMap.values
// }

//mock - delete later
export async function fetchContracts() {
    // Simulating an API call
    return new Promise<Address[]>(resolve => {
        setTimeout(() => {
            resolve([
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM"),
                Address.parse("EQC8PZ6eph5sE8G3xpStA4fGJdsIrxc1uI0NioP_n-X0L-pM")
            ]);
        }, 2000); // 2 second delay
    });
};

export async function getIsFinished(address: string) {
    const contract = await getChildContract(address);
    const counterValue = await contract.getIsFinalized();
    console.log("getIsFinished:", counterValue.toString());
}

export async function getChildContractData(address: string) {
    const contract = await getChildContract(address);

    const betInfo = await contract.getGetBetInfo();
    const odd_a = await contract.getGetoddA();
    const odd_b = await contract.getGetoddB();

    const result = {
        $$type: "ChildContractData",
        title: betInfo.title,
        source: betInfo.source,
        bet_a_name: betInfo.bet_a_name,
        bet_b_name: betInfo.bet_b_name,
        image: betInfo.image,
        odd_a: odd_a,
        odd_b: odd_b
    }

    console.log("value:", betInfo.title);
    console.log("value:", betInfo.source);
    console.log("value:", betInfo.bet_a_name);
    console.log("value:", betInfo.bet_b_name);
    console.log("value:", betInfo.image);
    console.log("value:", odd_a);
    console.log("value:", odd_b);

    return result
}