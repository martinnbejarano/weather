/* eslint-disable react/prop-types */
export const MainDataBox = ({ icon, info, text }) => (
  <div className="flex flex-col min-w-44 min-h-40 items-center justify-center gap-2 border-2 border-zinc-600/75 rounded-md p-5">
    <p className="text-xl">{icon}</p>
    <p className="font-bold text-2xl">{info}</p>
    <p>{text}</p>
  </div>
);
