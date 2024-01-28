import { useLanguageDictionary } from '@shared-hooks';
import {
  CenteredHeader,
  GenerateWithTooltip,
  PaginatedTable,
} from '@shared-components/table';
import { FinancialOperationDto } from '@shared-types';
import { CopyValueButton } from '@shared-components/copy-value-button';
import { StatusChip } from '@shared-components/status-chip';
import { DateFormats, formatDate, getTokenLogoUrl } from '@shared-utils';
import { OperationIcon } from '@shared-components/operation-icon';
import { InlineButton, LinkButton } from '@shared-components/buttons';
import { Logo } from '@shared-components/logo';
import { Tooltip } from '@shared-components/tooltip';
import { Icon } from '@shared-components/icon';

interface FinancialOperationTableProps {
  operations: FinancialOperationDto[];
  headers: { [key: string]: string };
  onCancel?: (id: string) => void;
  swapElement?: (deposit: any) => void;
  openOperation?: (operation: FinancialOperationDto) => void;
  nbPages?: number;
  onCurrentPageChange?: (current: number) => void;
  emptyTableLabel?: string;
}
export function FinancialOperationTable(props: FinancialOperationTableProps) {
  const dict = useLanguageDictionary();

  const ValidationDate = (object: FinancialOperationDto) => {
    if (object.status === 'PENDING') {
      return (
        <div>
          <InlineButton
            label={dict.cancel}
            type="secondary"
            onClick={() => props.onCancel?.(object.publicId)}
          />
        </div>
      );
    }
    return (
      <div className="text-center text-sm sm:text-md max-w-[65px] sm:max-w-auto">
        {dict.status[object.status!]} {dict.withdrawal.the}{' '}
        {object.statusUpdateDate
          ? formatDate(object.statusUpdateDate, DateFormats.SHORT)
          : formatDate(object.emitDate, DateFormats.SHORT)}
      </div>
    );
  };

  const EstimationTooltip = (object: FinancialOperationDto) => {
    return (
      <div className="flex space-x-2">
        <i>{formatDate(object.estimatedProcessingDate, DateFormats.SHORT)}</i>
        <div onClick={(e) => e.stopPropagation()}>
          <Tooltip
            label={`${dict.history.operationEstimationDate} ${formatDate(
              object.estimatedProcessingDate,
              DateFormats.SHORT,
            )}`}
          >
            <div className="mt-0.5">
              <Icon
                src={'rs-info'}
                className="mt-2 pr-2 text-dark-gray dark:text-silver text-sm"
                inline
              ></Icon>
            </div>
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <PaginatedTable
      headers={props.headers}
      data={props.operations}
      emptyMessage={
        props.emptyTableLabel
          ? props.emptyTableLabel
          : dict.deposit.noOperations
      }
      nbPages={props.nbPages || 1}
      pageSize={20}
      onCurrentPageChange={(current: number) => {
        props.onCurrentPageChange?.(current);
      }}
      onLineClick={props.openOperation}
      customHeaders={{
        operation: () => (
          <>
            <p className="hidden md:block">{dict.history.operation}</p>
            <p className="md:hidden">Op</p>
          </>
        ),
        token: CenteredHeader,
        rawAmount: (key) => (
          <div className="">{GenerateWithTooltip(key, dict.tooltip.gross)}</div>
        ),
        netAmount: (key) => (
          <div className="md:pr-12">
            {GenerateWithTooltip(key, dict.tooltip.net)}
          </div>
        ),
        status: CenteredHeader,
        process: CenteredHeader,
        processRouting: CenteredHeader,
      }}
      customColumns={{
        token: (object: FinancialOperationDto) => (
          <div className="flex justify-center">
            {object.token ? (
              <Logo
                src={getTokenLogoUrl(object.token)}
                width={16}
                height={16}
              />
            ) : (
              <div>-</div>
            )}
          </div>
        ),
        operation: (object: FinancialOperationDto) => (
          <OperationIcon type={object.operation} />
        ),
        publicId: (object: FinancialOperationDto) => (
          <div>
            <p className="underline text-gold cursor-pointer text-sm sm:text-md">
              {object.publicId}
            </p>
          </div>
        ),
        emitter: (object: FinancialOperationDto) => (
          <div className="text-left">
            {object.emitter ? (
              <>
                {object.emitter.firstname} {object.emitter.lastname}
              </>
            ) : (
              <div className="lg:text-right">-</div>
            )}
          </div>
        ),
        emitDate: (object: FinancialOperationDto) => (
          <>
            <p className="hidden md:block">
              {object.emitDate
                ? formatDate(object.emitDate, DateFormats.SEMI)
                : '-'}
            </p>
            <p className="md:hidden text-sm">
              {object.emitDate
                ? formatDate(object.emitDate, DateFormats.SHORT)
                : '-'}
            </p>
          </>
        ),
        statusUpdateDate: (object: FinancialOperationDto) => (
          <>
            <div className="hidden md:block">
              {object.statusUpdateDate
                ? formatDate(object.statusUpdateDate, DateFormats.SEMI)
                : object.estimatedProcessingDate
                ? EstimationTooltip(object)
                : '-'}
            </div>
            <div className="md:hidden text-sm">
              {object.statusUpdateDate
                ? formatDate(object.statusUpdateDate, DateFormats.SHORT)
                : object.estimatedProcessingDate
                ? EstimationTooltip(object)
                : '-'}
            </div>
          </>
        ),
        rawAmount: (object: FinancialOperationDto) => (
          <>
            {' '}
            {object.rawAmount ? (
              <p className=" lg:text-right">{object.rawAmount / 100}$</p>
            ) : (
              <div className="lg:text-right">-</div>
            )}
          </>
        ),
        netAmount: (object: FinancialOperationDto) => (
          <p className="text-right text-sm sm:text-md md:pr-12">
            {object.netAmount / 100}$
          </p>
        ),
        transactionId: (object: FinancialOperationDto) => (
          <div className="text-right">
            {object.transactionId ? (
              <CopyValueButton
                realValue={object.transactionId}
                value={`${object.transactionId?.substring(0, 4)}...
                    ${object.transactionId?.substring(
                      object.transactionId?.length - 7,
                    )}`}
                justify="justify-start"
              />
            ) : (
              <div className="text-left">-</div>
            )}
          </div>
        ),
        status: (object: FinancialOperationDto) => (
          <div className="flex justify-center">
            {object.status ? (
              <StatusChip status={object.status} />
            ) : (
              <div className="text-center">-</div>
            )}
          </div>
        ),
        address: (object: FinancialOperationDto) => (
          <div className="flex justify-center">{object.address}</div>
        ),
        finalized: ValidationDate,
        process: (object: FinancialOperationDto) => (
          <div
            onClick={() => props.swapElement?.(object)}
            className={'flex justify-center z-50'}
          >
            <LinkButton label={dict.deposit.process} />
          </div>
        ),
        processRouting: (object: FinancialOperationDto) => {
          return object.status !== 'DRAFT' ? (
            <div
              onClick={() => props.openOperation?.(object)}
              className={'flex justify-center z-50'}
            >
              <LinkButton label={dict.deposit.process} />
            </div>
          ) : (
            <div className="flex justify-center">-</div>
          );
        },
      }}
    />
  );
}
