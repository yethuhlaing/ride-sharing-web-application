import Image from 'next/image'
import React from 'react'
import FeatureImage3 from '$/public/assets/c.jpg'

function HowItWorkSection() {
    return (
        <section className="container py-20">
            <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-center dark:mt-8">
                    How It {' '}
                    <span className="text-primary bg-clip-text">
                        Works
                    </span>
                </h2>
            </div>
            <div className="flex flex-col justify-around items-center lg:flex-row lg:space-x-20">
                <div className="w-full lg:w-1/2">
                    <Image src={FeatureImage3} alt="Descriptive Alt Text" className="w-full h-auto" priority />
                </div>
                <div className='flex flex-col lg:w-1/2 mt-6 lg:mt-0 space-y-8'>
                    <h2 className="text-xl lg:text-3xl font-bold text-left"></h2>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                            <p className="text-gray-600">Create your account using your student or personal email for verification.</p>
                        </div>
                        <div >
                            <h3 className="text-xl font-semibold mb-2">Publish or Find a Ride</h3>
                            <p className="text-gray-600">Post your ride details or search for available rides.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Connect and Travel</h3>
                            <p className="text-gray-600">Communicate with your travel mates and enjoy your journey.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Rate and Review</h3>
                            <p className="text-gray-600">Share your experience and help build a trustworthy community.</p>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorkSection