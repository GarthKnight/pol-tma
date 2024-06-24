import {
    Contract, ContractProvider, Sender, Address, Cell, beginCell, TupleBuilder,
    Dictionary
} from "@ton/core";
import { BetInfoInit, storeBetInfoInit } from "./wrappers";

export default class ParentContract implements Contract {

    async getGetAllAddresses(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAllAddresses', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
        return result;
    }

    //Should be in private admin console 
    async sendNewBet(provider: ContractProvider, via: Sender, betInfo: BetInfoInit) {
        const messageBody = beginCell().store(storeBetInfoInit(betInfo)).endCell();

        await provider.internal(via, {
            value: "0.004", // send 0.004 TON for gas
            body: messageBody
        })

    }

    constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}

