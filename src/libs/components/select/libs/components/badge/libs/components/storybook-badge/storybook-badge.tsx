type Properties = { title: string; children: React.ReactNode };

const StorybookBadge: React.FC<Properties> = ({ title, children }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm">{title}</span>
    {children}
  </div>
);

export { StorybookBadge };
