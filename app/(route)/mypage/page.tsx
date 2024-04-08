import React from 'react'
import Section from '@common/Section'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import UserInfo from '@mypage/UserInfo'
import ActionLogTab from '@mypage/ActionLogtab/ActionLogTab'
import Main from '@common/Main'
import ProjectTitle from '@/components/common/ProjectTitle'

export default async function page() {
  const session = await getServerSession(authOptions)

  return (
    <Main>
      <Section className="!pb-10 pt-10">
        <ProjectTitle title="My Page" />
        <UserInfo session={session} />
        <ActionLogTab />
      </Section>
    </Main>
  )
}
