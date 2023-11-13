import BackButton from '@/components/DatePicker/BackButton';
import Calendar from '@/components/DatePicker/DatePicker';
import { Tool } from '@/types/schemaTypes';
import Image from 'next/image';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { getToolById } from '@/app/actions';
export const dynamic = "force-dynamic"

let baseUrl: string; //to be the value of the deployed website base URL
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
}
// export async function generateStaticParams() {
//   try {
//     const res = await fetch(`https://v46-tier3-team-37-edshmiu6y-sean-paulsons-projects.vercel.app/?vercelToolbarCode=Xo2dVAIBRm-vEun/api/tools`);
//   const tools = await res.json();

//   return tools.map((tool: Tool) => ({
//     params: { id: tool.id },
//   }));
//   }catch (error) {
//     console.log(error);
//   }
// }

// async function getTool(id: String) {
//  try {
//   const res = await fetch(`https://v46-tier3-team-37-edshmiu6y-sean-paulsons-projects.vercel.app/?vercelToolbarCode=Xo2dVAIBRm-vEun/api/tools/${id}`, {
//     cache: 'no-store',
//   });

//   const tool = await res.json();

//   return tool;
//  }catch (error) {
//   console.log(error)
//  }
// }

export default async function Tool({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id)
  const tool = await getToolById(params.id);
  const session = await getServerSession(options);
  if (!tool) return (<>error no tool found</>)

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