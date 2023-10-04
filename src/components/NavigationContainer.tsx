import classnames from "classnames";
import "./NavigationContainer.scss";

export function NavigationContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const combinedClassName = classnames("Navigation-Container", className);
  return <div className={combinedClassName}>{children}</div>;
}
