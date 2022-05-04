import { classNames } from "@lib/classnames";

type CardHeaderProps = {
  title: string;
  subtitle?: string;
};

function Header(props: CardHeaderProps) {
  return (
    <div className="bg-white p-6">
      <h2 className="text-lg leading-6 font-medium text-gray-900">
        {props.title}
      </h2>
      <p className="mt-1 text-sm text-gray-500">{props.subtitle}</p>
    </div>
  );
}

type CardContentProps = {
  children: React.ReactNode;
  as?: string;
  noWrapper?: boolean;
};

function Content(props: CardContentProps) {
  if (props.noWrapper) {
    return <div>{props.children}</div>;
  }

  return (
    <div className="bg-white px-6 pb-6">
      <div
        className={classNames(
          props.as === "div" ? "" : "grid grid-cols-4 gap-6"
        )}
      >
        {props.children}
      </div>
    </div>
  );
}

type CardFooterProps = {
  children: React.ReactNode;
};

function Footer(props: CardFooterProps) {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      {props.children}
    </div>
  );
}

type CardProps = {
  children: React.ReactNode;
};

export default function Card(props: CardProps) {
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      {props.children}
    </div>
  );
}

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
