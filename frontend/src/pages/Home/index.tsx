import { Button, MainSlider, TopSlider, NoveltySlider } from "../../components";
import { INITIAL_MAIN_SLIDES, INITIAL_TOP_SLIDES } from "../../constant";

const Home = () => {
  return (
    <div className="py-10 flex flex-col gap-20">
      <MainSlider slides={INITIAL_MAIN_SLIDES} />
      <TopSlider slides={INITIAL_TOP_SLIDES} />
      <div className="w-full flex flex-row items-center justify-between py-4 px-8 rounded-xl border border-[#1F1F21]">
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-col items-start justify-center">
            <p className="font-semibold text-white font-sans text-lg">
              Install the application
            </p>
            <h2 className="font-semibold text-[#2fbb77] text-xl">
              TAKE ENTERTAINMENT WITH YOU
            </h2>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Button type="icon" iconImg="playstore" />
            <Button type="icon" icon="ls:apple" />
          </div>
        </div>
        <img src="./assets/logo.webp" alt="LOGO" className="w-24 h-auto" />
      </div>
      <NoveltySlider slides={INITIAL_TOP_SLIDES} />
    </div>
  );
};

export default Home;
