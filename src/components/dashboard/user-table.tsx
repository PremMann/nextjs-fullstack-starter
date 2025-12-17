"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { deleteUserAction, updateUserRoleAction } from "@/actions/user.actions"
import { toast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"
import type { User, Role } from "@prisma/client"

interface UserTableProps {
  users: Omit<User, "password">[]
  currentUserId: string
  currentUserRole: string
}

export function UserTable({ users, currentUserId, currentUserRole }: UserTableProps) {
  const [loading, setLoading] = useState<string | null>(null)

  async function handleDeleteUser(userId: string, userName: string) {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) {
      return
    }

    setLoading(userId)
    const result = await deleteUserAction(userId)

    if (result.success) {
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete user",
      })
    }

    setLoading(null)
  }

  async function handleUpdateRole(userId: string, role: Role) {
    setLoading(userId)
    const result = await updateUserRoleAction(userId, role)

    if (result.success) {
      toast({
        title: "Success",
        description: "User role updated successfully",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to update user role",
      })
    }

    setLoading(null)
  }

  function getRoleBadgeVariant(role: string) {
    switch (role) {
      case "ADMIN":
        return "destructive"
      case "MODERATOR":
        return "default"
      default:
        return "secondary"
    }
  }

  const isAdmin = currentUserRole === "ADMIN"

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={isAdmin ? 5 : 4} className="text-center text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                {isAdmin && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          disabled={loading === user.id || user.id === currentUserId}
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleUpdateRole(user.id, "USER")}
                          disabled={user.role === "USER"}
                        >
                          User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateRole(user.id, "MODERATOR")}
                          disabled={user.role === "MODERATOR"}
                        >
                          Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateRole(user.id, "ADMIN")}
                          disabled={user.role === "ADMIN"}
                        >
                          Admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id, user.name || user.email)}
                          className="text-destructive"
                          disabled={user.id === currentUserId}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
