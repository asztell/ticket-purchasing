import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import "./LinkButton.scss";

export function LinkButton({
  to = null,
  disabled,
  show = true,
  label,
  className,
  onClick,
}: {
  to: string | null;
  disabled?: boolean;
  show?: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    onClick && onClick();
    to && navigate(to);
  }, [onClick, navigate, to]);

  const linkClassName = classnames("Link-Button", className);

  if (!show) {
    return null;
  }

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
