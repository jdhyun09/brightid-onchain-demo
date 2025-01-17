import { NextApiRequest, NextApiResponse } from "next"
import createProof from "@interep/proof"
import { ZkIdentity, Strategy } from "@zk-kit/identity"

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

  let wasmFile = "/api/file/semaphore.wasm"
  let zkeyFile = "/api/file/semaphore_final.zkey"
  try {
    const zkFiles = {
      wasmFilePath: wasmFile,
      zkeyFilePath: zkeyFile
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
    res.status(401).send({ error: e + "hi"})
  }
}

export default handleMembershipProof
