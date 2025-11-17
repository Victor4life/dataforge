module dataforge::dataset_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::transfer;

    /// NFT representing dataset ownership/purchase
    public struct DatasetNFT has key, store {
        id: UID,
        dataset_id: vector<u8>,
        owner: address,
        purchase_price: u64,
        purchased_at: u64,
    }

    /// Mint NFT for dataset purchase
    public fun mint_purchase_nft(
        dataset_id: vector<u8>,
        owner: address,
        purchase_price: u64,
        ctx: &mut TxContext,
    ): DatasetNFT {
        DatasetNFT {
            id: object::new(ctx),
            dataset_id,
            owner,
            purchase_price,
            purchased_at: tx_context::epoch(ctx),
        }
    }

    /// Transfer NFT between users
    public fun transfer_nft(nft: DatasetNFT, to: address) {
        transfer::transfer(nft, to);
    }

    /// Get dataset ID from NFT
    public fun dataset_id(nft: &DatasetNFT): &vector<u8> {
        &nft.dataset_id
    }

    /// Get purchase price
    public fun purchase_price(nft: &DatasetNFT): u64 {
        nft.purchase_price
    }

    /// Burn NFT
    public fun burn(nft: DatasetNFT) {
        let DatasetNFT { id, dataset_id: _, owner: _, purchase_price: _, purchased_at: _ } = nft;
        object::delete(id);
    }
}
