import HeroSection from '../pages/home-page/HeroSection';
import { Features } from '../pages/home-page/FeatureSection';
import { FAQ } from '../pages/home-page/FAQSection';
import { Team } from '../pages/home-page/TeamSection';
import Footer from '../pages/home-page/FooterSection';
import { ScrollToTop } from '../components/ScrollToTop';
import { Newsletter } from '../pages/home-page/NewsletterSection';
import { AnimatedSection } from '../pages/home-page/AnimatedSection';

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
