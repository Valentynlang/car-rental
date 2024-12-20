import Hero from "@/components/Hero";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import CustomFilter from "@/components/CustomFilter";
import { fetchCars } from "@/utils";
import CarCard from "@/components/CarCard";
import { fuels, manufacturers, yearsOfProduction } from "@/constants";
import ShowMoreButton from "@/components/ShowMoreButton";

interface SearchParams {
  manufacturer?: string;
  year?: number;
  fuel?: string;
  limit?: number;
  model?: string;
}

export default async function Home({searchParams}: {searchParams: SearchParams}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
     model: searchParams.model || ""
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  console.log(allCars) 
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold ">
            Car Catalogue
          </h1>

          <p>
            Explore the cars available for rent, book, or buy. 
          </p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMoreButton
              pageNumber = {(searchParams.limit || 10) / 10}
              isNext = {(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2>Oops something went wrong</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
