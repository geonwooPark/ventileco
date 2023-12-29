import Link from 'next/link'
import React from 'react'
import Container from '../Container'
import { AiFillGithub } from 'react-icons/ai'

interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <Container className="flex items-center justify-between py-4">
        <span className="text-sm text-gray-400 sm:text-center">
          © 2023 Ventilco All Rights Reserved
        </span>
        <Link
          href="https://github.com/geonwooPark/myblog"
          target="_black"
          className="text-gray-400 hover:text-gray-200"
        >
          <AiFillGithub size={24} />
        </Link>
      </Container>
    </footer>
  )
}
