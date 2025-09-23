import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { LiveStats } from '../components/LiveStats';
import { Pricing } from '../components/Pricing';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <LiveStats />
      <Pricing />
    </div>
  );
};