import HeroSection from '../pages/HeroSection';
import { Features } from '../pages/FeatureSection';
import { FAQ } from '../pages/FAQSection';
import { Team } from '../pages/TeamSection';
import Footer from '../pages/FooterSection';
import { ScrollToTop } from '../components/specific/ScrollToTop';
import { Newsletter } from '../pages/NewsletterSection';
import { AnimatedSection } from '../pages/AnimatedSection';

export default async function Home() {
    // const { isAuthenticated } = getKindeServerSession()

    // if (await isAuthenticated()) {
    //   return redirect('/dashboard')
    // }
    return (
        <>
            <ScrollToTop />
            <HeroSection />
            <Features />
            <AnimatedSection />
            <Team />
            <FAQ />
            <Newsletter />
            <Footer />
        </>
    );
}
