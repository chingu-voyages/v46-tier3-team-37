import Card from '@/components/uiComponents/Card'
import Image from 'next/image'

const itemDescription = 'Text items details description text items details description text items details description text items details description tails description text items details description text items details description text items details description '
const itemTitle = 'Green Lawn Mower'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      
      <Card variant={'detailed'} price={'$100'} size={'md'} description={itemDescription} title={itemTitle} />
    </main>
  )
}
