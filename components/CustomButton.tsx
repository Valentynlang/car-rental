"use client"
import Image from "next/image"
import { CustomButtonProps } from "@/types"

const CustomButton = ({title, containerStyle, handleClick, btnType, textStyle, icon}: CustomButtonProps) => {
  return (
    <button 
    disabled={false}
    type={btnType ||"button"}
    className={`custom-btn ${containerStyle}`}
    onClick={handleClick}
    >
        <span className={`flex-1 ${textStyle}`}>
            {title}
        </span>
        {icon && (
            <div className="relative w-6 h-6">
                <Image src={icon} alt="icon" fill className="object-contain" />
            </div>
        )}
    </button>
  )
}

export default CustomButton