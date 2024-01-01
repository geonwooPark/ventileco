import React from 'react'
import Container from '../common/Container'
import ChatInput from './ChatInput'
import ChatView from './ChatView/ChatView'

export default function GPTChat() {
  return (
    <main className="h-full w-full">
      <section className="h-full pb-5 pt-[82px] text-white md:py-[102px] md:pb-[82px]">
        <Container className="h-full">
          <div className="flex h-full items-center justify-center">
            <div className="h-full w-full max-w-[580px] overflow-hidden rounded-md bg-slate-700 md:max-h-[504px]">
              <ChatView />
              <ChatInput />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
