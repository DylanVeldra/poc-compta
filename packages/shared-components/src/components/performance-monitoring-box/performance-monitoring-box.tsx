import { Container } from '@shared-components/container';
import { GradientBorder } from '@shared-components/gradient-border';
import { formatAmount } from '@shared-utils';
import Evolution from './evolution';
interface PerformanceMonitoringBoxProps {
  title: string;
  subtitle: string;
  amount: number;
  apy: number;
  previousApy: number;
}

export default function PerformanceMonitoringBox(
  props: PerformanceMonitoringBoxProps,
) {
  return (
    <div className="w-full h-auto mb-[30px] lg:mb-0">
      <GradientBorder>
        <Container noBorder>
          <div className="flex flex-col pl-[21px] py-[16px]">
            <div className="flex flex-row space-x-2 rounded-md">
              <h4 className="text-lg mb-[25px] font-medium">{props.title}</h4>
            </div>
            <h6 className="text-[16px] font-medium text-gold">
              {props.subtitle}
            </h6>
            <div className="flex">
              <div>
                <h3 className="text-[30px] font-roboto font-semibold">
                  {formatAmount(props.amount / 100, 'USD')}
                </h3>
              </div>
              <div className="flex-1" />
              <div className="mt-2 mr-3">
                <Evolution before={props.previousApy} after={props.apy} />
              </div>
            </div>
          </div>
        </Container>
      </GradientBorder>
    </div>
  );
}
