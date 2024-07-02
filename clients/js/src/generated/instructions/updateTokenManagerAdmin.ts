/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  option,
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
export type UpdateTokenManagerAdminInstructionAccounts = {
  tokenManager: PublicKey | Pda;
  admin: Signer;
};

// Data.
export type UpdateTokenManagerAdminInstructionData = {
  discriminator: Array<number>;
  newMerkleRoot: Option<Uint8Array>;
  newLimitPerSlot: Option<bigint>;
};

export type UpdateTokenManagerAdminInstructionDataArgs = {
  newMerkleRoot: OptionOrNullable<Uint8Array>;
  newLimitPerSlot: OptionOrNullable<number | bigint>;
};

export function getUpdateTokenManagerAdminInstructionDataSerializer(): Serializer<
  UpdateTokenManagerAdminInstructionDataArgs,
  UpdateTokenManagerAdminInstructionData
> {
  return mapSerializer<
    UpdateTokenManagerAdminInstructionDataArgs,
    any,
    UpdateTokenManagerAdminInstructionData
  >(
    struct<UpdateTokenManagerAdminInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['newMerkleRoot', option(bytes({ size: 32 }))],
        ['newLimitPerSlot', option(u64())],
      ],
      { description: 'UpdateTokenManagerAdminInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [17, 160, 88, 219, 48, 101, 22, 96],
    })
  ) as Serializer<
    UpdateTokenManagerAdminInstructionDataArgs,
    UpdateTokenManagerAdminInstructionData
  >;
}

// Args.
export type UpdateTokenManagerAdminInstructionArgs =
  UpdateTokenManagerAdminInstructionDataArgs;

// Instruction.
export function updateTokenManagerAdmin(
  context: Pick<Context, 'programs'>,
  input: UpdateTokenManagerAdminInstructionAccounts &
    UpdateTokenManagerAdminInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'soldIssuance',
    '6JfYz5itjCP6jjaxqX8KQizXYcRtzmSsHJdbiLBeqvEH'
  );

  // Accounts.
  const resolvedAccounts = {
    tokenManager: {
      index: 0,
      isWritable: true as boolean,
      value: input.tokenManager ?? null,
    },
    admin: {
      index: 1,
      isWritable: false as boolean,
      value: input.admin ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: UpdateTokenManagerAdminInstructionArgs = { ...input };

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
  const data = getUpdateTokenManagerAdminInstructionDataSerializer().serialize(
    resolvedArgs as UpdateTokenManagerAdminInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
