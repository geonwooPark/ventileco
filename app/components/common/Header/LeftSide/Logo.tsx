import Image from 'next/image'
import logo from '/public/images/logo.png'
import { useRouter } from 'next/navigation'

interface LogoProps {
  className: string
}

export default function Logo({ className }: LogoProps) {
  const router = useRouter()

  return (
    <div className={`relative z-50 size-[40px] cursor-pointer  ${className}`}>
      <Image
        src={logo}
        alt="로고이미지"
        quality={100}
        placeholder="blur"
        fill
        className="object-cover"
        onClick={() => router.push('/')}
      />
    </div>
  )
}
