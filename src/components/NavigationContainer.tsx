import classnames from "classnames";
import "./NavigationContainer.scss";

export function NavigationContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  className = classnames("Navigation-Container", className);
  return <div className={className}>{children}</div>;
}
