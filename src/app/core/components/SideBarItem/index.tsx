import { Link } from "react-router-dom";
import classNames from "classnames";

type Props = {
  path: string;
  name: string;
  icon: any;
  iconActive?: any;
};

const SideBarItem: React.FC<Props> = ({ path, name, ...props }) => {
  const isCurrent = location.pathname.includes(path);
  const rootClass = classNames(
    "text-secondary flex items-center menu-horizontal px-12  py-3 pl-8 text-md font-bold rounded-full",
    {
      "bg-primary text-secondary": isCurrent,
    }
  );
  const iconClass = classNames("mr-2 flex-shrink-0 h-4 w-4", {
    "text-secondary font-bold": isCurrent,
    "text-secondary": !isCurrent,
  });

  return (
    <li>
      <Link to={path} className="hover:bg-transparent focus:bg-transparent">
        <div className={rootClass}>
          {props.icon &&
            (isCurrent ? (
              props.iconActive ? (
                <props.iconActive className={iconClass} aria-hidden="true" />
              ) : (
                <props.icon className={iconClass} aria-hidden="true" />
              )
            ) : (
              <props.icon className={iconClass} aria-hidden="true" />
            ))}
          <span className="text-md">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default SideBarItem;
