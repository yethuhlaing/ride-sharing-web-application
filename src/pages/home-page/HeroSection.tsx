import { Button } from '@/components/ui/button';
import RetroGrid from '@/components/ui/retro-grid';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function HeroSection() {
    return (
        <section className="relative flex items-center justify-center bg-background h-[80vh]">
            <div className="flex items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
                <div className="max-w-3xl mx-auto text-center">
                    <div>
                        <span className="w-auto px-6 py-3 rounded-full bg-secondary">
                            <span className="text-sm font-medium text-primary">
                                Join our Stuent Ride-sharing Community!
                            </span>
                        </span>
                        <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                            Get a Ride,
                            <span className="text-primary">Save More!</span>
                        </h1>
                        <p className="max-w-xl mx-auto mt-8 text-base lg:text-base text-secondary-foreground">
                            As a student-led startup, we are dedicated to
                            providing an exceptional transportation solution
                            that makes your daily commute and travels between
                            inter-cities hassle-free and enjoyable.
                        </p>
                    </div>
                    <div className="flex justify-center max-w-sm mx-auto mt-6">
                        <RegisterLink>
                            <Button size="lg" className="w-full">
                                Get Started
                            </Button>
                        </RegisterLink>

                        <Button
                            size="lg"
                            className="ml-4 md:ml-6 text-secondary-foreground bg-secondary"
                        >
                            Download App
                        </Button>
                    </div>
                </div>
            </div>
            <RetroGrid />
        </section>
    );
}
