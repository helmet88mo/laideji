// ========== 专业相关 ==========
export interface AbilityModel {
  name: string
  value: number // 0-100
  description?: string
}

export interface CourseCategory {
  name: string
  courses: string[]
}

export interface RelatedMajor {
  name: string
  difference: string
}

export interface MajorSummary {
  id: string
  code: string
  name: string
  degree: string
  category: string
  aiRiskLevel: number
  employmentRate: number | null
  matchRate: number | null
}

export interface MajorDetail extends MajorSummary {
  description: string
  courses: CourseCategory[]
  hardPoints: string
  abilities: AbilityModel[]
  relatedMajors: RelatedMajor[]
  aiRisk: string
  employmentStats: EmploymentStat[]
  careerPaths: CareerPathItem[]
  salaries: SalaryItem[]
  careerDays?: CareerDaySummary[]
}

// ========== 就业相关 ==========
export interface EmploymentStat {
  id: string
  industry: string
  ratio: number
  cityDistribution: CityDistItem[] | null
}

export interface CityDistItem {
  city: string
  ratio: number
}

export interface CareerPathItem {
  id: string
  title: string
  level: 'entry' | 'mid' | 'senior' | 'expert'
  salary: string
  skills: string[]
}

export interface SalaryItem {
  id: string
  cityTier: string
  year0: number | null
  year3: number | null
  year5: number | null
  year10: number | null
}

// ========== 院校相关 ==========
export interface UniversitySummary {
  id: string
  name: string
  code: string
  level: string
  type: string
  province: string
  city: string
  baoYanRate: number | null
}

export interface UniversityDetail extends UniversitySummary {
  description: string
  majorCount: number
}

// ========== 职业相关 ==========
export interface TimelineItem {
  time: string
  activity: string
  icon?: string
}

export interface CareerDaySummary {
  id: string
  title: string
  industry: string
  city: string
  experience: string
  satisfaction: number
  majorName?: string
}

export interface CareerDayDetail extends CareerDaySummary {
  education: string
  timeline: TimelineItem[]
  salary: string
  expense: string
  monthlyJoy: string
  monthlyWorry: string
  adviceToSelf: string
}

// ========== 后悔清单 ==========
export interface RegretItem {
  id: string
  grade: string
  category: string
  content: string
  tags: string[]
  isLate: boolean
  remedy: string | null
  saved: boolean
}

// ========== 用户相关 ==========
export interface UserProfile {
  id: string
  name: string | null
  email: string | null
  grade: string | null
  province: string | null
  score: number | null
  subjectCombo: string | null
  targetPath: string | null
}

export interface GuideTask {
  taskId: string
  title: string
  description: string
  completed: boolean
}

export interface GuidePhase {
  phase: string
  title: string
  tasks: GuideTask[]
}

export interface HollandResult {
  R: number // 现实型
  I: number // 研究型
  A: number // 艺术型
  S: number // 社会型
  E: number // 企业型
  C: number // 常规型
}

export interface AssessmentResult {
  id: string
  type: string
  result: HollandResult
  createdAt: string
}

// ========== 学期规划 ==========
export type { PlanMilestone, PlanSemester, TrackPlan, PlanProgressData, PlanConflict } from "./plan"

// ========== API 响应 ==========
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
