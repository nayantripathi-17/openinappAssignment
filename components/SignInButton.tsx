'use client'
import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import React from 'react'
import { montserrat } from '@/lib/fonts'

function SignInButton({ description, logo }: { description: string, logo: JSX.Element }) {
  return (
    <Button
      className={`bg-white flex rounded-[10px] justify-center items-center cursor-pointer`}
      onClick={() => signIn("google")}
    >
      {logo}
      <p className={`text-[#858585] font-normal ${montserrat.className} py-5 px-4`}>{description}</p>
    </Button>
  )
}

export default SignInButton