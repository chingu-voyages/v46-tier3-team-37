import Card from '@/components/uiComponents/Card'
import Button from '@/components/uiComponents/Button'

const itemDescription = 'Text items details description text items details description text items details description text items details description tails description text items details description text items details description text items details description '
const itemTitle = 'Green Lawn Mower'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">

      <Card variant={'detailed'} price={'$100'} size={'md'} description={itemDescription} title={itemTitle} >
        <Button  className="self-end" variant={'thin'} size={'sm'}>Cancel</Button>
        <Button variant={'thin'} size={'icon'} >I</Button>
      </Card>

      <Card variant={'default'} price={'$100'} size={'md'} description={itemDescription} title={itemTitle} >
        <Button  className="self-end" variant={'thin'} size={'sm'}>Edit</Button>
        <Button variant={'thin'} size={'icon'} >I</Button>
      </Card>
    </main>
  )
}
