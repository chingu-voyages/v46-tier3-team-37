import Card from '@/components/uiComponents/Card'
import Button from '@/components/uiComponents/Button'
import Image from 'next/image'
import { getFeaturedTools } from './actions';

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
          <form className='flex flex-col gap-6 justify-center my-4'>
            <input readOnly type='text' value={'Texas'} className='border border-[lightgray] rounded-sm w-full' placeholder='Location' />
            <div className='flex justify-center gap-4 bg-[lightgray] h-16 p-2 '>
              <input className='rounded-sm' type='date' min={new Date().toISOString().split('T')[0]} required />
              <p className='self-center text-[gray] h-full border border-[gray]'></p>
              <input className='rounded-sm' type='date' min={new Date().toISOString().split('T')[0]} required />
            </div>
            <Button className='font-bold text-xl' size='lg'>Search</Button>
          </form>
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
              <Button variant={'thin'} size={'sm'}>Details</Button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}


{/* <Card 
            key={featuredTools[7].id}
            className='md:basis-1/4'
            variant='detailed'
            title={featuredTools[7].name} 
            size={'lg'}
            price='20'
            description={featuredTools[7].description} 
            >
              <Button variant='thin' size='sm'>button</Button>
            </Card>
            <Card 
            key={featuredTools[7].id}
            className='md:basis-1/4'
            variant='default'
            title={featuredTools[7].name} 
            size={'lg'}
            price='20'
            description={featuredTools[7].description} 
            >
              <Button variant='thin' size='sm'>button</Button>
            </Card> */}