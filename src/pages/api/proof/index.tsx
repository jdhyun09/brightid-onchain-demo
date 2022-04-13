import { NextApiRequest, NextApiResponse } from "next"
import createProof from "@interep/proof"
import { ZkIdentity, Strategy } from "@zk-kit/identity"
import path from "path"
interface Query {
  message: string
  groupId: string
  signal: string
  externalNullifier: string
}

const handleMembershipProof = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { message, groupId, signal, externalNullifier } =
    req.query as unknown as Query

  try {
    const zkFiles = {
      wasmFilePath: path.join("/var/task/.next/public/semaphore.wasm"),
      zkeyFilePath: path.join("/var/task/.next/public/semaphore_final.zkey")
    }

    const identity = new ZkIdentity(Strategy.MESSAGE, message)

    const { publicSignals, solidityProof } = await createProof(
      identity,
      groupId,
      externalNullifier,
      signal,
      zkFiles
    )

    res.status(200).json({ publicSignals, solidityProof })
  } catch (e) {
    res.status(401).send({ error: e + "1212"})
  }
}

export default handleMembershipProof
