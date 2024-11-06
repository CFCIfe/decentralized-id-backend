import algosdk from 'algosdk';

export const resolveDidIntoComponents = (did: string) => {
  const [protocol, blockchain, network, , appId, publicKey] = did.split(':');

  if (protocol !== 'did' || blockchain !== 'algo') {
    throw new Error('Invalid DID protocol or blockchain');
  }

  if (!appId || !publicKey || !network) {
    throw new Error('Invalid DID format');
  }

  try {
    algosdk.encodeUint64(BigInt(appId));
  } catch (e) {
    throw new Error(`Invalid app ID, expected uint64, got ${appId}`);
  }

  return {
    network,
    appId,
    publicKey,
  };
};
