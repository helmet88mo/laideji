/** 单个学期里程碑 */
export interface PlanMilestone {
  id: string
  title: string
  description: string
  category?: string
  /** 与之冲突的其他轨道里程碑 ID（用于冲突检测） */
  conflicts?: string[]
}

/** 一个学期的里程碑集合 */
export interface PlanSemester {
  semesterId: string
  semesterLabel: string
  milestones: PlanMilestone[]
}

/** 完整的一条轨道计划（4年×8学期） */
export interface TrackPlan {
  trackId: string
  trackLabel: string
  icon: string
  semesters: PlanSemester[]
}

/** 用户计划进度（存储在 DB 的 planData 字段） */
export type PlanProgressData = Record<string, boolean>

/** 两条轨道之间的冲突 */
export interface PlanConflict {
  milestoneA: string
  milestoneB: string
  trackALabel: string
  trackBLabel: string
  semesterLabel: string
  reason: string
}
