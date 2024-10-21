import { createPublicClient, http, Block } from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http("https://base-sepolia.g.alchemy.com/v2/kksljUTHDVAvILBoeYSu0qM2ybE2EFXD"),
});

async function fetchBlock() {
  const block: Block = await client.getBlock({
    blockNumber: 123456n,
  });

  console.log(block);
}

fetchBlock().catch((error) => {
  console.error("Error fetching block:", error);
});
