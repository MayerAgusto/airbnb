
import {IconType } from "react-icons"

interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value : string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = (
    {icon: Icon, label, selected, onClick}
) => {

    return ( 
        <div
        onClick={() => onClick(label)}
        className={`
         rounded-xl
         border-2
         p-4
         flex
         flex-row
         gap-3
         hover:border-green-300
         hover:text-green-300
         transition
         cursor-pointer
         ${selected ? "text-green-500 border-green-500":"border-neutral-200"}
         `}
        >
            <Icon 
                size={30}
            />
            <div className="font-semibold">
                {label}

            </div>
        </div>
     );
}
 
export default CategoryInput;