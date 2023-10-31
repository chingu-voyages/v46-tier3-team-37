import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Postgres from '@/components/icons/postgresql.svg'

const About = () => {
  return (
    <div className='max-w-[1000px] mx-auto p-4 flex flex-col items-center justify-center w-full h-full'>
      <div className='mt-12 flex flex-col items-center'>
        <h1 className='text-2xl xl:text-3xl font-extrabold text-[#D3CAB0]'>
          Meet Chingu Rent-a-Wrench Coders
        </h1>
        <p className='mt-4 mb-6 text-center text-lg text-[#D3CAB0] max-w'>
          A group of coders, in voyage 46, group 37, collaborated together to
          create a tool rental app
        </p>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='flex flex-col w-[240px]'>
          <Image
            src='https://media.licdn.com/dms/image/D5635AQEYQuydKj_FNg/profile-framedphoto-shrink_800_800/0/1681751278762?e=1698962400&v=beta&t=5XJgJ09QZdcvU0gyfblsoLcAXBx7oqVz1b2QUD1zY70'
            width={240}
            height={240}
            className='mb-4 rounded-md'
            alt='yong-image'
          />
          <div>
            <p className='mb-4 text-[#D3CAB0]'>
              Meet Yong, who enjoys making useful apps, fun apps, learning new
              tech stack, and collaborating with others to create apps.
            </p>
          </div>
        </div>
        <div className='flex flex-col w-[240px]'>
          <Image
            src='https://media.licdn.com/dms/image/D5603AQFoLCSGAugU1Q/profile-displayphoto-shrink_800_800/0/1681922763972?e=1703721600&v=beta&t=HC3vlaQ1f01jtfOeqf25CpxC8vWAanr7szC-KTvRQ6k'
            width={240}
            height={240}
            className='mb-4 rounded-md'
            alt='james-image'
          />
          <div>
            <p className='mb-4 text-[#D3CAB0]'>
              Meet James, who enjoys making useful apps, fun apps, learning new
              tech stack, and collaborating with others to create apps.
            </p>
          </div>
        </div>
        <div className='flex flex-col w-[240px]'>
          <Image
            src='https://media.licdn.com/dms/image/C5603AQGzoEpo72qRUw/profile-displayphoto-shrink_800_800/0/1650313047528?e=1703721600&v=beta&t=E1A7KRtTBKZW35LxayCPon8j2CwbVvMIhgIF7dzlpWc'
            width={240}
            height={240}
            className='mb-4 rounded-md'
            alt='sean-image'
          />
          <div>
            <p className='mb-4 text-[#D3CAB0]'>
              Meet Sean, who is an expert at TS, figma, and resuable components.
            </p>
          </div>
        </div>
        <div className='flex flex-col w-[240px]'>
          <Image
            src='https://media.licdn.com/dms/image/D5603AQEFQ9bPMTJ2Yw/profile-displayphoto-shrink_800_800/0/1686068486077?e=1703721600&v=beta&t=eh1PM9yuBTXKrlLBFtOqQcnQGOV5UpUnaHWqIQ1bO3o'
            width={240}
            height={240}
            className='mb-4 rounded-md'
            alt='harrison-image'
          />
          <div>
            <p className='mb-4 text-[#D3CAB0]'>
              Meet Harrison, who enjoys making useful apps, fun apps, learning
              new tech stack, and collaborating with others to create apps.
            </p>
          </div>
        </div>
      </div>
      <div className='text-center mt-20'>
        <p className='text-4xl font-bold inline border-b-4 text-[#D3CAB0] '>
          TechStack
        </p>
        <p className='py-6 text-xl text-[#D3CAB0]'>
          Techstack utilized by our team
        </p>
      </div>
      <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4  text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
        <div className='m-4 hover:scale-125'>
          <Image
            width={150}
            alt='postgres-icon'
            src={Postgres}
            className='w-20 mx-auto mt-5'
          />
          <p className='my-4 text-[#D3CAB0]'>PostgreSQL</p>
        </div>
      </div>
    </div>
  )
}

export default About
