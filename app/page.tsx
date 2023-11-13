import Card from '@/components/uiComponents/Card'
import Button from '@/components/uiComponents/Button'
import Image from 'next/image'
import { getFeaturedTools } from './actions';
import HomePgForm from '@/components/forms/HomePgForm';
import { Link } from 'react-router-dom';

export default async function Home() {

  const featuredTools = await getFeaturedTools();

  return (
    <main className="flex min-h-screen dark:text-fontPrimary flex-col gap-4 items-center">
      <section >
        <div className='my-8'>
          <Image src='/heroImage.png' alt='image of tools' width='379' height='220' className='rounded-md' />
        </div>
        <h1 className='font-bold text-center text-lg'>Find tools to rent here on Rent A Wrench!</h1>
        {/* <search by location and date form component will need to be split into a separate Component */}
        <div >
          <HomePgForm />
        </div>
      </section>

      <section className='w-full lg:px-42 p-4 px-0 text-center'>
        {/* <Listings component will need to be split into a separate Component */}
        <h1 className='font-bold text-2xl mb-8'>Featured Listings</h1>
        <div className='flex justify-center gap-4 flex-wrap'>
          {featuredTools && featuredTools.map((tool) => (
            <Card
              key={tool.id}
              className='md:basis-1/4'
              variant='default'
              title={tool.name}
              size={'default'}
              imageSrc={tool.images[0] && tool.images[0].url}
              description={tool.description}
            >
              <a href={`/tools/${tool.id}`}>
                <Button variant={'thin'} size={'sm'}>Details</Button>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}