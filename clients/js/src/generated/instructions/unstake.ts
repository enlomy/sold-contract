/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type UnstakeInstructionAccounts = {
  poolManager: PublicKey | Pda;
  tokenManager: PublicKey | Pda;
  baseMint: PublicKey | Pda;
  payerBaseMintAta: PublicKey | Pda;
  xMint: PublicKey | Pda;
  payerXMintAta: PublicKey | Pda;
  vault: PublicKey | Pda;
  payer?: Signer;
  systemProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  associatedTokenProgram: PublicKey | Pda;
  soldIssuanceProgram: PublicKey | Pda;
};

// Data.
export type UnstakeInstructionData = {
  discriminator: Array<number>;
  quantity: bigint;
};

export type UnstakeInstructionDataArgs = { quantity: number | bigint };

export function getUnstakeInstructionDataSerializer(): Serializer<
  UnstakeInstructionDataArgs,
  UnstakeInstructionData
> {
  return mapSerializer<UnstakeInstructionDataArgs, any, UnstakeInstructionData>(
    struct<UnstakeInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['quantity', u64()],
      ],
      { description: 'UnstakeInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [90, 95, 107, 42, 205, 124, 50, 225],
    })
  ) as Serializer<UnstakeInstructionDataArgs, UnstakeInstructionData>;
}

// Args.
export type UnstakeInstructionArgs = UnstakeInstructionDataArgs;

// Instruction.
export function unstake(
  context: Pick<Context, 'payer' | 'programs'>,
  input: UnstakeInstructionAccounts & UnstakeInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'soldStaking',
    'EUo32ZPAZkwX1dYmHQMiT8XPCnTPiYWrAvukW3WdDgHA'
  );

  // Accounts.
  const resolvedAccounts = {
    poolManager: {
      index: 0,
      isWritable: true as boolean,
      value: input.poolManager ?? null,
    },
    tokenManager: {
      index: 1,
      isWritable: true as boolean,
      value: input.tokenManager ?? null,
    },
    baseMint: {
      index: 2,
      isWritable: true as boolean,
      value: input.baseMint ?? null,
    },
    payerBaseMintAta: {
      index: 3,
      isWritable: true as boolean,
      value: input.payerBaseMintAta ?? null,
    },
    xMint: {
      index: 4,
      isWritable: true as boolean,
      value: input.xMint ?? null,
    },
    payerXMintAta: {
      index: 5,
      isWritable: true as boolean,
      value: input.payerXMintAta ?? null,
    },
    vault: {
      index: 6,
      isWritable: true as boolean,
      value: input.vault ?? null,
    },
    payer: {
      index: 7,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 8,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
    tokenProgram: {
      index: 9,
      isWritable: false as boolean,
      value: input.tokenProgram ?? null,
    },
    associatedTokenProgram: {
      index: 10,
      isWritable: false as boolean,
      value: input.associatedTokenProgram ?? null,
    },
    soldIssuanceProgram: {
      index: 11,
      isWritable: false as boolean,
      value: input.soldIssuanceProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UnstakeInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getUnstakeInstructionDataSerializer().serialize(
    resolvedArgs as UnstakeInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
