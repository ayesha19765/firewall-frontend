import * as React from "react";
import { VictoryChart, VictoryLine, VictoryTooltip, VictoryLegend } from "victory";
import { cn } from "@/lib/utils";

// Chart container component with Victory
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactNode;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <div
      data-chart={chartId}
      ref={ref}
      className={cn("flex aspect-video justify-center text-xs", className)}
      {...props}
    >
      <ChartStyle id={chartId} config={config} />
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
});
ChartContainer.displayName = "Chart";

// Chart style for applying dynamic theme and color settings
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

// Example usage of Victory chart components inside the ChartContainer
const MyChart = () => {
  return (
    <ChartContainer config={{}}>
      <VictoryChart>
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
          ]}
          labels={({ datum }) => `y: ${datum.y}`}
          labelComponent={<VictoryTooltip />}
        />
        <VictoryLegend
          x={125}
          y={50}
          orientation="horizontal"
          gutter={20}
          data={[
            { name: "Series 1", symbol: { fill: "tomato" } },
          ]}
        />
      </VictoryChart>
    </ChartContainer>
  );
};

export default MyChart;
