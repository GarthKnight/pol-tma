import {
    Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, Builder,
} from "@ton/core";

export type Finalize = {

    $$type: 'Finalize';
    outcome_a_wins: boolean;
}

export function storeFinalize(src: Finalize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3527127190, 32);
        b_0.storeBit(src.outcome_a_wins);
    };
}
