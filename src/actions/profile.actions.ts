'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hash, compare } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/types'
import { changePasswordSchema, type ChangePasswordInput } from '@/schemas/auth'

export async function updateProfileAction(data: {
  name: string
}): Promise<ActionResult> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: data.name },
    })

    revalidatePath('/dashboard/settings')

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update profile',
    }
  }
}

export async function changePasswordAction(data: ChangePasswordInput): Promise<ActionResult> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const validated = changePasswordSchema.safeParse(data)

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0].message,
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user?.password) {
      return {
        success: false,
        error: 'Cannot change password for this account',
      }
    }

    const isValid = await compare(validated.data.currentPassword, user.password)

    if (!isValid) {
      return {
        success: false,
        error: 'Current password is incorrect',
      }
    }

    const hashedPassword = await hash(validated.data.newPassword, 12)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to change password',
    }
  }
}
