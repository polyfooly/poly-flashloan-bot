import { ethers } from "ethers";
import { polygonChainID } from "../constants/chainId";
import { useWebSocket } from "../config";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const getMaticJsonRpcProvider = () => {
  const maticProvider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_POLYGON_RPC_URL,
    polygonChainID
  );
  return maticProvider;
};

const getMaticWebSocketProvider = () => {
  if (process.env.ALCHEMY_POLYGON_RPC_WS_URL === undefined) {
    throw new Error("Private key is not defined");
  }
  const maticProvider = new ethers.providers.WebSocketProvider(
    process.env.ALCHEMY_POLYGON_RPC_WS_URL,
    polygonChainID
  );
  return maticProvider;
};

export const getMaticProvider = useWebSocket
  ? getMaticWebSocketProvider
  : getMaticJsonRpcProvider;
