import { NextRequest, NextResponse } from "next/server";
import { trace, SpanStatusCode } from "@opentelemetry/api";
import { createLogger } from "@/lib/telemetry/logger";

const logger = createLogger("error-api");
const tracer = trace.getTracer("error-api");

export async function POST(request: NextRequest) {
  return tracer.startActiveSpan("event-api.process", async (span) => {
    try {
      const eventData = await request.json();

      // Set span attributes for the event
      span.setAttributes({
        "event.name": eventData.eventName,
        "session.id": eventData.sessionId,
        "user.id": eventData.userId || "anonymous",
        url: eventData.url,
      });

      logger.info(`Processing event: ${eventData.eventName}`, { eventData });

      // Store the event (you could implement event tracking similar to error tracking)
      // For now, we'll just log it

      span.setStatus({ code: SpanStatusCode.OK });
      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : "Unknown error",
      });

      logger.error("Failed to process event", { error });
      return NextResponse.json(
        {
          success: false,
          message: "Failed to process event",
        },
        { status: 500 }
      );
    } finally {
      span.end();
    }
  });
}
