import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell } from "@ton/core";

export default class MyContract implements Contract {


  async getTotalBetA(provider: ContractProvider) {
    const { stack } = await provider.get("getTotalBetA", []);
    return stack.readBigNumber();
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


  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}
