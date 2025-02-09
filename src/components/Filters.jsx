import { Fragment, useState } from "react";
import { CategoriesData } from "../../data/categories.db";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect } from "react-icons/cg";
import { HiOutlineCheck } from "react-icons/hi";

const yearData = [
  { title: "Sort by year" },
  { title: "1900-1920" },
  { title: "1920-1940" },
  { title: "1940-1960" },
  { title: "1960-1980" },
  { title: "1980-2000" },
];

const timeData = [
  { title: "Sort by time" },
  { title: "1h -2h" },
  { title: "2h -3h" },
  { title: "3h -4h" },
  { title: "4h -5h" },
];

const rateData = [
  { title: "Sort by rates" },
  { title: "1 star" },
  { title: "2 stars" },
  { title: "3 stars" },
  { title: "4 stars" },
  { title: "5 stars" },
];

const Filters = () => {
  const [category, setCategory] = useState({ title: "Category" });
  const [year, setYear] = useState(yearData[0]);
  const [rate, setRate] = useState(rateData[0]);
  const [time, setTime] = useState(timeData[0]);

  const Filter = [
    { value: category, onChange: setCategory, items: CategoriesData || [] },
    { value: year, onChange: setYear, items: yearData },
    { value: rate, onChange: setRate, items: rateData },
    { value: time, onChange: setTime, items: timeData },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-4 grid-cols-2 lg:gap-12 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-main border text-white border-gray-800 rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <CgSelect
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {option.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <HiOutlineCheck
                              className="size-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filters;
