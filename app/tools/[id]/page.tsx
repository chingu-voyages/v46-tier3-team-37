import { ItemWithImages as Tool } from '@/types/schemaTypes';
import Image from 'next/image';

let baseUrl = ''; //to be the value of the deployed website base URL
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
}
export async function generateStaticParams(): Promise<
  { params: { id: string } }[]
> {
  const res = await fetch(`${baseUrl}/api/tools`);
  const tools = await res.json();

  return tools.map((tool: Tool) => ({
    params: { id: tool.id },
  }));
}

async function getTool(id: String) {
  console.log('we have an ID ', id);
  const res = await fetch(`${baseUrl}/api/tools/${id}`, {
    cache: 'no-store',
  });
  const tool = await res.json();

  return tool;
}

export default async function Tool({
  params,
}: {
  params: { id: String };
}) {
  const tool = await getTool(params.id);
  console.log('we have a ', tool);

  return (
    <div className=''>
      <Image
        className=''
        src={tool.images[0].url}
        alt={tool.name}
        height={100}
        width={100}
      />
      <h1 className='font-bold'>{tool.name}</h1>
      <p>{tool.description}</p>
      <p className='font-bold'>${tool.price}/day</p>
    </div>
  );
}
