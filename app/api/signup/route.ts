import { connectMongo } from '@/app/utils/database'
import { User } from '@/models/user'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/
  const hashedPassword = await bcrypt.hash(password, 12)

  if (
    !name ||
    name.trim() === '' ||
    !email ||
    email.trim() === '' ||
    !password ||
    password.trim() === ''
  ) {
    return NextResponse.json(
      { error: '빈칸을 모두 입력해주세요.' },
      { status: 409 },
    )
  }
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: '잘못된 이메일 형식입니다.', focus: 'email' },
      { status: 409 },
    )
  }
  if (name.length > 10) {
    return NextResponse.json(
      { error: '이름은 10자 이하로 입력해주세요.', focus: 'name' },
      { status: 409 },
    )
  }
  if (parseInt(password.length, 10) < 8 || !passwordRegex.test(password)) {
    return NextResponse.json(
      {
        error: '비밀번호는 영문을 포함하여 8~15자리이어야 합니다.',
        focus: 'password',
      },
      { status: 409 },
    )
  }

  try {
    await connectMongo()
    const existedUser = await User.findOne({ email })
    if (existedUser) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.', focus: 'email' },
        { status: 409 },
      )
    }

    await User.create({ name, email, password: hashedPassword, image: '' })
    return NextResponse.json({ message: '회원가입 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
