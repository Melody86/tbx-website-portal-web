"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { apiPost } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

export function ContactForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimPhone = phone.trim()
    const trimContent = content.trim()
    if (!trimPhone) {
      toast({ title: "请填写联系电话", variant: "destructive" })
      return
    }
    if (!trimContent) {
      toast({ title: "请填写留言内容", variant: "destructive" })
      return
    }
    setSubmitting(true)
    try {
      await apiPost<unknown>("/tbx/contact/submit", {
        name: name.trim() || undefined,
        phone: trimPhone,
        email: email.trim() || undefined,
        content: trimContent,
      })
      toast({ title: "提交成功", description: "感谢您的留言，我们会尽快与您联系。" })
      setName("")
      setPhone("")
      setEmail("")
      setContent("")
    } catch (err) {
      toast({
        title: "提交失败",
        description: err instanceof Error ? err.message : "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">姓名</label>
          <input
            type="text"
            className={inputClass}
            placeholder="请输入您的姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">联系电话</label>
          <input
            type="tel"
            className={inputClass}
            placeholder="请输入您的联系电话"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={50}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">邮箱（选填）</label>
        <input
          type="email"
          className={inputClass}
          placeholder="请输入您的邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">留言内容</label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="请输入您的留言内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={2000}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "提交中…" : "提交留言"}
      </Button>
    </form>
  )
}
