'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { requireRole } from '@/lib/rbac'
import { revalidatePath } from 'next/cache'
import type { ActionResult, PaginatedResponse } from '@/types'
import type { User, Role } from '@prisma/client'

export async function getUsersAction(
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<ActionResult<PaginatedResponse<Omit<User, 'password'>>>> {
  try {
    await requireRole('MODERATOR')

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ])

    return {
      success: true,
      data: {
        data: users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    }
  }
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  try {
    await requireRole('ADMIN')

    await prisma.user.delete({
      where: { id: userId },
    })

    revalidatePath('/dashboard/users')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete user',
    }
  }
}

export async function updateUserRoleAction(userId: string, role: Role): Promise<ActionResult> {
  try {
    await requireRole('ADMIN')

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    revalidatePath('/dashboard/users')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update user role',
    }
  }
}
