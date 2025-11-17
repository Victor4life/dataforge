-- DataForge Database Schema
-- Initialize tables for dataset metadata, purchases, and user profiles

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS datasets (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(18, 8) NOT NULL,
  walrus_cid TEXT NOT NULL,
  seal_proof TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  license TEXT,
  file_size BIGINT,
  file_type TEXT,
  is_active BOOLEAN DEFAULT true,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchases (
  id TEXT PRIMARY KEY,
  buyer_id TEXT NOT NULL REFERENCES users(id),
  dataset_id TEXT NOT NULL REFERENCES datasets(id),
  price DECIMAL(18, 8) NOT NULL,
  platform_fee DECIMAL(18, 8),
  creator_royalty DECIMAL(18, 8),
  tx_hash TEXT NOT NULL,
  nft_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS creator_stats (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  total_datasets INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_revenue DECIMAL(18, 8) DEFAULT 0,
  total_royalties DECIMAL(18, 8) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_datasets_creator ON datasets(creator_id);
CREATE INDEX idx_datasets_tags ON datasets USING GIN(tags);
CREATE INDEX idx_purchases_buyer ON purchases(buyer_id);
CREATE INDEX idx_purchases_dataset ON purchases(dataset_id);
CREATE INDEX idx_purchases_created ON purchases(created_at);
