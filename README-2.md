# OKE_ALT_BACKEND_COMPLETE_0810

End-to-end backend (Hardhat) for the OKE demo: ERC-721 NFT, mock CCIP (source/destination), and ERC‑6551 (TBA) with a simple Registry + Account implementation that is demo-friendly. This package compiles and deploys out of the box.

> Networks supported via config: **Sepolia** and **Mumbai** (you provide RPC + private key in `.env`).

## Quick start

```bash
npm install
cp .env.example .env
# fill: PRIVATE_KEY, SEPOLIA_RPC_URL and/or MUMBAI_RPC_URL
npx hardhat compile
npx hardhat run scripts/deploy.ts --network sepolia
```

## What gets deployed

- `OkeNFT` (ERC-721)
- `ERC6551Registry` (demo) and `ERC6551Account` (demo)
- (CCIP mocks) `CCIPSource` and `CCIPDestination`

## Notes

- The ERC‑6551 implementation here is **simplified for demo purposes**. For production, use the official reference implementation and the canonical Registry at `0x000000006551c19487814612e58FE06813775758` on testnets.
