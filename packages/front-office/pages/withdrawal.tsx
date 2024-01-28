import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { UserLayout } from "@shared-components/user-layout";
import { useLanguageDictionary } from "@shared-hooks";
import {
  fetchJSON,
  getTimeRemaining,
  lessThanOneMonthAgo,
} from "@shared-utils";
import {
  DeleteWithdrawalModal,
  TwoFactorsAuthenticationModal,
} from "@shared-components/modals";
import { Divider } from "@shared-components/divider";
import {
  User,
  CredentialsWithAuthenticationCodes,
  AddressDto,
  FinancialOperationDto,
  WithdrawalDto,
  Token,
  Protocol,
  DepositDto,
  WithdrawalInformationsData,
} from "@shared-types";
import { LinkButton } from "@shared-components/buttons";
import { ToastGenerator } from "@shared-components/toast-generator";
import { WithdrawalOperationSection } from "components/withdrawal-operation-section";
import { AnyQuestion } from "components/any-question";
import { WithdrawalAmountSummary } from "components/amount-summary";
import WithdrawalInformations from "components/withdrawal-informations/withdrawal-informations";
import {
  FinancialOperationTable,
  withdrawalToFinancialOperation,
} from "@shared-components/financial-operation-table";
import DraftWithdrawal from "components/draft-withdrawal/draft-withdrawal";
import { PendingWithdrawal } from "components/pending-withdrawal";

// Yup Validation helper
import { withdrawalRequestValidation } from "@shared-utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RestrictedWithdrawal } from "components/restricted-withdrawal";
import { TransactionSidePanel } from "@shared-components/transactions";

