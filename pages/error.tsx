import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const reload = () => {
    router.push("/");
  };

  return (
    <div className="grid h-screen place-items-center">
      <span className="text-gray-500 ">
        <ExclamationCircleIcon className="inline-block w-10 h-10 mr-3 fill-red-400" />
        An Error Has Occurred.
        <div className="pt-4 text-center">
          <button
            className="px-4 py-2 font-bold text-white bg-[#007abc] rounded hover:bg-[#005a8a]"
            onClick={reload}
          >
            Reload
          </button>
        </div>
      </span>
    </div>
  );
};

export default ErrorPage;
