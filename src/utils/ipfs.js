// src/utils/ipfs.js
import { create } from "ipfs-http-client";

const ipfs = create({ url: "http://127.0.0.1:5001" });

export async function uploadToIPFS(file) {
  try {
    const result = await ipfs.add(file);
    return result.path;
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw error;
  }
}
