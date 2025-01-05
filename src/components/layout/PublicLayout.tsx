import Header from '../Header/Header';
import ArtistHero from '../Hero/ArtistHero';
import LatestRelease from '../Release/LatestRelease';
import DistroLinks from '../Distribution/DistroLinks';
import OtherReleases from '../Release/OtherReleases';
import Subscribe from '../Subscribe/Subscribe';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ArtistHero />
      <LatestRelease />
      <DistroLinks />
      <OtherReleases />
      <Subscribe />
    </div>
  );
}