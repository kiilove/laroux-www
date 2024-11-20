// src/components/common/Button.js
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses = "px-6 py-2 rounded-full transition-all duration-300";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100",
    secondary: "bg-black text-white hover:bg-gray-800",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
