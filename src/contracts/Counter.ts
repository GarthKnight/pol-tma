import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";

export default class Counter implements Contract {


  async getTotalBetA(provider: ContractProvider) {
    const { stack } = await provider.get("getTotalBetA", []);
    return stack.readBigNumber();
  }

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}
}
