import {
  Contract, ContractProvider, Sender, Address, Cell, beginCell, TupleBuilder
} from "@ton/core";
import { storeFinalize, loadTupleTrumpBiden } from "./wrappers";

export default class MyContract implements Contract {


  async getTotalBetA(provider: ContractProvider) {
    const { stack } = await provider.get("getTotalBetA", []);
    return stack.readBigNumber();
  }

  async getIsFinalized(provider: ContractProvider) {
    const { stack } = await provider.get("finalize", []);
    return stack.readBoolean();
  }

  async getGetTrumpBidenData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('getTrumpBidenData', builder.build())).stack;
    const result = loadTupleTrumpBiden(source);
    return result;
  }

  async sendTextMessage(provider: ContractProvider, via: Sender, message: string) {
    const messageBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail(message)
      .endCell();

    await provider.internal(via, {
      value: "0.2", // send 0.002 TON for gas
      body: messageBody
    })
  }

  async sendFinishBet(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell().store(storeFinalize({ $$type: "Finalize", outcome_a_wins: true })).endCell();

    await provider.internal(via, {
      value: "0.3", // send 0.002 TON for gas
      body: messageBody
    })
  }

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}

