
import Recipe from './Recipe'
namespace Ingredient{
  export interface Description{
  ingredientId?:number | null;
  nameIngredient:string;
  summary:string;
  quantity?:number;
  unit?:string;
  createdAtTime?:string;
  updatedAtTime?:string;
  image_url?:string
  imageFile?:string;
  items?:Recipe.Description[]
  }
}




export default Ingredient;



