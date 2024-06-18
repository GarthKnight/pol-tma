import {
  Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, Builder,
  TupleBuilder,
  TupleReader,
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

  async getGetTrumpBidenData(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('getTrumpBidenData', builder.build())).stack;
    const result = loadTupleTrumpBiden(source);
    return result;
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
      value: "0.3", // send 0.002 TON for gas
      body: messageBody
    })
  }

  constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) { }
}

function loadTupleTrumpBiden(source: TupleReader) {
  let _bet_a_name = source.readString();
  let _bet_b_name = source.readString();
  let _image = source.readString();
  let _odds_a = source.readBigNumber();
  let _odds_b = source.readBigNumber();
  return { $$type: 'TrumpBiden' as const, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b };
}