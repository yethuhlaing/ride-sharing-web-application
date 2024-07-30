import image from './../../public/assets/growth.png';
import image3 from './../../public/assets/reflecting.png';
import image4 from './../../public/assets/looking-ahead.png';
import { StaticImageData } from 'next/image';
import FeatureImage1 from '@@/public/assets/a.jpg'
import FeatureImage2 from '@@/public/assets/b.jpg'

import Image from 'next/image'


export default function Features(){
    return (
        <section className="container space-x-0 lg:space-x-8 lg:space-y-14">
            <div>
                <h2 className="text-2xl lg:text-4xl font-bold text-center dark:mt-8">
                    Why WeGo{' '}
                    <span className="text-primary bg-clip-text">
                        Stands Out
                    </span>
                </h2>
            </div>
            <div className="flex flex-col justify-around lg:flex-row items-center lg:space-x-12">
                <div className="w-full lg:w-1/2">
                    <Image src={FeatureImage1} alt="Descriptive Alt Text" className="w-full h-auto rounded-lg" priority />
                </div>
                <div className='flex flex-col lg:w-1/2 mt-6 lg:mt-0 space-y-8'>
                    <div className="w-full">
                        <h2 className="text-xl lg:text-3xl font-bold mb-4">Share Your Journey, Share the Cost</h2>
                        <p className="text-base">
                            Have empty seats in your car? Offer them to fellow students and split the travel expenses. It's an easy and eco-friendly way to travel.
                        </p>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl lg:text-3xl font-bold mb-4">Join the Ride, Make New Friends</h2>
                        <p className="text-base">
                            Looking for a ride? Quickly find and join rides published by other students. It's a convenient way to meet new people and travel together.                        
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around lg:flex-row items-center lg:space-x-12">
                <div className='flex flex-col lg:w-1/2 mt-6 lg:mt-0 space-y-8'>
                    <div className="w-full">
                        <h2 className="text-xl lg:text-3xl font-bold mb-4">Travel Smart, Save More</h2>
                        <p className="text-base">
                            Reduce your travel costs by sharing rides. It's a budget-friendly solution that helps you save money on every trip.
                        </p>
                    </div>
                    <div className="w-full">
                        <h2 className="text-xl lg:text-3xl font-bold mb-4">Explore New Places with Our Community</h2>
                        <p className="text-base">
                            Discover lots of new locations every month. Our worldwide community of students shares their best experiences and locations, giving you endless opportunities to explore.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <Image src={FeatureImage2} alt="Descriptive Alt Text" className="w-full h-auto rounded-lg" priority />
                </div>
            </div>
        </section>
    )
}




// export const Features = () => {
//     return (
//         <section id="features" className="container py-24 sm:py-32 space-y-8">
            // <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
            //     Why Students{' '}
            //     <span className="text-primary bg-clip-text">
            //         Love Our Service
            //     </span>
            // </h2>

//             <div className="flex flex-wrap text-lg md:justify-center gap-4">
//                 {featureList.map((feature: string) => (
//                     <div key={feature}>
//                         <Badge variant="secondary" className="text-sm">
//                             {feature}
//                         </Badge>
//                     </div>
//                 ))}
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
//                 {features.map(({ title, description, image }: FeatureProps) => (
//                     <Card key={title} className="border-0">
//                         <CardHeader>
//                             <CardTitle>{title}</CardTitle>
//                         </CardHeader>

//                         <CardContent>{description}</CardContent>

//                         <CardFooter>
//                             <div>
//                                 <img
//                                     src={image.src}
//                                     alt="About feature"
//                                     className="w-[200px] lg:w-[250px] mx-auto"
//                                 />
//                             </div>
//                         </CardFooter>
//                     </Card>
//                 ))}
//             </div>
//         </section>
//     );
// };
