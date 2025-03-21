/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect } from "react-icons/cg";
import { HiOutlineCheck } from "react-icons/hi";
import {
  languageData,
  rateData,
  timeData,
  yearData,
} from "../../data/filters.db";
const Filters = (props) => {
  const {
    categories,
    category,
    setCategory,
    language,
    setLanguage,
    year,
    setYear,
    rate,
    setRate,
    time,
    setTime,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = props?.data;

  const Filter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "All Categories" }]
          : [{ title: "Categories not found" }],
    },
    { value: language, onChange: setLanguage, items: languageData },
    { value: year, onChange: setYear, items: yearData },
    { value: rate, onChange: setRate, items: rateData },
    { value: time, onChange: setTime, items: timeData },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 rounded p-6">
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
