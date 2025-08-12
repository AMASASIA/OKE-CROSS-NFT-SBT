
import { BrowserProvider, Signer } from "ethers";

export interface Item {
  id: string;
  image: string;
  name: string;
  description: string;
  transcript: string;
  tokenId: number;
  contractAddress: string;
  isSbt: boolean;
  external_url: string;
}

export interface Web3State {
    address: string | null;
    chainId: number | null;
    provider: BrowserProvider | null;
    signer: Signer | null;
}

export interface CreatorState {
    previewDataUrl: string;
    fileName: string;
    fileType: 'image' | 'video' | 'audio' | null;
    transcript: string;
}
