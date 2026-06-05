
export type ResourceList = {
    titleHeader: string;
    dropdowns: DropdownList[];
  };

export type DropdownList = {
  title: string;
  items: DropdownItem[];
};

export type DropdownItem = {
  text: string;
  href: string;
};