const SettingsFormSectionsHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex flex-col space-y-2 p-3 shadow-md bg-cyan-100/90">
      <h2 className="text-xl font-medium text-neutral-950">{title}</h2>
      {subtitle ? (
        <p className="text-sm font-normal text-neutral-800">{subtitle}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SettingsFormSectionsHeader;
