import { Icon } from "@shared-components/icon";
import { Tooltip } from "@shared-components/tooltip";

export const CenteredHeader = (key: string) => (
  <p className="text-center">{key}</p>
);

export const GenerateWithTooltip = (key: string, text: string) => (
  <div className="flex justify-end">
    <Tooltip label={text} size="lg">
      <div className="mt-0.5">
        <Icon
          src={"rs-info"}
          className="mt-2 pr-2 text-dark-gray dark:text-silver text-sm"
          inline
        ></Icon>
      </div>
    </Tooltip>
    <p>{key}</p>
  </div>
);
