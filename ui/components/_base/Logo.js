import { useContext } from "react";
import { GeneralContext } from "../../../contexts/general/General.Context";

// Logo.js
const Logo = () => {
  const { theme } = useContext(GeneralContext);

  return (
    <span className="flex items-center space-x-1 cursor-pointer py-2">
      <img src={`/icptokens-logo-${theme == 'dark' ? 'white' : 'colored'}.svg`} alt="ICP Tokens logo" className="w-[33px]" />
      <span className=" font-extrabold uppercase tracking-wide text-[17px] leading-none">
        ICP <br></br><span className="inline-block">Tokens</span>
      </span>
    </span>
  );
};

export default Logo;
