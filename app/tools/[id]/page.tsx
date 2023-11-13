import BackButton from '@/components/DatePicker/BackButton';
import Calendar from '@/components/DatePicker/DatePicker';
import { Tool } from '@/types/schemaTypes';
import Image from 'next/image';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

let baseUrl = ''; //to be the value of the deployed website base URL
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
}
export async function generateStaticParams(): Promise<
  { params: { id: string } }[]
> {
  const res = await fetch(`${baseUrl}/api/tools`);

  if (!res.ok) {
    console.error(
      `Failed to fetch data. Status: ${res.status}`
    );
    console.error('Response:', await res.text());
    throw new Error(
      `Failed to fetch data. Status: ${res.status}`
    );
  }

  const tools = await res.json();
  console.log('Fetched tools:', tools);

  return tools.map((tool: Tool) => ({
    params: { id: tool.id },
  }));
}

async function getTool(id: String) {
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
  const session = await getServerSession(options);

  return (
    <div className=''>
      <div className='flex justify-between px-4 py-4 '>
        <BackButton />
        <p className='text-right'>Heart</p>
      </div>
      <div className='flex flex-col items-center px-16 bg-slate-500'>
        {tool.images && tool.images.length > 0 && (
          <Image
            className=''
            src={tool.images[0].url}
            alt={tool.name}
            height={200}
            width={200}
          />
        )}
        {tool && (
          <div className=''>
            <h1 className='font-bold text-lg'>
              {tool.name}
            </h1>
            <p className='pt-4'>{tool.description}</p>
            <p className='font-bold pt-2'>
              ${tool.price}/day
            </p>
          </div>
        )}
        {tool && (
          <div className='py-4'>
            <Calendar
              excludeDateRangeArray={tool.Transaction}
              tool={tool}
              user={session?.user.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
