import { SubWindow } from "@shared-components/sub-window";
import { useLanguageDictionary } from "@shared-hooks";
import { DateFormats, formatDate, getTimeRemaining } from "@shared-utils";

interface RestrictedWithdrawalProps {
  pendingDeposit: boolean;
  lastDepositDate: string;
}

export const RestrictedWithdrawal = (props: RestrictedWithdrawalProps) => {
  const dict = useLanguageDictionary();

  const { pendingDeposit, lastDepositDate } = props;

  const timeRemaining = getTimeRemaining(lastDepositDate, 30);

  return (
    <>
      {pendingDeposit ? (
        <div className="flex justify-center w-full mt-[35px] md:w-[50%] mb-10">
          <div className="flex w-full justify-center md:w-[900px] bg-green">
            <SubWindow header={dict.withdrawal.request}>
              <div className="flex flex-col items-center justify-center h-[240px]">
                <div className="bg-white text-black w-[100px] h-[100px] flex items-center justify-center">
                  100x100
                </div>
                <div className="mt-[30px] md:w-[480px] text-md text-center flex flex-wrap">
                  {dict.withdrawal.pendingDepositWaiting}
                </div>
              </div>
            </SubWindow>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-[35px]">
          <div className=" flex w-full md:w-[900px]">
            <SubWindow header={dict.withdrawal.request}>
              <div className="flex flex-col items-center justify-center h-[240px]">
                <div className="bg-white text-black w-[100px] h-[100px] flex items-center justify-center">
                  100x100
                </div>
                <div className="mt-[30px] md:w-[480px] text-md text-center flex flex-wrap">
                  {dict.withdrawal.yourLastDeposit}{" "}
                  {formatDate(lastDepositDate, DateFormats.SHORT)}.{" "}
                  {dict.withdrawal.remaining} {timeRemaining.time}{" "}
                  {timeRemaining.type} {dict.withdrawal.daysBeforeDeposit}
                </div>
              </div>
            </SubWindow>
          </div>
        </div>
      )}
    </>
  );
};
