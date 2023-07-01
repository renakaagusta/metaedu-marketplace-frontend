export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SHOW_LOGGER: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_RPC_URL: string;
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
    }
  }
}
