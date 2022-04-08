import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { DatePeriod } from "../types/datePeriod";
import { DatePeriodStore } from "../stores/datePeriodStore";

export default function DatePeriodSelector() {
  const datePeriod = DatePeriodStore.useState((s) => s.datePeriod);

  const menuItemButtonClasses = (isActive: boolean, isSelected: boolean) => {
    let conditionalClasses = "";
    if (isActive) {
      conditionalClasses = "bg-[#007abc] text-white";
    } else if (isSelected) {
      conditionalClasses = "bg-[#007abc] text-gray-200 opacity-60";
    } else {
      conditionalClasses = "text-gray-900";
    }

    return `group flex rounded-md items-center w-full my-1 px-2 py-2 text-sm ${conditionalClasses}`;
  };

  const handleClick = (datePeriod: DatePeriod) => {
    DatePeriodStore.update((s) => {
      s.datePeriod = datePeriod;
    });
  };

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <CalendarIcon className="w-5 h-5 text-white cursor-pointer" />
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-white hover:text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(DatePeriod.LAST_SEVEN_DAYS)}
                    className={menuItemButtonClasses(
                      active,
                      datePeriod === DatePeriod.LAST_SEVEN_DAYS
                    )}
                  >
                    Last 7 Days
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(DatePeriod.LAST_FOURTEEN_DAYS)}
                    className={menuItemButtonClasses(
                      active,
                      datePeriod === DatePeriod.LAST_FOURTEEN_DAYS
                    )}
                  >
                    Last 14 Days
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(DatePeriod.LAST_THIRTY_DAYS)}
                    className={menuItemButtonClasses(
                      active,
                      datePeriod === DatePeriod.LAST_THIRTY_DAYS
                    )}
                  >
                    Last 30 Days
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(DatePeriod.LAST_NINETY_DAYS)}
                    className={menuItemButtonClasses(
                      active,
                      datePeriod === DatePeriod.LAST_NINETY_DAYS
                    )}
                  >
                    Last 90 Days
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
