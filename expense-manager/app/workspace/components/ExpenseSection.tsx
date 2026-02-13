"use client"

import axios from "axios"
import React, { useEffect, useRef, useState } from "react"

const expenseTagList = [
  { key: "CORE_LIVING", label: "Core Living" },
  { key: "FOOD", label: "Food" },
  { key: "TRANSPORT", label: "Transport" },
  { key: "FAMILY", label: "Family" },
  { key: "ENTERTAINMENT", label: "Entertainment" },
  { key: "FINANCIAL", label: "Financial" },
]

type Props = {
  monthId: string
  accountId: string | null
  userId: string | null
}

type Activity = {
  id: string
  title: string
  amount: number
  expenseTag: string
  createdAt: string
  updatedAt: string
}

const ExpenseSection = ({ monthId, accountId, userId }: Props) => {
  const [expenseText, setExpenseText] = useState("")
  const [tag, setTag] = useState(expenseTagList[0].key)
  const [amount, setAmount] = useState<number | "">("")
  const [activities, setActivities] = useState<Activity[]>([])

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const rootURL = "http://localhost:8080/api"

  /* ---------- Helpers ---------- */

  const sortByTimeAsc = (data: Activity[]) =>
    [...data].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()
    )

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDateHeader = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    })
  }

  const groupByDate = (data: Activity[]) => {
    const map: Record<
      string,
      { items: Activity[]; total: number }
    > = {}

    data.forEach((a) => {
      const dateKey = new Date(a.createdAt)
        .toISOString()
        .split("T")[0]

      if (!map[dateKey]) {
        map[dateKey] = { items: [], total: 0 }
      }

      map[dateKey].items.push(a)
      map[dateKey].total += a.amount
    })

    return Object.entries(map).sort(
      ([d1], [d2]) =>
        new Date(d1).getTime() -
        new Date(d2).getTime()
    )
  }

  /* ---------- Fetch ---------- */

  const fetchActivitiesWithRetry = async (
    retries = 5,
    delay = 1500
  ) => {
    if (!monthId || !accountId) return

    try {
      const res = await axios.get<Activity[]>(
        `${rootURL}/accounts/activities/${accountId}/months/${monthId}`
      )

      if (res.data.length === 0 && retries > 0) {
        setTimeout(
          () => fetchActivitiesWithRetry(retries - 1, delay),
          delay
        )
      } else {
        setActivities(sortByTimeAsc(res.data))
      }
    } catch (err) {
      console.error("Failed to fetch activities", err)
    }
  }

  useEffect(() => {
    fetchActivitiesWithRetry()
  }, [monthId, userId])

  /* ---------- Auto scroll ---------- */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activities])

  /* ---------- Add ---------- */

  const addActivity = async () => {
    if (!expenseText || !amount || !accountId) return

    const payload = {
      accountId,
      title: expenseText,
      transactionType: "EXPENSE",
      monthId,
      expenseTag: tag,
      amount: Number(amount),
    }

    try {
      await axios.post(`${rootURL}/accounts/activities`, payload)
      setExpenseText("")
      setAmount("")
      setTimeout(fetchActivitiesWithRetry, 600)
    } catch (err) {
      console.error("Failed to add activity", err)
    }
  }

  /* ---------- UI ---------- */

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl border shadow-sm">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h1 className="text-xl font-semibold text-center">
          Expenses
        </h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-center">
            No expenses yet
          </p>
        ) : (
          groupByDate(activities).map(([date, group]) => (
            <div key={date} className="space-y-3">
              {/* Date Row */}
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-700">
                  {formatDateHeader(date)}
                </h2>
                <span className="text-sm font-bold text-red-600">
                  ${group.total}
                </span>
              </div>

              {/* Expenses */}
              {group.items.map((a) => (
                <div
                  key={a.id}
                  className="max-w-[85%] bg-blue-50 border border-blue-100 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">
                      {a.title}
                    </p>
                    <span className="font-bold text-red-600">
                      ${a.amount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {a.expenseTag}
                    </span>
                    <span className="text-gray-400">
                      {formatTime(a.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            value={expenseText}
            onChange={(e) => setExpenseText(e.target.value)}
            placeholder="New expense..."
            className="flex-1 px-4 py-3 border rounded-lg"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            placeholder="Amount"
            className="w-28 px-3 py-3 border rounded-lg"
          />

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="px-3 py-3 border rounded-lg"
          >
            {expenseTagList.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>

          <button
            onClick={addActivity}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseSection
