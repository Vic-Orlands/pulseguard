"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  CpuIcon,
  DatabaseIcon,
  Layers01Icon,
  RadioIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Network, LayoutGrid } from "lucide-react";

const nodes = {
  app: {
    name: "Next.js Application",
    sub: "Telemetry generation",
    icon: CpuIcon,
    details: [
      "Captures client-side exceptions with the TelemetryProvider",
      "Propagates request context across browser and backend boundaries",
      "Exports records without blocking application work",
    ],
  },
  otel: {
    name: "OpenTelemetry Collector",
    sub: "Filtering and routing",
    icon: Network,
    details: [
      "Accepts OTLP HTTP and gRPC telemetry records",
      "Batches events and applies memory-aware processing",
      "Routes logs, traces, and metrics to their dedicated stores",
    ],
  },
  loki: {
    name: "Grafana Loki",
    sub: "Structured log storage",
    icon: DatabaseIcon,
    details: [
      "Indexes stream labels for high-volume logs",
      "Retains trace identifiers for direct correlation",
      "Supports focused log queries when an incident begins",
    ],
  },
  tempo: {
    name: "Grafana Tempo",
    sub: "Trace waterfalls",
    icon: Layers01Icon,
    details: [
      "Stores distributed trace waterfalls efficiently",
      "Lets teams inspect every span in one request path",
      "Links trace context back to logs and metrics",
    ],
  },
  prometheus: {
    name: "Prometheus",
    sub: "Metrics backend",
    icon: RadioIcon,
    details: [
      "Scrapes collector metrics continuously",
      "Supports alerts with standard PromQL rules",
      "Tracks latency, errors, and system health",
    ],
  },
  grafana: {
    name: "Grafana Dashboards",
    sub: "Unified visualization",
    icon: LayoutGrid,
    details: [
      "Brings logs, traces, and metrics into one workspace",
      "Makes cross-signal investigation immediate",
      "Supports team access and shared operational context",
    ],
  },
};

type NodeKey = keyof typeof nodes;

function NodeButton({
  nodeKey,
  active,
  onClick,
}: {
  nodeKey: NodeKey;
  active: boolean;
  onClick: () => void;
}) {
  const node = nodes[nodeKey];
  const Icon = node.icon;
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "rounded-lg border border-[#ff5a1f] bg-[#ff5a1f]/10 px-4 py-3 text-center"
          : "rounded-lg border border-[#dfdfda] bg-transparent px-4 py-3 text-center hover:border-[#9a9a95] dark:border-[#3b3b3b] dark:bg-[#121212] dark:hover:border-[#5a5a5a]"
      }
    >
      {nodeKey === "otel" ? (
        <Network className="mx-auto mb-1.5 text-[#ff5a1f]" size={16} />
      ) : nodeKey === "grafana" ? (
        <LayoutGrid className="mx-auto mb-1.5 text-[#ff5a1f]" size={16} />
      ) : (
        <HugeiconsIcon
          icon={Icon as any}
          className="mx-auto mb-1.5 text-[#ff5a1f]"
          size={16}
        />
      )}
      <span className="block text-xs font-medium text-[#272725] dark:text-white">
        {node.name}
      </span>
      <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-[#777772] dark:text-[#a3a3a3]">
        {node.sub}
      </span>
    </button>
  );
}

export function ArchitectureGraph() {
  const [activeKey, setActiveKey] = useState<NodeKey>("otel");
  const activeNode = nodes[activeKey];
  const ActiveIcon = activeNode.icon;

  return (
    <section>
      <p className="pg-label">Pipeline architecture</p>
      <h2 className="mt-4 w-full text-3xl font-semibold tracking-[-.065em] leading-[.95] lg:text-[5.5rem] lg:max-w-4xl text-[#272725] dark:text-[#f5f5f5]">
        Follow every signal through the stack.
      </h2>
      <p className="mt-4 max-w-xl text-sm font-light leading-6 text-[#73736e] dark:text-[#a3a3a3]">
        Select a node to see how telemetry moves from your application to the
        place where your team investigates it.
      </p>

      <section className="mt-5 grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-lg border border-[#dfdfda] bg-transparent p-6 dark:border-[#3b3b3b] dark:bg-[#121212]">
          <div className="flex justify-center">
            <NodeButton
              nodeKey="app"
              active={activeKey === "app"}
              onClick={() => setActiveKey("app")}
            />
          </div>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="mx-auto my-3 text-[#b1b1ac] dark:text-[#4a4a4a]"
            size={16}
          />
          <div className="flex justify-center">
            <NodeButton
              nodeKey="otel"
              active={activeKey === "otel"}
              onClick={() => setActiveKey("otel")}
            />
          </div>
          <div className="mx-auto my-5 h-7 w-[72%] border-x border-t border-[#d4d4cf] dark:border-[#3b3b3b]" />
          <div className="grid grid-cols-3 gap-3">
            <NodeButton
              nodeKey="loki"
              active={activeKey === "loki"}
              onClick={() => setActiveKey("loki")}
            />
            <NodeButton
              nodeKey="tempo"
              active={activeKey === "tempo"}
              onClick={() => setActiveKey("tempo")}
            />
            <NodeButton
              nodeKey="prometheus"
              active={activeKey === "prometheus"}
              onClick={() => setActiveKey("prometheus")}
            />
          </div>
          <div className="mx-auto my-5 h-7 w-[72%] border-x border-b border-[#d4d4cf] dark:border-[#3b3b3b]" />
          <div className="flex justify-center">
            <NodeButton
              nodeKey="grafana"
              active={activeKey === "grafana"}
              onClick={() => setActiveKey("grafana")}
            />
          </div>
        </div>

        <div className="w-full rounded-lg border border-[#dfdfda] bg-transparent p-6 dark:border-[#3b3b3b] dark:bg-[#121212] sm:p-8">
          <div className="flex items-start justify-between border-b border-[#e6e6e1] pb-5 dark:border-[#303030]">
            <div>
              <p className="pg-label">Selected node</p>
              <h4 className="mt-2 text-xl font-medium text-[#272725] dark:text-white">
                {activeNode.name}
              </h4>
            </div>
            <span className="grid size-10 place-items-center rounded-lg border border-[#dfdfda] text-[#ff5a1f] dark:border-[#3b3b3b] bg-transparent dark:bg-[#121212]">
              {activeNode.name === "OpenTelemetry Collector" ? (
                <Network size={18} />
              ) : activeNode.name === "Grafana Dashboards" ? (
                <LayoutGrid size={18} />
              ) : (
                <HugeiconsIcon icon={ActiveIcon as any} size={18} />
              )}
            </span>
          </div>
          <ul className="mt-6 space-y-4">
            {activeNode.details.map((detail) => (
              <li
                key={detail}
                className="flex gap-3 text-sm font-light leading-6 text-[#73736e] dark:text-[#a3a3a3]"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ff5a1f]" />
                {detail}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t border-[#e6e6e1] pt-4 font-mono text-[10px] uppercase tracking-wider text-[#777772] dark:border-[#303030] dark:text-[#a3a3a3]">
            Node id · {activeKey.toUpperCase()}
          </div>
        </div>
      </section>
    </section>
  );
}
