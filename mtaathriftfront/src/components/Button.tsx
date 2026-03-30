import '../App.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "submit", disabled }) => {
  return (
    <button
      type={type}          
      onClick={onClick}
      disabled={disabled}
      className="btn"
    >
      {label}
    </button>
  );
};

export default Button;