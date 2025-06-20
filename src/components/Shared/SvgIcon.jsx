import { iconsData } from "@/data/iconsData";

const SvgIcon = ({ name }) => {
  const iconData = iconsData.find((iconData) => iconData?.name === name);

  if (!iconData) {
    console.warn(`Icon with name "${name}" is not found.`);
    return null;
  }

  return iconData?.icon;
};

export default SvgIcon;