export default function Withdrawal() {
  const router = useRouter();
  const dict = useLanguageDictionary();
  const toastRef = useRef<any>();
  const withdrawalInformationsRef = useRef<WithdrawalInformationsData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addresses, setAddresses] = useState<AddressDto[]>([]);
  const [address, _setAddress] = useState<AddressDto>();
  const [lastDeposit, setLastDeposit] = useState<DepositDto>();
  const [pendingDeposit, setPendingDeposit] = useState<DepositDto>();
  const [balance, setBalance] = useState<number>();

  const setAddress = useCallback(
    (address: AddressDto) => {
      _setAddress(address);
    },
    [_setAddress]
  );

  const [withdrawals, setWithdrawals] = useState<WithdrawalDto[]>([]);
  const [pendingWithdrawal, setPendingWithdrawal] = useState<WithdrawalDto>();
  const [draftWithdrawal, setDraftWithdrawal] = useState<WithdrawalDto>();
  const [withdrawal, setWithdrawal] = useState<WithdrawalInformationsData>({});
  const [twoFactorsModalToCreateOpen, setTwoFactorsModalToCreateOpen] =
    useState(false);
  const [twoFactorsModalToUpdateOpen, setTwoFactorsModalToUpdateOpen] =
    useState(false);
  const [deleteWithdrawalModalOpen, setDeleteWithdrawalModalOpen] =
    useState(false);
  const [selectedOperation, setSelectedOperation] =
    useState<FinancialOperationDto | null>(null);
  const {
    trigger,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm({
    resolver: yupResolver(
      withdrawalRequestValidation(withdrawal, address, balance).schema
    ),
    defaultValues: withdrawalRequestValidation(withdrawal, address, balance)
      .initialValues,
    mode: "onBlur",
  });

  const updateAddressObject = (
    name: "emitterAddress" | "netRequestedAmount",
    value: string | number
  ) => {
    setValue(name, value);
    if (name === "emitterAddress" && value) trigger(name);
    if (name === "netRequestedAmount") trigger(name);
  };

  const checkPendingDeposit = () => {
    fetchJSON("/transaction/deposit/last?status=PENDING")
      .then((json) => {
        setPendingDeposit(json.body);
      })
      .catch(console.error);
  };

  const checkLastDeposit = () => {
    fetchJSON("/transaction/deposit/last?status=VALIDATED")
      .then((json) => {
        setLastDeposit(json.body);
      })
      .catch(console.error);
  };

  const getWithdrawals = () => {
    checkLastDeposit();
    checkPendingDeposit();
    fetchJSON("/transaction/withdrawal")
      .then((json) => {
        const draftWithdrawal = json.body.filter(
          (w: WithdrawalDto) => w.status === "DRAFT"
        )[0];
        if (draftWithdrawal) {
          setDraftWithdrawal(draftWithdrawal);
        }
        setPendingWithdrawal(
          json.body.filter((w: WithdrawalDto) => w.status === "PENDING")[0]
        );
        setWithdrawals(json.body);
      })
      .catch(console.error);
  };

  const getBalance = () => {
    fetchJSON("/balance").then((json) => {
      setBalance(json.body);
    });
  };

  const onProfileLoaded = (user: User) => {
    fetchJSON("/address/enabled", "GET")
      .then((addresses) => {
        setAddresses(addresses.body);
        getWithdrawals();
        getBalance();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const deleteWithdrawal = (id: string) => {
    setDeleteWithdrawalModalOpen(false);
    fetchJSON(`/transaction/withdrawal/${id}`, "DELETE")
      .then(() => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.withdrawal.yourRequestedWithdrawal} (#${draftWithdrawal.publicId}) ${dict.withdrawal.successfullyDeletedContent}`,
          type: "SUCCESS",
          title: dict.withdrawal.success,
        });
        getWithdrawals();
        setDraftWithdrawal(undefined);
        setAddress(undefined);
      })
      .catch((e) => {
        console.error(e);
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: dict.withdrawal.oops,
          type: "ERROR",
          title: dict.withdrawal.oops,
        });
      });
  };

  const cancelWithdrawal = (id: string) => {
    fetchJSON(`/transaction/withdrawal/${id}/cancel`, "PATCH")
      .then(() => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.withdrawal.yourRequestedWithdrawal} (#${draftWithdrawal.publicId}) ${dict.withdrawal.successfullyDeletedContent}`,
          type: "SUCCESS",
          title: dict.withdrawal.success,
        });
        getWithdrawals();
        setDraftWithdrawal(undefined);
        setAddress(undefined);
      })
      .catch((e) => {
        console.error(e);
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: dict.withdrawal.oops,
          type: "ERROR",
          title: dict.withdrawal.oops,
        });
      });
  };

  const updateWithdrawal = (
    id: string,
    values: CredentialsWithAuthenticationCodes
  ) => {
    const data: WithdrawalInformationsData = {
      addressId: address.id,
      emitterAddress: draftWithdrawal.emitterAddress,
      netRequestedAmount: Math.round(draftWithdrawal.netRequestedAmount),
      twoFactorToken: values.twoFactorToken,
      emailCode: values.emailCode,
    };
    fetchJSON(`/transaction/withdrawal/${id}/update`, "PUT", data)
      .then(() => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.withdrawal.yourRequestedWithdrawal} (#${draftWithdrawal.publicId}) ${dict.withdrawal.successfullyUpdatedContent}`,
          type: "SUCCESS",
          title: dict.withdrawal.success,
        });
        setTwoFactorsModalToUpdateOpen(false);
        getWithdrawals();
      })
      .catch((e) => {
        console.error(e);
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.withdrawal.yourRequestedWithdrawal} (#${draftWithdrawal.publicId}) ${dict.withdrawal.updateError}`,
          type: "ERROR",
          title: dict.withdrawal.oops,
        });
      });
  };

  const onSubmit = (values: CredentialsWithAuthenticationCodes) => {
    setIsSubmitting(() => true);

    const data: WithdrawalInformationsData = {
      addressId: address.id,
      emitterAddress: withdrawal.emitterAddress,
      netRequestedAmount: Math.round(withdrawal.netRequestedAmount),
      twoFactorToken: values.twoFactorToken,
      emailCode: values.emailCode,
    };

    fetchJSON("/transaction/withdrawal", "POST", data)
      .then((withdrawal) => {
        toastRef.current.addToast({
          index: Math.random().toString(36).substring(2, 9),
          textContent: `${dict.withdrawal.yourRequestedWithdrawal} (#${
            withdrawal.body.publicId
          }) ${dict.withdrawal.of} ${
            withdrawal.body.netRequestedAmount / 100
          }$ ${dict.withdrawal.isInDraft} ${dict.withdrawal.possibility}`,
          type: "SUCCESS",
          title: dict.withdrawal.success,
        });
        setTwoFactorsModalToCreateOpen(false);
        getWithdrawals();
        withdrawalInformationsRef.current.emptyFields();
        setAddress(undefined);
      })
      .catch((e) => {
        console.error(e);
        if (e.i18n === "DEPOSIT_IN_THE_LAST_30_DAYS") {
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: `${dict.withdrawal.yourWithdrawalOf} ${
              data.netRequestedAmount
            } ${dict.withdrawal.haveBeenRejected} ${
              dict.withdrawal.depositLastMonth
            } ${dict.withdrawal.pleaseWait} ${getTimeRemaining(
              lastDeposit?.emitDate,
              30
            )} ${dict.withdrawal.daysBeforeWithdrawal}`,
            type: "ERROR",
            title: dict.withdrawal.oops,
          });
        } else if (e.i18n === "PENDING_DEPOSIT") {
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: `${dict.withdrawal.yourWithdrawalOf} ${data.netRequestedAmount} ${dict.withdrawal.haveBeenRejected} ${dict.withdrawal.pendingDepositWaiting}`,
            type: "ERROR",
            title: dict.withdrawal.oops,
          });
        } else {
          toastRef.current.addToast({
            index: Math.random().toString(36).substring(2, 9),
            textContent: dict.withdrawal.oops,
            type: "ERROR",
            title: dict.withdrawal.oops,
          });
        }
      })
      .finally(() => {
        setIsSubmitting(() => false);
      });
  };

  const onUpdateHandler = () => {
    if (!getValues().emitterAddress) {
      trigger("emitterAddress");
      return;
    }
    if (
      !getValues().netRequestedAmount ||
      getValues().netRequestedAmount < 1000
    ) {
      trigger("netRequestedAmount");
      return;
    }
    setTwoFactorsModalToUpdateOpen(true);
  };

  const onSubmitHandler = () => {
    setTwoFactorsModalToCreateOpen(true);
  };

  const Aside = () => {
    return (
      <>
        <div className="hidden md:flex">
          <AnyQuestion text={dict.withdrawal.readTheGuide} />
        </div>
        {address && (
          <div className="w-full md:w-auto rounded-md">
            <WithdrawalAmountSummary
              netAmountLabel={dict.withdrawal.grossAmount}
              fixedFeeLabel={dict.withdrawal.fixedFee}
              percentFeeLabel={dict.deposit.percentFee}
              validationLabel={dict.withdrawal.validate}
              usdAmount={withdrawal?.netRequestedAmount / 100 ?? 0}
              fixedFee={address.fixedFee}
              percentFee={address.percentFee}
              finalAmount={
                ((withdrawal?.netRequestedAmount ?? 0) +
                  address.fixedFee +
                  (withdrawal?.netRequestedAmount ?? 0) *
                    (address.percentFee / 100)) /
                100
              }
              disableButton={
                !withdrawal?.netRequestedAmount ||
                !withdrawal?.emitterAddress ||
                Object.keys(errors).length > 0
              }
              amountLabel={dict.withdrawal.netAmountAsked}
              onSubmit={handleSubmit(onSubmitHandler)}
            />
          </div>
        )}
      </>
    );
  };

  const openOperation = (operation: FinancialOperationDto) => {
    setSelectedOperation(operation);
  };

  let [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized || !draftWithdrawal) {
      return;
    }
    setAddress({
      id: draftWithdrawal.originalNetworkId,
      token: draftWithdrawal.originalNetworkToken as Token,
      protocolName: draftWithdrawal.originalNetworkProtocolName as Protocol,
      fixedFee: draftWithdrawal.originalNetworkFixedFee,
      percentFee: draftWithdrawal.originalNetworkPercentFee,
    });
    setInitialized(true);
  }, [draftWithdrawal, setAddress, initialized]);

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.withdrawal.withdrawal.toUpperCase()}`;

  return (
    <UserLayout
      title={dict.withdrawal.withdrawal}
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
      <Divider />
      {(lastDeposit?.statusUpdateDate &&
        lessThanOneMonthAgo(lastDeposit.statusUpdateDate)) ||
      pendingDeposit ? (
        <div className="w-full flex justify-center mb-10">
          <RestrictedWithdrawal
            pendingDeposit={!!pendingDeposit}
            lastDepositDate={lastDeposit?.statusUpdateDate}
          />
        </div>
      ) : (
        <>
          {pendingWithdrawal && (
            <PendingWithdrawal withdrawal={pendingWithdrawal} />
          )}
          {draftWithdrawal ? (
            <>
              <DraftWithdrawal
                withdrawal={draftWithdrawal}
                setAddress={setAddress}
                setWithdrawal={setDraftWithdrawal}
                setDeleteWithdrawalModalOpen={setDeleteWithdrawalModalOpen}
                addresses={addresses}
                address={address}
                withdrawalInformationsRef={withdrawalInformationsRef}
                handleSubmit={handleSubmit(onUpdateHandler)}
                onUpdateHandler={onUpdateHandler}
                updateAddressObject={updateAddressObject}
                errors={errors}
              />
              <DeleteWithdrawalModal
                onClose={() => setDeleteWithdrawalModalOpen(false)}
                isOpen={deleteWithdrawalModalOpen}
                onSubmit={(id: string) => deleteWithdrawal(id)}
                withdrawal={draftWithdrawal}
              />
            </>
          ) : (
            <WithdrawalOperationSection
              aside={<Aside />}
              header={
                <h3 className="text-lg font-semibold">
                  {dict.withdrawal.request}
                </h3>
              }
              subtitle={dict.withdrawal.network}
              addresses={addresses}
              address={address}
              onAddressChange={setAddress}
              marginBottom={!!address}
            >
              <div className="mb-10 md:mb-0">
                <WithdrawalInformations
                  errors={errors}
                  updateAddressObject={updateAddressObject}
                  onChange={setWithdrawal}
                  ref={withdrawalInformationsRef}
                />
              </div>
            </WithdrawalOperationSection>
          )}
        </>
      )}
      <TwoFactorsAuthenticationModal
        onClose={() => setTwoFactorsModalToCreateOpen(false)}
        isOpen={twoFactorsModalToCreateOpen}
        onSubmit={(values: CredentialsWithAuthenticationCodes) =>
          onSubmit(values)
        }
        disableButton={isSubmitting}
      />
      <TwoFactorsAuthenticationModal
        onClose={() => setTwoFactorsModalToUpdateOpen(false)}
        isOpen={twoFactorsModalToUpdateOpen}
        onSubmit={(values: CredentialsWithAuthenticationCodes) =>
          updateWithdrawal(draftWithdrawal.publicId, values)
        }
      />
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg mb-[40px]">
            {dict.withdrawal.lastWithdrawals}
          </h3>
          {withdrawals?.length ? (
            <LinkButton
              label={dict.deposit.seeMore}
              onClick={() => router.push(`/history`)}
            />
          ) : (
            <></>
          )}
        </div>
        <Divider className="h-0.5" />
        <div className="hidden lg:block">
          <FinancialOperationTable
            operations={withdrawals.map(withdrawalToFinancialOperation)
            }
            emptyTableLabel={dict.withdrawal.noWithdrawals}
            headers={{
              token: dict.withdrawal.token,
              publicId: dict.withdrawal.publicId,
              emitDate: dict.history.notificationDate,
              rawAmount: dict.withdrawal.grossAmount,
              netAmount: dict.withdrawal.netAmount,
              transactionId: dict.withdrawal.transactionId,
              status: dict.withdrawal.status,
              finalized: "",
            }}
            onCancel={cancelWithdrawal}
            openOperation={openOperation}
          />
        </div>
        <div className="block lg:hidden">
          <FinancialOperationTable
            operations={withdrawals.map((withdrawal: WithdrawalDto) =>
              withdrawalToFinancialOperation(withdrawal)
            )}
            emptyTableLabel={dict.dashboard.noOperations}
            headers={{
              token: dict.withdrawal.token,
              publicId: "ID",
              emitDate: dict.history.notificationDate,
              netAmount: dict.withdrawal.netAmount,
              status: dict.withdrawal.status,
            }}
            openOperation={openOperation}
          />
        </div>
      </div>
    </UserLayout>
  );
}
