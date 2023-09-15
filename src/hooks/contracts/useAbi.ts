import { InterfaceAbi } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

class AbiController {
  private static instance: AbiController;

  private constructor() {}

  static getInstance(): AbiController {
    if (!AbiController.instance) {
      AbiController.instance = new AbiController();
    }
    return AbiController.instance;
  }

  //   async getAbi(contract: string): Promise<string[] | null> {
  //     const data = await tblAbi.get(contract);
  //     if (data?.abi) {
  //       return data.abi;
  //     } else {
  //       const response = await AppService.getContract(contract);
  //       await tblAbi.put({ name: contract, abi: response.data.data.abi });
  //       return response.data.abi;
  //     }
  //   }
}

const abiController = AbiController.getInstance();

export const useAbi = (contract: string): [InterfaceAbi | null, string] => {
  const [abi, setAbi] = useState<InterfaceAbi | null>(null);

  const fetchContract = useCallback(async () => {
    const response = await abiController.getAbi(contract);
    setAbi(response);
  }, [contract]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return [abi, contract];
};
