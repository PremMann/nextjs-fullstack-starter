'use server'

import { signIn, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/schemas/auth'
import { hash } from 'bcryptjs'
import { AuthError } from 'next-auth'
import type { ActionResult } from '@/types'

export async function loginAction(data: LoginInput): Promise<ActionResult> {
  try {
    const validated = loginSchema.safeParse(data)

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0].message,
      }
    }

    await signIn('credentials', {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Invalid email or password',
      }
    }
    return {
      success: false,
      error: 'An error occurred during login',
    }
  }
}

export async function registerAction(data: RegisterInput): Promise<ActionResult> {
  try {
    const validated = registerSchema.safeParse(data)

    if (!validated.success) {
      return {
        success: false,
        error: validated.error.errors[0].message,
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.data.email },
    })

    if (existingUser) {
      return {
        success: false,
        error: 'Email already registered',
      }
    }

    const hashedPassword = await hash(validated.data.password, 12)

    await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword,
      },
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred during registration',
    }
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirect: false })
}
