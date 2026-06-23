"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon,
  DatabaseIcon,
  RadioIcon,
  Refresh01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Server, Zap } from "lucide-react";
import { motion } from "motion/react";

type Packet = {
  id: string;
  color: string;
  target: "top" | "middle" | "bottom";
  type: "log" | "trace" | "metric";
  duration: number;
};

export function PipelineSandbox() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [cpu, setCpu] = useState(38);
  const [requests, setRequests] = useState(140);
  const [errors, setErrors] = useState(0);
  const [message, setMessage] = useState(
    "Initializing pipeline integration...",
  );
  const packetIdCounter = useRef(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      // Trickle normal metrics
      triggerPacket("metric");
      setCpu((prev) => {
        const drift = Math.floor(Math.random() * 5) - 2;
        return Math.max(15, Math.min(65, prev + drift));
      });
      setRequests((prev) => prev + (Math.random() > 0.6 ? 2 : -1));
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const triggerPacket = (type: "log" | "trace" | "metric") => {
    const colors = {
      log: "#a855f7",
      trace: "#3b82f6",
      metric: "#f97316",
    };

    const targetMap: Record<
      "log" | "trace" | "metric",
      "top" | "middle" | "bottom"
    > = {
      log: "top",
      trace: "middle",
      metric: "bottom",
    };

    const id = `${type}-${packetIdCounter.current++}`;
    const newPacket: Packet = {
      id,
      type,
      color: colors[type],
      target: targetMap[type],
      duration: type === "trace" ? 1.6 : type === "log" ? 1.8 : 1.4,
    };

    setPackets((prev) => [...prev, newPacket]);

    // Clear packet after animation is complete
    setTimeout(() => {
      setPackets((prev) => prev.filter((p) => p.id !== id));

      if (type === "metric") {
        setRequests((prev) => prev + 1);
      } else if (type === "trace") {
        // Trace hit
      } else if (type === "log") {
        // Log hit
      }
    }, 2000);
  };

  const handleSimulateSuccess = () => {
    triggerPacket("trace");
    triggerPacket("log");
    triggerPacket("metric");
    setMessage("GET /api/v1/checkout - Duration 45ms (Span status: OK)");
  };

  const handleSimulateError = () => {
    triggerPacket("log");
    triggerPacket("trace");
    setErrors((prev) => prev + 1);
    setMessage(
      "POST /api/v1/pay - Exception: Credit card validation timeout (Trace status: ERROR)",
    );
    // Highlight system change
    setCpu((prev) => Math.min(99, prev + 12));
  };

  const handleSimulateSpike = () => {
    setCpu(92);
    setMessage("Load injection test trigger: Spiking container metrics to 92%");
    for (let i = 0; i < 5; i++) {
      setTimeout(() => triggerPacket("metric"), i * 150);
      setTimeout(() => triggerPacket("log"), i * 200 + 50);
    }
    // recover CPU standard state over time
    setTimeout(() => {
      setCpu(52);
    }, 6000);
  };

  return (
    <div className="rounded-2xl border p-4 border-[#3b3b3b] bg-[#121212] sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b pb-3 font-mono text-[10px] uppercase tracking-wider border-[#303030] text-[#a3a3a3]">
        <span>PulseGuard pipeline engine</span>
        <span className="text-[#ff5a1f]">Live diagram</span>
      </div>
      <div className="relative h-[250px] overflow-hidden rounded-xl border border-[#303030] bg-[#0d0d0d]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 250"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Background static solid lines */}
          <path
            d="M84 125H230"
            stroke="currentColor"
            className="text-[#222]"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M280 125Q345 56 420 56M280 125H420M280 125Q345 194 420 194"
            stroke="currentColor"
            className="text-[#222]"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M470 56Q505 125 530 125M470 125H530M470 194Q505 125 530 125"
            stroke="currentColor"
            className="text-[#222]"
            strokeWidth="2.5"
            strokeDasharray="3 3"
            fill="none"
          />

          {/* Flowing animated background dashes */}
          <path
            d="M84 125H230"
            stroke="rgba(0,0,0,0.12)"
            className="stroke-white/20 animate-dash"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M280 125Q345 56 420 56"
            stroke="rgb(168, 85, 247)"
            className="animate-dash"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />
          <path
            d="M280 125H420"
            stroke="rgb(59, 130, 246)"
            className="animate-dash"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />
          <path
            d="M280 125Q345 194 420 194"
            stroke="rgb(249, 115, 22)"
            className="animate-dash"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Database to Grafana animated flows */}
          <path
            d="M470 56Q505 125 530 125"
            stroke="rgb(168, 85, 247)"
            className="animate-dash"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
          <path
            d="M470 125H530"
            stroke="rgb(59, 130, 246)"
            className="animate-dash"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
          <path
            d="M470 194Q505 125 530 125"
            stroke="rgb(249, 115, 22)"
            className="animate-dash"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>

        {/* Nodes positioning */}
        {/* Node 1: Next.js App */}
        <div className="absolute left-[6%] top-1/2 -translate-y-1/2 text-center">
          <div className="grid size-12 place-items-center rounded-lg border text-xs font-semibold shadow-sm border-[#3b3b3b] bg-[#121212] text-white">
            Next
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            Application
          </span>
        </div>

        {/* Node 2: OTel Collector */}
        <div className="absolute left-[42%] top-1/2 -translate-y-1/2 text-center">
          <div className="grid size-14 place-items-center rounded-full border border-[#ff5a1f] bg-[#ff5a1f]/10 text-[#ff5a1f] shadow-[0_0_15px_rgba(255,90,31,0.15)]">
            <HugeiconsIcon icon={Activity01Icon} size={18} />
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            OTel
          </span>
        </div>

        {/* Node 3A: Loki (Logs) */}
        <div className="absolute left-[72%] top-[15%] text-center">
          <div className="grid size-10 place-items-center rounded-lg border text-purple-400 border-[#3b3b3b] bg-[#121212] shadow-sm">
            <HugeiconsIcon icon={DatabaseIcon} size={15} />
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            Logs
          </span>
        </div>

        {/* Node 3B: Tempo (Traces) */}
        <div className="absolute left-[72%] top-1/2 -translate-y-1/2 text-center">
          <div className="grid size-10 place-items-center rounded-lg border text-blue-400 border-[#3b3b3b] bg-[#121212] shadow-sm">
            <Server size={15} />
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            Traces
          </span>
        </div>

        {/* Node 3C: Prometheus (Metrics) */}
        <div className="absolute left-[72%] bottom-[12%] text-center">
          <div className="grid size-10 place-items-center rounded-lg border border-[#3b3b3b] bg-[#121212] text-[#ff5a1f] shadow-sm">
            <HugeiconsIcon icon={RadioIcon} size={15} />
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            Metrics
          </span>
        </div>

        {/* Node 4: Grafana */}
        <div className="absolute right-[3%] top-1/2 -translate-y-1/2 text-center">
          <div className="grid size-12 place-items-center rounded-lg border text-yellow-400 border-[#3b3b3b] bg-[#121212] shadow-sm">
            <Server size={18} />
          </div>
          <span className="mt-1 block font-mono text-[8px] uppercase text-[#a3a3a3]">
            Grafana
          </span>
        </div>

        {/* Travelling Packets */}
        <div className="absolute inset-0 pointer-events-none">
          {packets.map((packet) => (
            <div key={packet.id} className="absolute inset-0">
              {/* Stage 1: Next.js App to OTel Collector */}
              <motion.span
                initial={{ left: "15%", top: "50%", opacity: 1 }}
                animate={{ left: "41%", top: "50%" }}
                transition={{ duration: 0.7, ease: "linear" }}
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: packet.color }}
              />

              {/* Stage 2: OTel Collector to Destination Database */}
              <motion.span
                initial={{ left: "50%", top: "50%", opacity: 0 }}
                animate={{
                  left: "75%",
                  top:
                    packet.target === "top"
                      ? "22%"
                      : packet.target === "middle"
                        ? "50%"
                        : "78%",
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: packet.target === "middle" ? "linear" : "easeInOut",
                }}
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: packet.color,
                  boxShadow: `0 0 10px ${packet.color}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <h4 className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">
          Simulate events:
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSimulateSuccess}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] hover:border-[#ff5a1f] border-[#3b3b3b] text-blue-400 cursor-pointer transition-colors"
          >
            <Zap size={13} />
            Success trace
          </button>
          <button
            onClick={handleSimulateError}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] hover:border-[#ff5a1f] border-[#3b3b3b] text-[#d4d4d4] cursor-pointer transition-colors"
          >
            <HugeiconsIcon icon={Shield01Icon} size={13} />
            Exception
          </button>
          <button
            onClick={handleSimulateSpike}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] hover:border-[#ff5a1f] border-[#3b3b3b] text-orange-400 cursor-pointer transition-colors"
          >
            <HugeiconsIcon icon={Refresh01Icon} size={13} />
            Spike CPU
          </button>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px]">
        <div className="rounded-lg border p-3 border-[#303030]">
          <span className="block text-[#777772]">CPU</span>
          <span className="text-lg text-[#ff5a1f]">{cpu}%</span>
        </div>
        <div className="rounded-lg border p-3 border-[#303030]">
          <span className="block text-[#777772]">Requests</span>
          <span className="text-lg text-white">{requests}/m</span>
        </div>
        <div className="rounded-lg border p-3 border-[#303030]">
          <span className="block text-[#777772]">Errors</span>
          <span className="text-lg text-white">{errors}</span>
        </div>
      </div>

      <p className="mt-4 overflow-x-auto whitespace-nowrap border-tpt-3 font-mono text-[10px] border-[#303030] text-[#a3a3a3]">
        <span className="mr-2 text-[#ff5a1f]">pipeline &gt;</span>
        {message}
      </p>
    </div>
  );
}
