import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from '@thirdweb-dev/react';
import { utils } from 'ethers';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const contractAddress = '0xfe088Bae1F873E9169E4668dD6D3e1c07DD9bDe1';
  const address = useAddress();
  const [quantity, setQuantity] = useState('1');
  const { contract } = useContract(contractAddress);
  const { data: price, isLoading } = useContractRead(
    contract,
    'priceForAddress',
    address,
    quantity,
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://thirdweb.com/nach.eth/DynamicFreeMint/">
            Dynamic Free Mint
          </a>
          !
        </h1>

        <p className={styles.description}>
          Limit how many NFTs each wallet can claim for free.
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => {
              contract.call('claim', address, quantity, {
                value: price,
              });
            }}
            isDisabled={!quantity || parseInt(quantity) < 1 || isLoading}
          >
            Mint{' '}
            {price
              ? `(${
                  price?.toString() === '0'
                    ? 'Free'
                    : `${utils.formatEther(price)} ETH`
                })`
              : ''}
          </Web3Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
