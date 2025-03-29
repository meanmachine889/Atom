import List01 from "./list-01";
import List02 from "./list-02";
import List03 from "./list-03";
import { StatsChart } from "./chart";
import WalletList from "./address";
import CryptoList from "./prices";

export default function Content() {
  return (
    <div className="space-y-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="bg-white dark:bg-[#0F0F12] p-0 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex-1 w-full flex">
            <List01 className="h-full w-full flex-1" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex-1 w-full flex">
            <WalletList className="h-full w-full flex-1" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex-1 w-full flex">
            <List02 className="h-full w-full flex-1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-0 border-t dark:border-[#1F1F23]">
        <div className="bg-white m-0 mx-0 px-0 col-span-2 p-0 w-full rounded-none dark:bg-[#101010] flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
          <StatsChart />
        </div>
        <CryptoList />
      </div>

      <div className="grid gap-0 p-0 border-t dark:border-[#1F1F23]">
        <List03 />
      </div>
    </div>
  );
}
