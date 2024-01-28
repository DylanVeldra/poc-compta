import { useRef, useState } from "react";
import Head from "next/head";
import { DepositAddress } from "../components/deposit-address";
import { DepositInformations } from "../components/deposit-informations";
import { useRouter } from "next/router";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import { fetchJSON } from "@shared-utils";
import { AnyQuestion } from "components/any-question";
import { LinkButton } from "@shared-components/buttons";
import { Divider } from "@shared-components/divider";
import {
  DepositDto,
  AddressDto,
  FinancialOperationDto,
  User,
} from "@shared-types";
import { DepositAmountSummary } from "components/amount-summary";
import { getAddressList } from "@shared-utils";
import { Information } from "@shared-components/information";
import DepositOperationSection from "components/deposit-operation-section/deposit-operation-section";
import { ToastGenerator } from "@shared-components/toast-generator";
import { DepositInformationsData } from "types";
import {
  FinancialOperationTable,
  depositToFinancialOperation,
} from "@shared-components/financial-operation-table";
import { PendingWithdrawalModal } from "@shared-components/modals";
import { TransactionSidePanel } from "@shared-components/transactions";

export default function Deposit() {
  const router = useRouter();
  const toastRef = useRef<any>();
  const dict = useLanguageDictionary();
  const depositInformationsRef = useRef<DepositInformationsData>();
  const [addresses, setAddresses] = useState<AddressDto[]>([]);
  const [address, setAddress] = useState<AddressDto>();
  const [deposits, setDeposits] = useState<DepositDto[]>([]);
  const [deposit, setDeposit] = useState<Partial<DepositInformationsData>>();
  const [user, setUser] = useState<User>();
  const [pendingWithdrawalModalOpen, setPendingWithdrawalModalOpen] =
    useState(false);
  const [selectedOperation, setSelectedOperation] =
    useState<FinancialOperationDto | null>(null);

  const handleOnAddressChange = (address: AddressDto) => {
    setAddress(address);
    fetchJSON(`/transaction/withdrawal/pending`)
      .then((json) => {
        if (json.body.length) {
          setPendingWithdrawalModalOpen(true);
        }
      })
      .catch(console.error);
  };

  const getDeposits = () => {
    fetchJSON("/transaction/deposit")
      .then((json) => setDeposits(json.body))
      .catch(console.error);
  };

  const getUser = () => {
    fetchJSON("/user")
      .then((json) => setUser(json.body))
      .catch(console.error);
  };

  const onProfileLoaded = () => {
    getAddressList()
      .then((addresses) => {
        setAddresses(addresses);
        getDeposits();
        getUser();
      })
      .catch(console.error);
  };

  const onCancel = (id: string) => {
    fetchJSON(`/transaction/deposit/${id}/cancel`, "PUT")
      .then(getDeposits)
      .catch(console.error);
  };

  const onSubmit = () => {
    const data: DepositInformationsData = {
      idAddress: address.id,
      rawDepositedAmount: Math.round(deposit.rawDepositedAmount * 100),
      transactionId: deposit.transactionId,
      additionalInformations: deposit.additionalInformations || "",
    };

    fetchJSON("/transaction/deposit", "POST", data)
      .then((deposit) => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.deposit.yourDeposit} (${
            deposit.body.publicId
          }) ${dict.deposit.of} ${deposit.body.rawDepositedAmount / 100}$ ${
            dict.deposit.hasBeenTaken
          }`,
          type: "SUCCESS",
          title: dict.deposit.success,
        });
        getDeposits();
        depositInformationsRef.current.emptyFields();
        setAddress(() => undefined);
      })
      .catch((e) => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent:
            dict.deposit.serverErrors[e.i18n] ??
            dict.deposit.defaultServerErrors,
          type: "ERROR",
          title: "Oops !",
        });
        console.error(e);
      });
  };

  const Aside = () => {
    return (
      <>
        <div className="hidden md:flex">
          <AnyQuestion text={dict.deposit.readTheGuide} />
        </div>
        {address ? (
          <div className="w-full md:w-auto rounded-md">
            <DepositAmountSummary
              usdAmount={deposit?.rawDepositedAmount ?? 0}
              fixedFee={address.fixedFee}
              percentFee={address.percentFee}
              fixedFeeLabel={dict.deposit.fixedFee}
              percentFeeLabel={dict.deposit.percentFee}
              finalAmount={
                (deposit?.rawDepositedAmount ?? 0) -
                address.fixedFee / 100 -
                (deposit?.rawDepositedAmount * address.percentFee ?? 0) / 100
              }
              onSubmit={onSubmit}
              netAmountLabel={dict.deposit.netAmount}
              validationLabel={dict.deposit.notify}
              disableButton={
                (deposit?.rawDepositedAmount ?? 0) < 1000 ||
                !deposit.transactionId.length
              }
              amountLabel={dict.deposit.grossAmount}
            />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const openOperation = (operation: FinancialOperationDto) => {
    setSelectedOperation(operation);
  };

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.deposit.deposit.toUpperCase()}`;

  return (
    <UserLayout
      title={dict.deposit.NotificationOfDeposit}
      pathname={router.pathname}
      onProfileLoaded={onProfileLoaded}
    >
      <ToastGenerator ref={toastRef} />
      <Head>
        <title>{title}</title>
      </Head>
      <TransactionSidePanel
        onClose={() => setSelectedOperation(null)}
        operation={selectedOperation}
      />
      <Information
        icon={"rs-info"}
        className={"mt-5 bg-darker-red"}
        text={`${dict.deposit.checkWebsite1} ${process.env.NEXT_PUBLIC_APP_NAME} ${dict.deposit.checkWebsite2}`}
      />
      <div className="flex justify-center">
        <DepositOperationSection
          aside={<Aside />}
          header={
            <h3 className="text-lg font-semibold">{dict.deposit.notify}</h3>
          }
          subtitle={dict.deposit.chooseDepositAddress}
          addresses={addresses}
          address={address}
          onAddressChange={handleOnAddressChange}
          marginBottom={address ? true : false}
        >
          {address && (
            <DepositAddress
              token={address.token}
              address={user.address}
              protocolName={address.protocolName}
            />
          )}
          <div className="mb-10 md:mb-0">
            <DepositInformations
              onChange={setDeposit}
              ref={depositInformationsRef}
            />
          </div>
        </DepositOperationSection>
      </div>
      <PendingWithdrawalModal
        isOpen={pendingWithdrawalModalOpen}
        onClose={() => setPendingWithdrawalModalOpen(false)}
      />
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg mb-[40px]">{dict.deposit.lastDeposits}</h3>
          <LinkButton
            label={dict.deposit.seeMore}
            onClick={() => router.push(`/history`)}
          />
        </div>
        <Divider className="h-0.5" />
        <div className="hidden lg:block">
          <FinancialOperationTable
            emptyTableLabel={dict.deposit.noDeposits}
            operations={deposits.map(depositToFinancialOperation)}
            headers={{
              token: dict.deposit.token,
              publicId: dict.deposit.publicId,
              emitDate: dict.history.notificationDate,
              rawAmount: dict.deposit.grossAmount,
              netAmount: dict.deposit.netAmount,
              transactionId: dict.deposit.transactionId,
              status: dict.deposit.status,
              finalized: "",
            }}
            onCancel={onCancel}
            openOperation={openOperation}
          />
        </div>
        <div className="block lg:hidden">
          <FinancialOperationTable
            emptyTableLabel={dict.deposit.noDeposits}
            operations={deposits.map(depositToFinancialOperation)}
            headers={{
              token: dict.deposit.token,
              publicId: dict.deposit.publicId,
              emitDate: dict.history.notificationDate,
              netAmount: dict.deposit.netAmount,
              status: dict.deposit.status,
            }}
            onCancel={onCancel}
            openOperation={openOperation}
          />
        </div>
      </div>
    </UserLayout>
  );
}
