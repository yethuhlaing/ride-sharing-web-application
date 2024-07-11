import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='absolute top-[40%] left-[50%] transform-y-[60%]'>
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-4xl font-bold'>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/dashboard/home" className='m-4'>
                    <span className='text-xs text-neutral-50 w-auto h-auto bg-primary px-10 py-2 rounded-lg'>Return Home</span>
                </Link>
            </div>
        </div>
    )
}