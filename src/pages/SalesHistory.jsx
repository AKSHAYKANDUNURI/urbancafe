import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  FiCalendar,
  FiSearch,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

export default function SalesHistory() {
  const { sales, deleteSale, settings } = useApp();

  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = sales.filter((sale) => {
    if (
      q &&
      !sale.items.some((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      )
    )
      return false;

    if (from && new Date(sale.date) < new Date(from))
      return false;

    if (to && new Date(sale.date) > new Date(to))
      return false;

    return true;
  });

  const totalFiltered = filtered.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">Sales History</h1>
        <p className="page-subtitle">
          Browse and filter past transactions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="search-bar flex-1">
          <FiSearch className="text-royal-bronze shrink-0" />

          <input
            type="text"
            placeholder="Search by item..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          <div className="relative flex-1">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-field pl-9"
            />
          </div>
        </div>
      </div>

      <div className="card-glow">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-display font-bold text-lg">
            Sales ({filtered.length})
          </h3>

          <div className="tag">
            Total&nbsp;
            <span className="text-royal-gold font-display">
              {settings.currency}
              {totalFiltered}
            </span>
          </div>
        </div>

        <ul className="space-y-3">
          {filtered.length === 0 ? (
            <li className="text-center py-12 text-slate-500">
              No sales found
            </li>
          ) : (
            filtered.map((sale, index) => (
              <li
                key={sale._id || sale.id || `${sale.date}-${index}`}
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border:
                    "1px solid rgba(255,255,255,.06)",
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <FiCalendar />
                      {new Date(sale.date).toLocaleString()}
                    </div>

                    <div className="font-display text-2xl text-royal-gold mt-1">
                      {settings.currency}
                      {sale.total}
                    </div>

                    <div className="text-sm text-slate-400 mt-2">
                      {sale.items
                        .map(
                          (item) =>
                            `${item.name} ×${item.quantity}`
                        )
                        .join(" • ")}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="btn-secondary flex items-center gap-2"
                      onClick={() =>
                        alert(
                          JSON.stringify(
                            sale.items,
                            null,
                            2
                          )
                        )
                      }
                    >
                      <FiEye />
                      Details
                    </button>

                    <button
                      className="btn-danger flex items-center gap-2"
                      onClick={() =>
                        deleteSale(
                          sale._id || sale.id
                        )
                      }
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}