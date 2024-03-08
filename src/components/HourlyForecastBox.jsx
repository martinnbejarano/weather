/* eslint-disable react/prop-types */
export const HourlyForecastBox = ({ temp_c, condition, hour }) => {
  return (
    <div className="flex flex-col gap-2 p-2 border border-zinc-600/75 rounded-md items-center">
      <span>{hour}</span>
      <img src={condition} alt="condition" />
      <span>{temp_c}°</span>
    </div>
  );
};
