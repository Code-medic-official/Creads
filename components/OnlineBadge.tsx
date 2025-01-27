import React from 'react'
import { Badge } from './ui/badge'
import { iUser } from '@/lib/database/models/user.model'

export default function OnlineBadge({_user}: {_user?: iUser}) {
  return (
    <Badge className="rounded-lg">online</Badge>
  )
}
