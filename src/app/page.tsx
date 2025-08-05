"use client";

import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import {
  ArrowRight,
  GitBranch,
  Activity,
  Eye,
  Users,
  Bell,
  Database,
  LucideProps,
} from "lucide-react";
import LogPage from "@/assets/logs.png";
import TracePage from "@/assets/trace.png";
import ErrorPage from "@/assets/errors.png";
import OverviewPage from "@/assets/overview.png";
import PerformancePage from "@/assets/metrics.png";
import AlertsPage from "@/assets/installation.png";
import LogDetailsPage from "@/assets/log-details.png";
import ErrorDetailPage from "@/assets/error-details.png";
import TraceDetailsPage from "@/assets/trace-details.png";
import DistributedPage from "@/assets/distributed-tracing.png";

type Features = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  image: StaticImageData;
  title: string;
  description: string;
  details: string[];
};

type FeatureDetails = {
  feature: Features;
  isLeft: boolean;
};

// Feature Detail Sidebar
const FeatureDetailSidebar: React.FC<FeatureDetails> = ({
  feature,
  isLeft,
}) => {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 flex z-40 w-full ${
        isLeft ? "left-full ml-10" : "right-full mr-10"
      }`}
      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isLeft ? 20 : -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-950 rounded-2xl shadow-xl p-6 space-y-4 border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
            <feature.icon className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold">{feature.title}</h3>
        </div>

        <p className="text-gray-400 leading-relaxed">{feature.description}</p>

        <div className="space-y-2">
          <h4 className="font-medium">Key Features:</h4>
          <ul className="space-y-1">
            {feature.details.map((detail, i) => (
              <li
                key={i}
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <button className="text-sm font-medium hover:underline">
            Learn more →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="pt-32 pb-20">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Built for modern application monitoring
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Full-Stack observability,
          <br />
          <span className="text-gray-400">for Modern Apps.</span>
        </motion.h1>

        <motion.p
          className="text-md text-gray-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          PulseGuard is a comprehensive observability platform built for
          developers, technical teams, and creators. Track, monitor, debug, and
          optimize application performance without friction.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm rounded-lg font-medium transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            Start Monitoring for Free
          </motion.button>
          <motion.button
            onClick={() =>
              (window.location.href =
                "https://github.com/Vic-Orlands/pulseguard-app")
            }
            className="px-6 py-3 text-slate-300 hover:text-slate-400 transition-colors duration-200 font-medium flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
          >
            How to use PulseGuard?
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Dashboard Preview */}
      <motion.div
        className="mt-10 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="rounded-2xl overflow-hidden p-3 bg-gray-950/40 border border-slate-700">
          <Image
            src={ErrorPage}
            alt="error page"
            className="border border-gray-800"
          />
        </div>
      </motion.div>
    </section>
  );
};

// Less friction section
const LessFriction = () => {
  return (
    <section className="py-10">
      <motion.div
        className="text-center space-y-5 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Less friction. More creation.
        </h2>
        <p className="text-md text-gray-400 max-w-4xl mx-auto leading-relaxed">
          The average development team uses 5+ tools to inefficiently manage
          application monitoring. PulseGuard provides one place to monitor,
          debug, and optimize application performance, with built-in support for
          error tracking, performance monitoring, distributed tracing, session
          management, log aggregation, and intelligent alerting.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            title: "Monitor",
            description:
              "Track application health and performance metrics in real-time with comprehensive dashboards.",
            image: OverviewPage,
          },
          {
            title: "Debug",
            description:
              "Identify and resolve issues quickly with detailed error tracking and stack traces.",
            image: ErrorDetailPage,
          },
          {
            title: "Optimize",
            description:
              "Improve application performance with actionable insights and recommendations.",
            image: TracePage,
          },
          {
            title: "Error Tracking",
            description:
              "Comprehensive error monitoring with real-time notifications and detailed context.",
            image: ErrorPage,
          },
          {
            title: "Performance Analytics",
            description:
              "Deep insights into application performance with metrics and trend analysis.",
            image: LogDetailsPage,
          },
          {
            title: "User Session Monitoring",
            description:
              "Track user interactions and behavior patterns across your application.",
            image: TraceDetailsPage,
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-950/40 rounded-lg p-3 border border-gray-950">
              <Image
                src={feature.image}
                alt={feature.title}
                width={300}
                height={300}
                className="w-full h-auto border border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Interactive Features Section with Hover Details
const InteractiveFeatures = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: Features[] = [
    {
      icon: Eye,
      image: ErrorPage,
      title: "Error Tracking",
      description:
        "Instantly detect and diagnose errors with detailed stack traces, user context, and real-time notifications.",
      details: [
        "Real-time error detection and alerting",
        "Detailed stack traces with source code",
        "User context and session information",
        "Error grouping and trend analysis",
        "Integration with popular development tools",
      ],
    },
    {
      icon: Activity,
      image: PerformancePage,
      title: "Performance Monitoring",
      description:
        "Track application performance metrics, response times, and throughput with comprehensive dashboards.",
      details: [
        "Response time monitoring and alerts",
        "Database query performance tracking",
        "API endpoint analytics",
        "Resource utilization monitoring",
        "Performance trend analysis",
      ],
    },
    {
      icon: GitBranch,
      image: DistributedPage,
      title: "Distributed Tracing",
      description:
        "Follow requests across your distributed system to identify bottlenecks and optimize performance.",
      details: [
        "End-to-end request tracing",
        "Service dependency mapping",
        "Performance bottleneck identification",
        "Cross-service error correlation",
        "Trace sampling and retention",
      ],
    },
    {
      icon: Users,
      image: OverviewPage,
      title: "User Session Monitoring",
      description:
        "Monitor user interactions, session duration, and behavior patterns to improve user experience.",
      details: [
        "Real-time user session tracking",
        "User journey and flow analysis",
        "Session replay and debugging",
        "User behavior insights",
        "Conversion funnel monitoring",
      ],
    },
    {
      icon: Database,
      image: LogPage,
      title: "Log Management",
      description:
        "Centralize and search through application logs with powerful filtering and real-time streaming.",
      details: [
        "Centralized log aggregation",
        "Advanced search and filtering",
        "Real-time log streaming",
        "Log-based alerting",
        "Integration with popular logging frameworks",
      ],
    },
    {
      icon: Bell,
      image: AlertsPage,
      title: "Smart Alerts",
      description:
        "Get notified about critical issues through your preferred channels with intelligent alert routing.",
      details: [
        "Intelligent alert routing and escalation",
        "Multi-channel notifications",
        "Alert correlation and deduplication",
        "Custom alert conditions",
        "Integration with communication tools",
      ],
    },
  ];

  return (
    <section id="features" className="py-20">
      <motion.div
        className="text-center space-y-6 mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Everything You Need to Monitor
          <br />
          <span className="text-gray-400">Modern Applications</span>
        </h2>
        <p className="text-md text-gray-400 max-w-2xl mx-auto leading-relaxed">
          From error tracking to performance monitoring, get complete visibility
          into your application's health and user experience.
        </p>
      </motion.div>

      <div className="space-y-8 relative">
        {/* Vertical line in center */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-700 transform -translate-x-1/2" />

        {features.map((feature, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={feature.title}
              className={`flex ${
                isLeft ? "justify-start" : "justify-end"
              } relative`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`w-[48.5%] rounded-2xl p-3 bg-gray-950/40 border border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative ${
                  isLeft ? "mr-auto" : "ml-auto"
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-md border border-gray-800"
                />
                <div className="flex items-center gap-4 my-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature Detail Sidebar - positioned relative to this feature */}
                {hoveredFeature === index && (
                  <FeatureDetailSidebar feature={feature} isLeft={isLeft} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => (
  <section className="py-20 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Badge className="gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          What're you waiting for?
        </Badge>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight my-4">
          Publish better monitoring insights,
          <br />
          10x faster
        </h2>

        <p className="text-md text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Less tool-hopping. More insights delivered, clean, actionable,
          comprehensive, and ready to help you build better applications.
        </p>

        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm rounded-lg font-medium transition-colors duration-200"
          whileTap={{ scale: 0.95 }}
        >
          Start Monitoring for Free
        </motion.button>
      </motion.div>
    </div>
  </section>
);

// Footer

// Main Homepage Component
export default function Homepage() {
  return (
    <section className="max-w-7xl border-x border-slate-700 m-auto px-5 relative text-white">
      <Hero />
      <LessFriction />
      <InteractiveFeatures />
      <CTA />
    </section>
  );
}
