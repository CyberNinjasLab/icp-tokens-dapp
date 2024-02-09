// Logo.js
const Logo = () => {
  return (
    <span className="flex items-center space-x-4 cursor-pointer">
      <img src="/logo.png" alt="ICP Tokens logo" className="w-[28px]" />
      <span className="font-semibold uppercase tracking-wide text-base">
        ICP<span className="text-[#019a9a]">Tokens</span>
      </span>
    </span>
  );
};

export default Logo;
