// import Item from './Item'
import MenuItem from './Menu_Item'
namespace Menu{
  export interface Description{
  menuId?:number | null;
  nameMenu:string;
  summary:string;
  type:string;
  is_active:Boolean;
  createdAtTime?:string;
  updatedAtTime?:string;
  image_url?:string
  items: MenuItem.Description[]
  }
}

export default Menu;
