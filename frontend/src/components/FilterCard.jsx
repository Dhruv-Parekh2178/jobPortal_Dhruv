
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Ahmedabad"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1Lakh", "1Lakh-5Lakh"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log(selectedValue);
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="hidden md:block w-full flex flex-col gap-3">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={data.filterType}>
          <h1 className="font-semibold text-xl">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={item} className="flex gap-1 items-center mt-1">
                <input
                  type="radio"
                  name={data.filterType}
                  checked={selectedFilters[data.filterType] === item}
                  onChange={() => handleFilterChange(data.filterType, item)}
                  onClick={() => changeHandler(item)}
                  value={item}
                  id={itemId}
                />
                <label htmlFor={itemId} className="text-sm cursor-pointer">{item}</label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
