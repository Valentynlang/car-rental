"use client"
import Image from "next/image"
import React, { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import { useRouter } from "next/navigation"

const SearchButton = ({otherClasses}: {otherClasses: string}) => (
    <button type="submit" className={`-ml-10 z-10 ${otherClasses}`}>
        <Image src="/magnifying-glass.svg" alt="search" width={30} height={30} className="object-contain" />
    </button>
)

const SearchBar = () => {
  const[manufacturer, setManufacturer] = useState("")
  const[model, setModel] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer === "" && model === "") {
      return alert("Please enter a manufacturer or model")     
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams =(model: string, manufacturer: string) => {
    const params = new URLSearchParams(window.location.search)

    if (model) {
      params.set("model", model)
    }else {
      params.delete("model")
    }

    if (manufacturer) {
      params.set("manufacturer", manufacturer)
    } else {
      params.delete("manufacturer")
    }

    const newPathname = `${window.location.pathname}?${params.toString()}`

    router.push(newPathname, {scroll: false})
  }  
  
  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            />

            <SearchButton otherClasses="sm:hidden" />
        </div>

        <div className="searchbar__item">
          <Image src="/model-icon.png" alt="car model" width={20} height={20} className="absolute ml-4" />

          <input 
            type="text" 
            name="model" 
            placeholder="Tiguan" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            className="searchbar__input"
          />

          <SearchButton otherClasses="sm:hidden " />
        </div>
        <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar