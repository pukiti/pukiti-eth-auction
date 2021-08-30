import Link from 'next/link'
import Layout from '../components/Layout'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { ethers, providers, utils } from 'ethers'

const IndexPage = () => {
  const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)
  return(
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)}

export default IndexPage
