import cn from 'classnames';

interface ContainerProps {
  className?: string;
  children?: any;
  el?: string | HTMLElement;
  clean?: boolean;
}

function Container({
  children,
  className,
  el = 'div',
  clean
}: ContainerProps) {
  const rootClassName = cn(className, {
    'mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16': !clean,
  });

  const Component: React.ComponentType<
		React.HTMLAttributes<HTMLDivElement>
	> = el as any;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
