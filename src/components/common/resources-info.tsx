import SkeletonLoader from "@components/ui/form/skeleton-loader";
import icons from "@constants/icons";

type ResourcesInfoProps = {
  items: any[] | null;
  type: string;
  organization?: string;
  iconField: string;
  nameField: string;
};

export default function ResourcesInfo(props: ResourcesInfoProps) {
  const { items, type, organization, iconField, nameField } = props;

  const icon = organization ? icons[organization][type] : icons[type];

  return (
    <div className="flex items-center space-x-2 pt-2 text-sm text-gray-500">
      {items === null && <SkeletonLoader />}
      <div className="grid grid-cols-2 gap-y-4 gap-x-10">
        {items?.map((item) => {
          const iconName = item[iconField];
          const itemName = item[nameField];
          return (
            <div className="flex" key={item.id}>
              <img
                key={item.id}
                className="max-w-none h-6 w-6 rounded-full ring-2 ring-white mr-2"
                src={icon[iconName.toLowerCase()]}
                alt={itemName}
              />
              <span>{itemName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
