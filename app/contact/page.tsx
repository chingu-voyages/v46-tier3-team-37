'use client';

import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Button from '@/components/uiComponents/Button';
import Image from 'next/image';
import Link from 'next/link';

const teamDummyData = [
  {
    name: 'Yong',
    image:
      'https://media.licdn.com/dms/image/D5635AQEYQuydKj_FNg/profile-framedphoto-shrink_800_800/0/1681751278762?e=1698962400&v=beta&t=5XJgJ09QZdcvU0gyfblsoLcAXBx7oqVz1b2QUD1zY70',
    githubURL: 'https://github.com/yongcho-tx',
    linkedURL: 'https://www.linkedin.com/in/yong-cho-dev/',
  },
  {
    name: 'James',
    image:
      'https://media.licdn.com/dms/image/D5603AQFoLCSGAugU1Q/profile-displayphoto-shrink_800_800/0/1681922763972?e=1703721600&v=beta&t=HC3vlaQ1f01jtfOeqf25CpxC8vWAanr7szC-KTvRQ6k',
    githubURL: 'https://github.com/jameswonlee',
    linkedURL: 'https://www.linkedin.com/in/jameswonlee/',
  },
  {
    name: 'Sean',
    image:
      'https://media.licdn.com/dms/image/C5603AQGzoEpo72qRUw/profile-displayphoto-shrink_800_800/0/1650313047528?e=1703721600&v=beta&t=E1A7KRtTBKZW35LxayCPon8j2CwbVvMIhgIF7dzlpWc',
    githubURL: 'https://github.com/SeanPaulson',
    linkedURL:
      'https://linkedin.com/in/sean-paulson-64b519225/',
  },
  {
    name: 'Harrison',
    image:
      'https://media.licdn.com/dms/image/D5603AQEFQ9bPMTJ2Yw/profile-displayphoto-shrink_800_800/0/1686068486077?e=1703721600&v=beta&t=eh1PM9yuBTXKrlLBFtOqQcnQGOV5UpUnaHWqIQ1bO3o',
    githubURL: 'https://github.com/LynchHarrison',
    linkedURL: 'https://www.linkedin.com/in/lynchharrison/',
  },
];

const ContactForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EAMIL_SERVICE_KEY as string,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
        { name, email, message },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      sendEmail(e);
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)),
        {
          loading: 'Sending...',
          success:
            'Email received! We will contact you soon.',
          error: 'Oops! Something went wrong.',
        }
      );
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
      setName('');
      setEmail('');
      setMessage('');
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Form submission failed.');
    }
  };

  return (
    <div className=''>
      <div className='w-full '>
        <h1 className='text-center'>
          Meet the team behind Rent-A-Wrench!
        </h1>
        <div className='flex flex-row justify-evenly space-x-2 px-2'>
          {teamDummyData &&
            teamDummyData.map((person, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col text-center'
                >
                  <Image
                    className='rounded-2xl'
                    src={person.image}
                    width={100}
                    height={100}
                    alt={`image of ${person.name}`}
                  />
                  {person.name}
                  <div className='flex flex-row '>
                    <Link
                      href={person.githubURL}
                      className='hover:scale-110'
                    >
                      <Image
                        src='https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg'
                        width={50}
                        height={50}
                        alt={`image of ${person.name}`}
                      />
                    </Link>
                    <Link
                      href={person.linkedURL}
                      className='hover:scale-110'
                    >
                      <Image
                        src='https://pbs.twimg.com/profile_images/1661161645857710081/6WtDIesg_400x400.png'
                        width={50}
                        height={50}
                        alt={`image of ${person.name}`}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className='relative flex flex-col w-full py-12 md:flex-row justify-center items-center h-100 bg-gray-100 space-y-10 md:space-y-0 md:space-x-10 px-4 md:px-20'>
        <div className='md:w-1/2 text-center md:text-left space-y-4'>
          <h1 className='text-4xl font-bold mb-10 text-center md:text-left'>
            Contact Us
          </h1>
          <p className='text-gray-600 text-lg'>
            We&rsquo;d love to hear from you. Please fill
            out the form below to reach us.
          </p>
        </div>
        <form className='md:w-1/2' onSubmit={handleSubmit}>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3 mb-6'>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='from_Name'
                type='text'
                placeholder='Full Name'
                required
                name={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                id='email'
                type='email'
                placeholder='Email'
                required
                name={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='w-full px-3 mb-6'>
              <textarea
                className=' no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none'
                id='message'
                placeholder='Your Message'
                required
                name={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className='w-full flex items-start px-3'>
              <Button
                size={'lg'}
                className='mx-auto'
                variant={'default'}
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default ContactForm;
