import type { OnboardingChoiceCategory, OnboardingGoalCategory } from "@/lib/live-views/onboarding-goals";

// RIOM is local-first. Keep the behavior-facing API used by the UI, but do
// not ship product analytics or a telemetry SDK in the MVP bundle.
export const COMMAND_PALETTE_ACTION_IDS = ["open_search", "open_timeline_overlay", "new_chat", "pause_recording", "resume_recording", "go_chat", "go_brain", "go_meetings", "go_scheduled", "go_timeline", "go_connections", "toggle_sidebar", "open_settings", "open_shortcut_settings"] as const;
export type CommandPaletteActionId = (typeof COMMAND_PALETTE_ACTION_IDS)[number];
export const commandPalette = {
  opened: (_trigger: "keyboard") => undefined,
  actionExecuted: (actionId: CommandPaletteActionId) => (COMMAND_PALETTE_ACTION_IDS as readonly string[]).includes(actionId),
} as const;

export type OnboardingLiveViewFlowProperties = { live_view_flow_variant: "first_live_view" | "existing_live_views"; existing_live_view_count_bucket: "none" | "one" | "multiple" };
export function onboardingLiveViewFlowProperties(existingViewCount: number): OnboardingLiveViewFlowProperties {
  const count = Number.isFinite(existingViewCount) ? Math.max(0, Math.floor(existingViewCount)) : 0;
  return { live_view_flow_variant: count === 0 ? "first_live_view" : "existing_live_views", existing_live_view_count_bucket: count === 0 ? "none" : count === 1 ? "one" : "multiple" };
}
export const onboardingFunnel = {
  started: () => undefined, permissionsGranted: () => undefined, engineReady: () => undefined,
  goalSubmitted: (_goal: OnboardingChoiceCategory, _flow: OnboardingLiveViewFlowProperties) => undefined,
  liveViewCreated: (_goal: OnboardingGoalCategory, _flow: OnboardingLiveViewFlowProperties) => undefined,
  brainHandoffViewed: (_goal: OnboardingGoalCategory) => undefined, firstResultVisible: (_goal: OnboardingGoalCategory) => undefined,
  firstResultAccepted: (_goal: OnboardingGoalCategory, _action: "positive_feedback" | "item_action") => undefined,
} as const;
export function captureOnboardingH1FollowUp(_stage: "scheduled" | "delivery_attempted" | "notification_accepted" | "delivery_skipped" | "retry_scheduled", _goalCategory: OnboardingGoalCategory, _reason: "none" | "view_missing" | "no_pipe_started" | "notification_rejected" | "unexpected_failure" = "none"): void {}
export const qualifiedValue = {
  chatResponseReceived: () => undefined, chatResponseCopied: () => undefined, searchResultOpened: () => undefined, meetingNoteOpened: () => undefined, memoryOpened: () => undefined,
  artifactOpened: (_generatedByPipe: boolean) => undefined, liveViewResultAccepted: () => undefined,
  liveViewItemActionCompleted: (action: "resolve" | "snooze" | "correct" | "dismiss" | "reopen") => action === "resolve" || action === "snooze" || action === "correct",
  notificationFeedbackAccepted: (_generatedByPipe: boolean) => undefined, pipeOutputCopied: () => undefined,
} as const;
export type SettingsChangeSurface = "settings" | "onboarding" | "home" | "other";
export function resolveSettingsChangeSurface(pathname: string | undefined): SettingsChangeSurface { if (!pathname) return "other"; if (pathname.startsWith("/settings")) return "settings"; if (pathname.startsWith("/onboarding")) return "onboarding"; if (pathname.startsWith("/home") || pathname === "/") return "home"; return "other"; }
export function captureSettingsChange(_updates: Record<string, unknown>, _pathname?: string): void {}
