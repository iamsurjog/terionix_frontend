import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent, updateSection } from '#/lib/content'
import { useState } from 'react'

export const Route = createFileRoute('/admin/temp')({
  component: RouteComponent,
})

function RouteComponent() {
  return (

    <div className="font-sans text-text">
      <AdminNavbar active="About" />
    </div>
  )
}
