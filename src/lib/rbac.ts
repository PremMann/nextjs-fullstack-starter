import { auth } from '@/lib/auth'
import { Role } from '@prisma/client'

export async function hasRole(requiredRole: Role): Promise<boolean> {
  const session = await auth()

  if (!session?.user?.role) {
    return false
  }

  const roleHierarchy = {
    USER: 0,
    MODERATOR: 1,
    ADMIN: 2,
  }

  const userRoleLevel = roleHierarchy[session.user.role as Role] ?? -1
  const requiredRoleLevel = roleHierarchy[requiredRole] ?? 999

  return userRoleLevel >= requiredRoleLevel
}

export async function requireRole(requiredRole: Role): Promise<void> {
  const allowed = await hasRole(requiredRole)

  if (!allowed) {
    throw new Error('Unauthorized: Insufficient permissions')
  }
}

export async function canAccess(resource: string, action: string): Promise<boolean> {
  const session = await auth()

  if (!session?.user) {
    return false
  }

  // Admins can do everything
  if (session.user.role === 'ADMIN') {
    return true
  }

  // Define your access control rules here
  const permissions: Record<string, Record<string, Role[]>> = {
    users: {
      read: ['USER', 'MODERATOR', 'ADMIN'],
      create: ['ADMIN'],
      update: ['MODERATOR', 'ADMIN'],
      delete: ['ADMIN'],
    },
  }

  const allowedRoles = permissions[resource]?.[action] || []
  return allowedRoles.includes(session.user.role as Role)
}
