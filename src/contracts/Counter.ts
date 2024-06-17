import {
  Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, Builder,
} from "@ton/core";
import { storeFinalize } from "./wrappers";

export default class MyContract implements Contract {


  async getTotalBetA(provider: ContractProvider) {
    const { stack } = await provider.get("getTotalBetA", []);
    return stack.readBigNumber();
  }

  async getIsFinalized(provider: ContractProvider) {
    const { stack } = await provider.get("finalize", []);
    return stack.readBoolean();
  }

  async sendBetOnA(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeUint(0, 32)
      .storeStringTail("1")
      .endCell();

    await provider.internal(via, {
      value: "0.2", // send 0.002 TON for gas
      body: messageBody
    })
  }

  async sendFinishBet(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell().store(storeFinalize({ $$type: "Finalize", outcome_a_wins: true })).endCell();

    await provider.internal(via, {
      value: "0.2", // send 0.002 TON for gas
      body: messageBody
    })
  }

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}