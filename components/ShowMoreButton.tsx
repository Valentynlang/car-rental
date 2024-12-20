"use client"

import { ShowMoreButtonProps } from "@/types"
import { useRouter} from "next/navigation"
import CustomButton from "./CustomButton"
import { updateSearchParams } from "@/utils"

const ShowMoreButton = ({pageNumber, isNext}: ShowMoreButtonProps) => {
  const router = useRouter()

  const handleNavigate = () => {
    const newLimit = (pageNumber + 1) * 10
    const newPathName = updateSearchParams("limit", `${newLimit}`)

    router.push(newPathName, {scroll: false})
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton
                title="Show More"
                btnType="button"
                containerStyle="bg-primary-blue text-white rounded-full"
                handleClick={handleNavigate}
            />
        )}
    </div>
  )
}

export default ShowMoreButton