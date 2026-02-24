export const PERMISSIONS = {
  READ:    1n << 0n,
  WRITE:   1n << 1n,
  DELETE:  1n << 2n,
  PUBLISH: 1n << 3n,
  ADMIN:   1n << 62n, // reserve a high bit for admin-like privileges
} as const;

export type PermissionName = keyof typeof PERMISSIONS;

export function hasPermission(flags: bigint, perm: bigint): boolean {
  return (flags & perm) === perm;
}

export function grantPermission(flags: bigint, perm: bigint): bigint {
  return flags | perm;
}

export function revokePermission(flags: bigint, perm: bigint): bigint {
  return flags & ~perm;
}

export function togglePermission(flags: bigint, perm: bigint): bigint {
  return flags ^ perm;
}

export function listPermissions(flags: bigint): PermissionName[] {
  return (Object.keys(PERMISSIONS) as PermissionName[]).filter(name => {
    return hasPermission(flags, PERMISSIONS[name]);
  });
}

export function permissionsFromNames(names: PermissionName[]): bigint {
  return names.reduce((acc, n) => acc | PERMISSIONS[n], 0n as bigint);
}

export function permissionsToString(flags: bigint): string {
  return flags.toString();
}

export function permissionsFromString(value: string): bigint {
  return BigInt(value ?? '0');
}
