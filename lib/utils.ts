import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const setNewOffset = (card :HTMLDivElement, mouseMoveDir = { x: 0, y: 0}) =>{
  const offsetLeft = card.offsetLeft - mouseMoveDir.x
  const offsetTop = card.offsetTop - mouseMoveDir.y
  return{
      x: offsetLeft < 0 ? 0 : offsetLeft,
      y: offsetTop < 0 ? 0 : offsetTop
  }
  };

 export const autoGrow = (textAreaRef: TextArea) => {
  const { current }: TextArea = textAreaRef;
  current.style.height= "auto"
  current.style.height = current.scrollHeight + "px";
}

export const setZIndex = (selectedCard : any) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card :any) => {
      if (card !== selectedCard) {
          card.style.zIndex = selectedCard.style.zIndex - 1;
      }
  });
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const authFormSchema = (type: string) => z.object({
  // sign up
  email: z.string().email(),
  password: z.string().min(8),
})

export const  bodyParser = (value : any) => {
  try {
      return JSON.parse(value);
  } catch (error) {
      return value;
  }
};
