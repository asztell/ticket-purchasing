import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function LinkButton({
  to,
  disabled,
  label,
  className,
  onClick, // remove onClick
}: {
  to: string;
  disabled?: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    onClick && onClick();
    navigate(to);
  }, [onClick, navigate, to]);

  const linkClassName = "LinkButton" + (className ? " " + className : "");

  return (
    <div>
      <button
        disabled={disabled}
        onClick={handleButtonClick}
        className={linkClassName}
      >
        {label}
      </button>
    </div>
  );
}
