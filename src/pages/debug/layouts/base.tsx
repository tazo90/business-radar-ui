interface BaseLayoutProps {
  children?: any;
}

const DebugLayout = ({ children }: BaseLayoutProps) => {
  return <div>{children}</div>;
};
export default DebugLayout;
