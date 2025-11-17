module dataforge::dataset_registry {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::table::Table;
    use sui::table;
    use sui::object::ID;
    use sui::event;

    /// Dataset object stored on-chain
    public struct Dataset has key, store {
        id: UID,
        creator: address,
        name: vector<u8>,
        description: vector<u8>,
        price: u64,
        walrus_cid: vector<u8>,
        seal_proof: vector<u8>,
        metadata: vector<u8>,
        created_at: u64,
        is_active: bool,
    }

    /// Dataset registry to store all datasets
    public struct DatasetRegistry has key {
        id: UID,
        datasets: Table<ID, Dataset>,
        total_datasets: u64,
    }

    /// Events
    public struct DatasetCreated has copy, drop {
        dataset_id: ID,
        creator: address,
        price: u64,
    }

    public struct DatasetUpdated has copy, drop {
        dataset_id: ID,
        new_price: u64,
    }

    public struct DatasetDeleted has copy, drop {
        dataset_id: ID,
    }

    /// Initialize the registry
    public fun init(ctx: &mut TxContext) {
        let registry = DatasetRegistry {
            id: object::new(ctx),
            datasets: table::new(ctx),
            total_datasets: 0,
        };
        sui::transfer::share_object(registry);
    }

    /// Register a new dataset
    public fun register_dataset(
        registry: &mut DatasetRegistry,
        name: vector<u8>,
        description: vector<u8>,
        price: u64,
        walrus_cid: vector<u8>,
        seal_proof: vector<u8>,
        metadata: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let dataset_id = object::new(ctx);
        let id = object::uid_to_inner(&dataset_id);

        let dataset = Dataset {
            id: dataset_id,
            creator: tx_context::sender(ctx),
            name,
            description,
            price,
            walrus_cid,
            seal_proof,
            metadata,
            created_at: tx_context::epoch(ctx),
            is_active: true,
        };

        table::add(&mut registry.datasets, id, dataset);
        registry.total_datasets = registry.total_datasets + 1;

        event::emit(DatasetCreated {
            dataset_id: id,
            creator: tx_context::sender(ctx),
            price,
        });
    }

    /// Get dataset details
    public fun get_dataset(
        registry: &DatasetRegistry,
        dataset_id: ID,
    ): &Dataset {
        table::borrow(&registry.datasets, dataset_id)
    }

    /// Update dataset price
    public fun update_price(
        registry: &mut DatasetRegistry,
        dataset_id: ID,
        new_price: u64,
        ctx: &TxContext,
    ) {
        let dataset = table::borrow_mut(&mut registry.datasets, dataset_id);
        assert!(dataset.creator == tx_context::sender(ctx), 0);

        dataset.price = new_price;

        event::emit(DatasetUpdated {
            dataset_id,
            new_price,
        });
    }

    /// Deactivate dataset
    public fun delete_dataset(
        registry: &mut DatasetRegistry,
        dataset_id: ID,
        ctx: &TxContext,
    ) {
        let dataset = table::borrow_mut(&mut registry.datasets, dataset_id);
        assert!(dataset.creator == tx_context::sender(ctx), 0);

        dataset.is_active = false;

        event::emit(DatasetDeleted { dataset_id });
    }
}
