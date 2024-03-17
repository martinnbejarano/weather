/* eslint-disable react/prop-types */
export const Icon = ({ icon, textOnHover }) => (
  <div className="icon group">
    {icon}
    {textOnHover && (
      <span className="icon-tooltip group-hover:scale-100">{textOnHover}</span>
    )}
  </div>
);
