const LogoButton = ({
  label,
  imgSource,
}: {
  label: string;
  imgSource: string;
}) => {
  return (
    <button className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-[#103523] hover:backdrop-blur-sm focus:bg-[#103523] focus:backdrop-blur-sm">
      <img src={imgSource} alt={label} className="w-20 h-20" />
      <span className="text-white group-hover:text-[#2fbb77] group-focus:text-[#2fbb77] font-semibold text-xs">
        {label}
      </span>
    </button>
  );
};

export default LogoButton;
