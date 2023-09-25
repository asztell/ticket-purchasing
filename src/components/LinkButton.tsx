import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import "./LinkButton.scss";

export function LinkButton({
  to,
  disabled,
  label,
  className,
  onClick,
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

  const linkClassName = classnames("LinkButton", className);

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
