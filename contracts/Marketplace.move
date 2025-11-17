module dataforge::marketplace {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use dataforge::dataset_nft;

    /// Marketplace state
    public struct Marketplace has key {
        id: UID,
        treasury: Coin<SUI>,
        total_volume: u64,
        platform_fee_percent: u64,
    }

    /// Purchase event
    public struct Purchase has copy, drop {
        buyer: address,
        seller: address,
        dataset_id: vector<u8>,
        price: u64,
        platform_fee: u64,
        royalty: u64,
    }

    /// Initialize marketplace
    public fun init(ctx: &mut TxContext) {
        let marketplace = Marketplace {
            id: object::new(ctx),
            treasury: coin::zero<SUI>(ctx),
            total_volume: 0,
            platform_fee_percent: 10, // 10% platform fee
        };
        transfer::share_object(marketplace);
    }

    /// Purchase dataset
    public fun purchase_dataset(
        marketplace: &mut Marketplace,
        dataset_id: vector<u8>,
        seller: address,
        price: u64,
        mut payment: Coin<SUI>,
        ctx: &mut TxContext,
    ) {
        let buyer = tx_context::sender(ctx);

        // Calculate fees
        let platform_fee = (price * marketplace.platform_fee_percent) / 100;
        let creator_share = price - platform_fee;

        // Split coin for fees and seller payment
        let fee_coin = coin::split(&mut payment, platform_fee, ctx);
        let seller_payment = coin::split(&mut payment, creator_share, ctx);

        // Add fees to treasury
        coin::join(&mut marketplace.treasury, fee_coin);

        // Transfer payment to seller
        transfer::public_transfer(seller_payment, seller);

        // Mint purchase NFT for buyer
        let nft = dataset_nft::mint_purchase_nft(dataset_id, buyer, price, ctx);
        transfer::public_transfer(nft, buyer);

        // Update marketplace state
        marketplace.total_volume = marketplace.total_volume + price;

        // Emit event
        event::emit(Purchase {
            buyer,
            seller,
            dataset_id,
            price,
            platform_fee,
            royalty: creator_share,
        });
    }

    /// Withdraw treasury funds (admin only)
    public fun withdraw_treasury(
        marketplace: &mut Marketplace,
        amount: u64,
        ctx: &TxContext,
    ): Coin<SUI> {
        coin::split(&mut marketplace.treasury, amount, ctx)
    }

    /// Get marketplace stats
    public fun total_volume(marketplace: &Marketplace): u64 {
        marketplace.total_volume
    }
}
