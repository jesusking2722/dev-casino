import {
  Button,
  MainSlider,
  TopSlider,
  NoveltySlider,
  JackpotSlider,
  ProviderSlider,
  LiveSlider,
  TableSlider,
  BonusSlider,
  TournamentSlider,
} from "../../components";
import {
  INITIAL_BONUS_SLIDES,
  INITIAL_JACKPOT_SLIDES,
  INITIAL_LIVE_SLIDES,
  INITIAL_MAIN_SLIDES,
  INITIAL_PROVIDER_SLIDES,
  INITIAL_TABLE_SLIDES,
  INITIAL_TOP_SLIDES,
  INITIAL_TOURNAMENT_SLIDES,
} from "../../constant";

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
      <JackpotSlider slides={INITIAL_JACKPOT_SLIDES} />
      <ProviderSlider slides={INITIAL_PROVIDER_SLIDES} />
      <LiveSlider slides={INITIAL_LIVE_SLIDES} />
      <TableSlider slides={INITIAL_TABLE_SLIDES} />
      <BonusSlider slides={INITIAL_BONUS_SLIDES} />
      <TournamentSlider slides={INITIAL_TOURNAMENT_SLIDES} />
      <div className="w-full flex flex-col gap-4">
        <h1 className="font-semibold text-white text-xl">
          JadeJack licensed online casino in Russia
        </h1>
        <div className="w-full h-[400px] overflow-x-hidden overflow-y-scroll"></div>
      </div>
    </div>
  );
};

export default Home;
