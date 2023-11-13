import Button from '@/components/uiComponents/Button';
import Card from '@/components/uiComponents/Card';
import { ItemComplete as Tool } from '@/types/schemaTypes';
import Link from 'next/link';
let baseUrl: string; //to be the value of the deployed website base URL
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
}
async function getAllToolsInfo() {

  const res = await fetch(`http://localhost:3000/api/tools`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Tools() {
  const toolsData = await getAllToolsInfo();

  return (
    <div className='pt-[5px] px-[10px]'>
      {toolsData && (
        <div className='mx-auto'>
          {toolsData.map((tool: Tool) => (
            <div
              className='flex justify-center mt-4'
              key={tool.id}
            >
              <div className='flex gap-2 flex-col md:w-1/2'>
                <Link href={`/tools/${tool.id}`}>
                  <div key={tool.id}>
                    <Card
                      size={'md'}
                      active={true}
                      variant={'default'}
                      title={tool.name}
                      description={tool.description}
                      price={tool.price.toString()}
                      imageSrc={
                        tool.images.length
                          ? tool.images[0].url
                          : 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg'
                      }
                    >
                      {/* <Button variant={'thin'} size={'sm'} cardType='detailed'>More info</Button> */}
                    </Card>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
