"use client"

import { useEffect, useRef } from "react"
import { apiGet } from "@/lib/api"

// 同一次会话内同一 type+id 只上报一次，避免 React Strict Mode 或重复挂载导致双次请求
const reportedKey = (type: string, id: number) => `${type}-${id}`
const reported = new Set<string>()

function markReported(type: string, id: number) {
  reported.add(reportedKey(type, id))
}
function didReport(type: string, id: number) {
  return reported.has(reportedKey(type, id))
}

type RecordVisitViewProps =
  | { type: "content"; targetId: number; targetTitle?: string }
  | { type: "product"; targetId: number; targetTitle?: string }

/** 详情页访问上报（文章/产品）：类型、ID、标题/名称，且同页仅上报一次 */
export function RecordVisitView(props: RecordVisitViewProps) {
  const { type, targetId, targetTitle } = props
  const mounted = useRef(false)

  useEffect(() => {
    if (!targetId || mounted.current) return
    if (didReport(type, targetId)) return
    mounted.current = true
    markReported(type, targetId)

    const params: Record<string, string> = { type, targetId: String(targetId) }
    if (targetTitle) params.targetTitle = targetTitle

    apiGet<unknown>("/tbx/log/record", params).catch(() => {
      reported.delete(reportedKey(type, targetId))
    })
  }, [type, targetId, targetTitle])

  return null
}
