'use client'

import React from 'react'
import { IconEmail, IconGithub } from '../../../../public/svgs/icons'
import Image from 'next/image'
import folder from '../../../../public/images/folder.png'
import Modal from './Modal/Modal'

export default function ContactModal() {
  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="large">
          <Modal.Header>
            <Modal.Title>Contact</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
            <div className="relative mx-auto mb-8 size-[200px]">
              <Image src={folder} alt="profile" fill placeholder="blur" />
            </div>
            <div className="space-y-2 text-beige-light">
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <IconEmail />
                </div>
                <span>white0581@naver.com</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-5">
                  <IconGithub />
                </div>
                <a
                  href="https://github.com/geonwooPark"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/geonwooPark
                </a>
              </div>
            </div>
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
