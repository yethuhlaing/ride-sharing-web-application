import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import image from './../../public/assets/growth.png';
import image3 from './../../public/assets/reflecting.png';
import image4 from './../../public/assets/looking-ahead.png';
import { StaticImageData } from 'next/image';
interface FeatureProps {
    title: string;
    description: string;
    image: StaticImageData;
}

const features: FeatureProps[] = [
    {
        title: 'Publish Your Ride',
        description:
            'Offer your empty seats to fellow students and share the cost.',
        image: image4,
    },
    {
        title: 'Find a Ride',
        description: 'Easily find and join rides published by other students.',
        image: image3,
    },
    {
        title: 'Save Money',
        description: 'Reduce travel costs by sharing rides.',
        image: image,
    },
];

const featureList: string[] = ['Affordable', 'Fast', 'Features', 'Pricing'];

export const Features = () => {
    return (
        <section id="features" className="container py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                Why Students{' '}
                <span className="text-primary bg-clip-text">
                    Love Our Service
                </span>
            </h2>

            <div className="flex flex-wrap text-lg md:justify-center gap-4">
                {featureList.map((feature: string) => (
                    <div key={feature}>
                        <Badge variant="secondary" className="text-sm">
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {features.map(({ title, description, image }: FeatureProps) => (
                    <Card key={title} className="border-0">
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>

                        <CardContent>{description}</CardContent>

                        <CardFooter>
                            <img
                                src={image.src}
                                alt="About feature"
                                className="w-[200px] lg:w-[250px] mx-auto"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};
