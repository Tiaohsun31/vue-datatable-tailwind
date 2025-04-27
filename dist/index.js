var Et = Object.defineProperty;
var Dt = (e, t, l) => t in e ? Et(e, t, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[t] = l;
var Ee = (e, t, l) => Dt(e, typeof t != "symbol" ? t + "" : t, l);
import { createElementBlock as x, openBlock as k, Fragment as re, renderList as Q, createElementVNode as P, normalizeClass as S, defineComponent as E, normalizeStyle as Pe, toDisplayString as q, ref as _, computed as y, onMounted as ct, onUnmounted as Ot, watch as de, createVNode as V, withModifiers as Ve, withDirectives as De, vShow as Oe, createBlock as W, useSlots as dt, renderSlot as N, createCommentVNode as D, normalizeProps as H, guardReactiveProps as se, unref as d, createSlots as he, withCtx as G, mergeProps as Z, createTextVNode as Ae, inject as Ht, onBeforeUnmount as jt, Transition as Vt, toRefs as zt, provide as qt } from "vue";
const pe = (e, t) => {
  const l = e.__vccOpts || e;
  for (const [a, o] of t)
    l[a] = o;
  return l;
}, Wt = {}, Kt = { class: "inline-flex relative w-[60px] h-[60px]" };
function Ut(e, t) {
  return k(), x("div", Kt, [
    (k(), x(re, null, Q(4, (l) => P("div", {
      key: l,
      class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring border-t-vdt-primary-500", [`animate-delay-${(l - 1) * 150}`]])
    }, null, 2)), 64))
  ]);
}
const Jt = /* @__PURE__ */ pe(Wt, [["render", Ut], ["__scopeId", "data-v-c23c712b"]]), Gt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Zt = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Qt = { class: "w-64" }, Xt = { class: "h-2 bg-gray-200 rounded-sm" }, Yt = { class: "text-center text-sm text-gray-600" }, _t = /* @__PURE__ */ E({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    return (t, l) => (k(), x("div", Gt, [
      P("div", Zt, [
        l[0] || (l[0] = P("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        P("div", Qt, [
          P("div", Xt, [
            P("div", {
              class: "h-2 rounded-sm transition-all duration-300 ease-out bg-vdt-primary-500",
              style: Pe({ width: `${t.progress}%` })
            }, null, 4)
          ])
        ]),
        P("div", Yt, q(Math.round(t.progress)) + "% ", 1)
      ])
    ]));
  }
});
function ea(e, t, l, a, o, r, i, u, n) {
  const c = (p, h) => {
    const b = { ...p };
    return t.value && (delete b.checkbox, b.isSelected = p.checkbox), l.value && (delete b.index, b.indexInCurrentPage = h + 1), b;
  };
  return {
    handleRowClick: (p, h, b) => {
      if (!p.target.closest(".checkbox, .expand-button") && (o.value && i(b, h, p), r.value && !a(h) && u(h), e.value === "single")) {
        const I = c(h, b);
        n("clickRow", I, p);
      }
    },
    handleRowDoubleClick: (p, h, b) => {
      if (e.value === "double") {
        const I = c(h, b);
        n("clickRow", I, p);
      }
    },
    handleRowContextMenu: (p, h) => {
      const b = c(h, -1);
      n("contextmenuRow", b, p);
    }
  };
}
function ta(e, t, l) {
  const a = _([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (i, u, n) => {
      n.stopPropagation();
      const c = a.value.indexOf(i);
      if (c !== -1)
        a.value.splice(c, 1);
      else {
        const s = e.value.findIndex((m) => JSON.stringify(m) === JSON.stringify(u));
        l("expandRow", t.value + s, u), a.value.push(t.value + s);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      a.value = [];
    }
    // 清空展開列表的方法
  };
}
function aa(e, t) {
  const l = y(() => e.value.filter((s) => s.fixed)), a = y(() => l.value.filter((s) => !s.fixedPosition || s.fixedPosition === "left")), o = y(() => l.value.filter((s) => s.fixedPosition === "right")), r = y(() => a.value.length ? a.value[a.value.length - 1].value : ""), i = y(() => o.value.length ? o.value[0].value : ""), u = y(() => {
    if (!l.value.length) return [];
    const s = [];
    if (a.value.length) {
      const m = a.value.map((v) => v.width ?? 100);
      a.value.forEach((v, p) => {
        s.push({
          value: v.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: v.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: p === 0 ? 0 : m.reduce((h, b, I) => I < p ? h + b : h, 0)
        });
      });
    }
    if (o.value.length) {
      const m = o.value.map((v) => v.width ?? 100);
      o.value.forEach((v, p) => {
        s.push({
          value: v.value,
          fixed: !0,
          position: "right",
          width: v.width ?? 100,
          distance: p === o.value.length - 1 ? 0 : m.reduce((h, b, I) => I > p ? h + b : h, 0)
        });
      });
    }
    return s;
  }), n = _(!1);
  let c = null;
  return ct(() => {
    const s = t.value;
    if (s) {
      const m = () => {
        n.value = s.scrollLeft > 0;
      };
      m(), s.addEventListener("scroll", m), c = () => {
        s.removeEventListener("scroll", m);
      };
    }
  }), Ot(() => {
    c && (c(), c = null);
  }), {
    fixedHeaders: l,
    leftFixedHeaders: a,
    rightFixedHeaders: o,
    lastLeftFixedColumn: r,
    firstRightFixedColumn: i,
    fixedColumnsInfos: u,
    showShadow: n
  };
}
function la(e, t, l, a, o, r, i, u, n, c, s, m, v, p, h, b, I, $, A, L) {
  const ee = y(() => i.value.length ? {
    hasFixedColumns: i.value.some((B) => B.fixed),
    fixedHeaders: i.value.filter((B) => B.fixed),
    unFixedHeaders: i.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), j = _(
    oa(h.value, b.value, I.value)
  ), te = y(() => {
    const B = i.value.filter(
      (z) => z.fixed && (!z.fixedPosition || z.fixedPosition === "left")
    ), O = i.value.filter((z) => !z.fixed), T = i.value.filter(
      (z) => z.fixed && z.fixedPosition === "right"
    );
    return [
      ...Object.values(ie.value).filter(Boolean),
      ...B,
      ...O,
      ...T
    ];
  }), ie = y(() => ({
    checkbox: c.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value ?? 36
    },
    index: p.value && {
      text: e.value,
      value: "index",
      fixed: r.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: n.value
    },
    expand: u.value && !$.value && {
      text: "",
      value: "expand",
      fixed: o.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: l.value
    }
  })), ke = y(
    () => te.value.map((B) => B.value)
  ), ye = (B, O) => {
    const T = O === "none" ? "asc" : O === "asc" ? "desc" : m.value ? "asc" : null;
    if (s.value) {
      A(B, T);
      return;
    }
    const U = I.value ? na(B, T, j.value) : sa(B, T);
    j.value = U, L("updateSort", { sortType: T, sortBy: B });
  }, be = y(() => (B) => {
    var T, U;
    const O = s.value ? (T = v.value) == null ? void 0 : T.sortBy : (U = j.value) == null ? void 0 : U.sortBy;
    return Array.isArray(O) && O.includes(B);
  }), K = y(() => (B) => {
    var T, U;
    const O = s.value ? (T = v.value) == null ? void 0 : T.sortBy : (U = j.value) == null ? void 0 : U.sortBy;
    return Array.isArray(O) ? O.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: j,
    headerColumns: ke,
    headersForRender: te,
    updateSortField: ye,
    isMultiSorting: be,
    getMultiSortNumber: K
  };
}
function oa(e, t, l) {
  return l && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const na = (e, t, l) => {
  if (!(l != null && l.sortBy) || !Array.isArray(l.sortBy) || !Array.isArray(l.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const a = l.sortBy.indexOf(e), o = [...l.sortBy], r = [...l.sortDesc];
  return a === -1 && t !== null ? (o.push(e), r.push(t === "desc")) : t === null ? (o.splice(a, 1), r.splice(a, 1)) : r[a] = t === "desc", { sortBy: o, sortDesc: r };
}, sa = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
class ra {
  constructor() {
    Ee(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    Ee(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let l = this.itemKeyCache.get(t);
    if (!l) {
      const { checkbox: a, index: o, ...r } = t;
      l = Object.entries(r).sort(([i], [u]) => i.localeCompare(u)).map(([i, u]) => `${i}:${u}`).join("|"), this.itemKeyCache.set(t, l);
    }
    return l;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ia(e, t, l, a, o, r, i, u, n, c) {
  const s = new ra(), m = y(
    () => (e.value - 1) * o.value + 1
  ), v = y(() => l.value ? Math.min(
    n.value,
    e.value * o.value
  ) : Math.min(
    u.value.length,
    e.value * o.value
  )), p = y(() => l.value ? a.value : u.value.slice(
    m.value - 1,
    v.value
  )), h = y(() => i.value ? p.value.map(($, A) => ({
    index: m.value + A,
    ...$
  })) : p.value), b = y(() => {
    if (r.value.length === 0)
      return "noneSelected";
    const $ = c ? u.value.filter((L) => !c(L)) : u.value;
    return r.value.length === $.length && r.value.every(
      (ee) => $.some(
        (j) => s.getItemKey(ee) === s.getItemKey(j)
      )
    ) ? "allSelected" : "partSelected";
  }), I = y(() => {
    if (!t.value)
      return h.value;
    switch (b.value) {
      case "allSelected":
        return h.value.map(($) => ({
          checkbox: !c || !c($),
          // 考慮禁用狀態
          ...$
        }));
      case "noneSelected":
        return h.value.map(($) => ({
          checkbox: !1,
          ...$
        }));
      default:
        return h.value.map(($) => ({
          checkbox: r.value.some(
            (L) => s.getItemKey($) === s.getItemKey(L)
          ) && (!c || !c($)),
          ...$
        }));
    }
  });
  return {
    currentPageFirstIndex: m,
    currentPageLastIndex: v,
    multipleSelectStatus: b,
    pageItems: I
  };
}
function ua(e, t, l, a, o, r, i) {
  const u = _(r.value ? r.value.page : e.value), n = y(() => Math.ceil(a.value / o.value)), c = y(() => n.value === 0 || u.value === n.value), s = y(() => u.value === 1);
  return {
    currentPaginationNumber: u,
    maxPaginationNumber: n,
    isLastPage: c,
    isFirstPage: s,
    nextPage: () => {
      if (a.value !== 0 && !c.value && !l.value)
        if (t.value) {
          const b = u.value + 1;
          i(b);
        } else
          u.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !s.value && !l.value)
        if (t.value) {
          const b = u.value - 1;
          i(b);
        } else
          u.value -= 1;
    },
    updatePage: (b) => {
      l.value || (t.value ? i(b) : u.value = b);
    },
    updateCurrentPaginationNumber: (b) => {
      u.value = b;
    }
  };
}
function ca(e, t, l, a) {
  var u;
  const o = y(() => !e.value && t.value.findIndex((n) => n === a.value) === -1 ? [a.value, ...t.value] : t.value), r = _(((u = l.value) == null ? void 0 : u.rowsPerPage) ?? a.value);
  return {
    rowsItemsComputed: o,
    // 計算後的每頁行數選項
    rowsPerPageRef: r,
    // 每頁行數
    updateRowsPerPage: (n) => {
      r.value = n;
    }
    // 更新每頁行數
  };
}
function da(e, t, l) {
  const a = y({
    get: () => {
      if (e.value) {
        const { page: u, rowsPerPage: n, sortBy: c, sortType: s } = e.value;
        return { page: u, rowsPerPage: n, sortBy: c ?? null, sortType: s ?? null };
      }
      return null;
    },
    set: (u) => {
      l("update:serverOptions", u);
    }
  });
  return {
    serverOptionsComputed: a,
    updateServerOptionsPage: (u) => {
      a.value && (a.value = {
        ...a.value,
        page: u
      });
    },
    updateServerOptionsSort: (u, n) => {
      if (a.value)
        if (t.value && Array.isArray(a.value.sortBy) && Array.isArray(a.value.sortType)) {
          const c = a.value.sortBy.findIndex((s) => s === u);
          c === -1 && n !== null && (a.value.sortBy.push(u), a.value.sortType.push(n)), n === null ? (a.value.sortBy.splice(c, 1), a.value.sortType.splice(c, 1)) : a.value.sortType[c] = n;
        } else
          a.value = {
            ...a.value,
            sortBy: n !== null ? u : null,
            sortType: n
          };
    },
    updateServerOptionsRowsPerPage: (u) => {
      a.value && (a.value = {
        ...a.value,
        page: 1,
        rowsPerPage: u
      });
    }
  };
}
function ga(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ha(e) {
  return e.comparison === "in";
}
function pa(e) {
  return typeof e.comparison == "function";
}
function fa(e) {
  return typeof e == "number" && !isNaN(e);
}
const Dl = {
  number(e, t, l) {
    return { field: e, comparison: t, criteria: l };
  },
  string(e, t, l) {
    return { field: e, comparison: t, criteria: l };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, l) {
    return { field: e, comparison: t, criteria: l };
  }
};
function Y(e, t) {
  if (e.includes(".")) {
    const l = e.split(".");
    let a = t;
    for (const o of l)
      if (a && typeof a == "object")
        a = a[o];
      else
        return "";
    return a ?? "";
  }
  return t[e] ?? "";
}
function ma(e, t) {
  const l = Y(e, t);
  return Array.isArray(l) ? l.join(",") : l;
}
const st = 1e3, rt = /* @__PURE__ */ new WeakMap(), Me = (e) => {
  let t = rt.get(e);
  if (!t) {
    const { checkbox: l, index: a, ...o } = e;
    t = JSON.stringify(o), rt.set(e, t);
  }
  return t;
};
function va(e, t, l, a) {
  const o = _({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  de(t, (s) => {
    if (s === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const m = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
    for (const p of s) {
      const h = Me(p);
      m.add(h), v.set(h, p);
    }
    o.value.selectedItems = m, o.value.itemsMap = v;
  }, { immediate: !0, deep: !0 });
  const r = async (s, m, v) => new Promise((p) => {
    requestAnimationFrame(() => {
      const h = new Set(o.value.selectedItems), b = new Map(o.value.itemsMap);
      for (let I = 0; I < s.length; I++) {
        const $ = s[I], A = Me($);
        m ? (h.add(A), b.set(A, $)) : h.delete(A), o.value.processedCount = v + I + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = h, o.value.itemsMap = b, p();
    });
  }), i = async (s) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = e.value.length, o.value.visualProgress = 0, !s) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), a("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const m = e.value;
        for (let v = 0; v < m.length; v += st) {
          const h = m.slice(v, Math.min(v + st, m.length)).filter((b) => !l(b));
          await r(h, s, v), await new Promise((b) => setTimeout(b, 0));
        }
        a("update:itemsSelected", n.value), s && a("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, u = (s) => {
    const m = Me(s), v = { ...s };
    delete v.checkbox, delete v.index;
    const p = new Set(o.value.selectedItems), h = new Map(o.value.itemsMap);
    p.has(m) ? (p.delete(m), a("deselectRow", v)) : (p.add(m), h.set(m, v), a("selectRow", v)), o.value.selectedItems = p, o.value.itemsMap = h, a("update:itemsSelected", Array.from(h.values()).filter((I) => p.has(Me(I))));
  }, n = y(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([s]) => o.value.selectedItems.has(s)).map(([, s]) => s)), c = y(() => o.value.visualProgress);
  return {
    selectedItems: n,
    toggleSelectAll: i,
    toggleSelectItem: u,
    isProcessing: y(() => o.value.selectionInProgress),
    selectionProgress: c
  };
}
function ka(e, t, l, a, o, r, i, u, n, c, s, m) {
  const v = /* @__PURE__ */ new WeakMap(), p = (f) => {
    let C = v.get(f);
    return C || (typeof r.value == "string" && r.value !== "" ? C = String(Y(r.value, f)) : Array.isArray(r.value) ? C = r.value.map((w) => String(Y(w, f))).join(" ") : C = Object.values(f).map(String).join(" "), v.set(f, C)), C;
  }, h = y(() => {
    if (!l.value && i.value !== "") {
      const f = new RegExp(i.value, "i");
      return a.value.filter((C) => f.test(p(C)));
    }
    return a.value;
  }), b = (f, C) => {
    const w = fa(f) ? f : parseFloat(String(f));
    if (isNaN(w)) return !1;
    if (C.comparison === "between" && Array.isArray(C.criteria)) {
      const [ae, le] = C.criteria;
      return w >= ae && w <= le;
    }
    const M = C.criteria;
    switch (C.comparison) {
      case ">":
        return w > M;
      case ">=":
        return w >= M;
      case "<":
        return w < M;
      case "<=":
        return w <= M;
      default:
        return !1;
    }
  }, I = y(() => {
    var f;
    return (f = t.value) != null && f.length ? h.value.filter(
      (C) => t.value.every((w) => {
        const M = Y(w.field, C);
        return pa(w) ? w.comparison(M, w.criteria) : ga(w) ? b(M, w) : ha(w) ? w.criteria.includes(M) : w.comparison === "=" ? M === w.criteria : M !== w.criteria;
      })
    ) : h.value;
  }), $ = (f, C, w) => f === C ? 0 : f == null ? 1 : C == null ? -1 : f < C ? w ? 1 : -1 : w ? -1 : 1, A = (f, C, w, M) => M < 0 ? f : A(f, C, w, M - 1).sort((ae, le) => {
    if (!C.slice(0, M).every((Ce) => Y(Ce, ae) === Y(Ce, le))) return 0;
    const fe = C[M], oe = Y(fe, ae), xe = Y(fe, le);
    return $(oe, xe, w[M]);
  }), L = y(() => {
    if (l.value) return a.value;
    if (!e.value) return I.value;
    const { sortBy: f, sortDesc: C } = e.value, w = [...I.value];
    return n.value && Array.isArray(f) && Array.isArray(C) ? f.length ? A(w, f, C, f.length - 1) : w : w.sort((M, ae) => {
      const le = Y(f, M), X = Y(f, ae);
      return $(le, X, C);
    });
  }), ee = y(() => l.value ? u.value : L.value.length), j = y(() => l.value ? !1 : (l.value ? u.value : a.value.length) >= c.value), {
    selectedItems: te,
    toggleSelectAll: ie,
    toggleSelectItem: ke,
    isProcessing: ye,
    selectionProgress: be
  } = va(L, o, s, m), K = y({
    get: () => o.value ?? [],
    set: (f) => {
      m("update:itemsSelected", f);
    }
  }), B = (f) => f.filter((C) => !s(C)), O = (f) => {
    K.value = f ? B(L.value) : K.value = [], f && m("selectAll");
  }, T = (f) => {
    const C = f.checkbox;
    if (delete f.checkbox, delete f.index, C)
      K.value = K.value.filter(
        (w) => JSON.stringify(w) !== JSON.stringify(f)
      ), m("deselectRow", f);
    else {
      const w = K.value;
      w.unshift(f), K.value = w, m("selectRow", f);
    }
  };
  return {
    totalItems: L,
    selectItemsComputed: K,
    totalItemsLength: ee,
    toggleSelectAll: (f) => {
      if (!L.value.every((w) => s(w)))
        if (j.value) {
          m("updateSelectionStatus", !0);
          try {
            ie(f), m("update:itemsSelected", f ? Array.from(te.value) : []), f && m("selectAll");
          } finally {
            m("updateSelectionStatus", !1);
          }
        } else
          O(f);
    },
    toggleSelectItem: (f) => {
      s(f) || (j.value ? ke(f) : T(f));
    },
    isProcessing: y(() => j.value && ye.value),
    processProgress: be
  };
}
const He = {
  slate: {
    50: "oklch(98.4% 0.003 247.858)",
    100: "oklch(96.8% 0.007 247.896)",
    200: "oklch(92.9% 0.013 255.508)",
    300: "oklch(86.9% 0.022 252.894)",
    400: "oklch(70.4% 0.04 256.788)",
    500: "oklch(55.4% 0.046 257.417)",
    600: "oklch(44.6% 0.043 257.281)",
    700: "oklch(37.2% 0.044 257.287)",
    800: "oklch(27.9% 0.041 260.031)",
    900: "oklch(20.8% 0.042 265.755)",
    950: "oklch(12.9% 0.042 264.695)"
  },
  gray: {
    50: "oklch(98.5% 0.002 247.839)",
    100: "oklch(96.7% 0.003 264.542)",
    200: "oklch(92.8% 0.006 264.531)",
    300: "oklch(87.2% 0.01 258.338)",
    400: "oklch(70.7% 0.022 261.325)",
    500: "oklch(55.1% 0.027 264.364)",
    600: "oklch(44.6% 0.03 256.802)",
    700: "oklch(37.3% 0.034 259.733)",
    800: "oklch(27.8% 0.033 256.848)",
    900: "oklch(21% 0.034 264.665)",
    950: "oklch(13% 0.028 261.692)"
  },
  zinc: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(96.7% 0.001 286.375)",
    200: "oklch(92% 0.004 286.32)",
    300: "oklch(87.1% 0.006 286.286)",
    400: "oklch(70.5% 0.015 286.067)",
    500: "oklch(55.2% 0.016 285.938)",
    600: "oklch(44.2% 0.017 285.786)",
    700: "oklch(37% 0.013 285.805)",
    800: "oklch(27.4% 0.006 286.033)",
    900: "oklch(21% 0.006 285.885)",
    950: "oklch(14.1% 0.005 285.823)"
  },
  neutral: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(97% 0 0)",
    200: "oklch(92.2% 0 0)",
    300: "oklch(87% 0 0)",
    400: "oklch(70.8% 0 0)",
    500: "oklch(55.6% 0 0)",
    600: "oklch(43.9% 0 0)",
    700: "oklch(37.1% 0 0)",
    800: "oklch(26.9% 0 0)",
    900: "oklch(20.5% 0 0)",
    950: "oklch(14.5% 0 0)"
  },
  stone: {
    50: "oklch(98.5% 0.001 106.423)",
    100: "oklch(97% 0.001 106.424)",
    200: "oklch(92.3% 0.003 48.717)",
    300: "oklch(86.9% 0.005 56.366)",
    400: "oklch(70.9% 0.01 56.259)",
    500: "oklch(55.3% 0.013 58.071)",
    600: "oklch(44.4% 0.011 73.639)",
    700: "oklch(37.4% 0.01 67.558)",
    800: "oklch(26.8% 0.007 34.298)",
    900: "oklch(21.6% 0.006 56.043)",
    950: "oklch(14.7% 0.004 49.25)"
  },
  red: {
    50: "oklch(97.1% 0.013 17.38)",
    100: "oklch(93.6% 0.032 17.717)",
    200: "oklch(88.5% 0.062 18.334)",
    300: "oklch(80.8% 0.114 19.571)",
    400: "oklch(70.4% 0.191 22.216)",
    500: "oklch(63.7% 0.237 25.331)",
    600: "oklch(57.7% 0.245 27.325)",
    700: "oklch(50.5% 0.213 27.518)",
    800: "oklch(44.4% 0.177 26.899)",
    900: "oklch(39.6% 0.141 25.723)",
    950: "oklch(25.8% 0.092 26.042)"
  },
  orange: {
    50: "oklch(98% 0.016 73.684)",
    100: "oklch(95.4% 0.038 75.164)",
    200: "oklch(90.1% 0.076 70.697)",
    300: "oklch(83.7% 0.128 66.29)",
    400: "oklch(75% 0.183 55.934)",
    500: "oklch(70.5% 0.213 47.604)",
    600: "oklch(64.6% 0.222 41.116)",
    700: "oklch(55.3% 0.195 38.402)",
    800: "oklch(47% 0.157 37.304)",
    900: "oklch(40.8% 0.123 38.172)",
    950: "oklch(26.6% 0.079 36.259)"
  },
  amber: {
    50: "oklch(98.7% 0.022 95.277)",
    100: "oklch(96.2% 0.059 95.617)",
    200: "oklch(92.4% 0.12 95.746)",
    300: "oklch(87.9% 0.169 91.605)",
    400: "oklch(82.8% 0.189 84.429)",
    500: "oklch(76.9% 0.188 70.08)",
    600: "oklch(66.6% 0.179 58.318)",
    700: "oklch(55.5% 0.163 48.998)",
    800: "oklch(47.3% 0.137 46.201)",
    900: "oklch(41.4% 0.112 45.904)",
    950: "oklch(27.9% 0.077 45.635)"
  },
  yellow: {
    50: "oklch(98.7% 0.026 102.212)",
    100: "oklch(97.3% 0.071 103.193)",
    200: "oklch(94.5% 0.129 101.54)",
    300: "oklch(90.5% 0.182 98.111)",
    400: "oklch(85.2% 0.199 91.936)",
    500: "oklch(79.5% 0.184 86.047)",
    600: "oklch(68.1% 0.162 75.834)",
    700: "oklch(55.4% 0.135 66.442)",
    800: "oklch(47.6% 0.114 61.907)",
    900: "oklch(42.1% 0.095 57.708)",
    950: "oklch(28.6% 0.066 53.813)"
  },
  lime: {
    50: "oklch(98.6% 0.031 120.757)",
    100: "oklch(96.7% 0.067 122.328)",
    200: "oklch(93.8% 0.127 124.321)",
    300: "oklch(89.7% 0.196 126.665)",
    400: "oklch(84.1% 0.238 128.85)",
    500: "oklch(76.8% 0.233 130.85)",
    600: "oklch(64.8% 0.2 131.684)",
    700: "oklch(53.2% 0.157 131.589)",
    800: "oklch(45.3% 0.124 130.933)",
    900: "oklch(40.5% 0.101 131.063)",
    950: "oklch(27.4% 0.072 132.109)"
  },
  green: {
    50: "oklch(98.2% 0.018 155.826)",
    100: "oklch(96.2% 0.044 156.743)",
    200: "oklch(92.5% 0.084 155.995)",
    300: "oklch(87.1% 0.15 154.449)",
    400: "oklch(79.2% 0.209 151.711)",
    500: "oklch(72.3% 0.219 149.579)",
    600: "oklch(62.7% 0.194 149.214)",
    700: "oklch(52.7% 0.154 150.069)",
    800: "oklch(44.8% 0.119 151.328)",
    900: "oklch(39.3% 0.095 152.535)",
    950: "oklch(26.6% 0.065 152.934)"
  },
  emerald: {
    50: "oklch(97.9% 0.021 166.113)",
    100: "oklch(95% 0.052 163.051)",
    200: "oklch(90.5% 0.093 164.15)",
    300: "oklch(84.5% 0.143 164.978)",
    400: "oklch(76.5% 0.177 163.223)",
    500: "oklch(69.6% 0.17 162.48)",
    600: "oklch(59.6% 0.145 163.225)",
    700: "oklch(50.8% 0.118 165.612)",
    800: "oklch(43.2% 0.095 166.913)",
    900: "oklch(37.8% 0.077 168.94)",
    950: "oklch(26.2% 0.051 172.552)"
  },
  teal: {
    50: "oklch(98.4% 0.014 180.72)",
    100: "oklch(95.3% 0.051 180.801)",
    200: "oklch(91% 0.096 180.426)",
    300: "oklch(85.5% 0.138 181.071)",
    400: "oklch(77.7% 0.152 181.912)",
    500: "oklch(70.4% 0.14 182.503)",
    600: "oklch(60% 0.118 184.704)",
    700: "oklch(51.1% 0.096 186.391)",
    800: "oklch(43.7% 0.078 188.216)",
    900: "oklch(38.6% 0.063 188.416)",
    950: "oklch(27.7% 0.046 192.524)"
  },
  cyan: {
    50: "oklch(98.4% 0.019 200.873)",
    100: "oklch(95.6% 0.045 203.388)",
    200: "oklch(91.7% 0.08 205.041)",
    300: "oklch(86.5% 0.127 207.078)",
    400: "oklch(78.9% 0.154 211.53)",
    500: "oklch(71.5% 0.143 215.221)",
    600: "oklch(60.9% 0.126 221.723)",
    700: "oklch(52% 0.105 223.128)",
    800: "oklch(45% 0.085 224.283)",
    900: "oklch(39.8% 0.07 227.392)",
    950: "oklch(30.2% 0.056 229.695)"
  },
  sky: {
    50: "oklch(97.7% 0.013 236.62)",
    100: "oklch(95.1% 0.026 236.824)",
    200: "oklch(90.1% 0.058 230.902)",
    300: "oklch(82.8% 0.111 230.318)",
    400: "oklch(74.6% 0.16 232.661)",
    500: "oklch(68.5% 0.169 237.323)",
    600: "oklch(58.8% 0.158 241.966)",
    700: "oklch(50% 0.134 242.749)",
    800: "oklch(44.3% 0.11 240.79)",
    900: "oklch(39.1% 0.09 240.876)",
    950: "oklch(29.3% 0.066 243.157)"
  },
  blue: {
    50: "oklch(97% 0.014 254.604)",
    100: "oklch(93.2% 0.032 255.585)",
    200: "oklch(88.2% 0.059 254.128)",
    300: "oklch(80.9% 0.105 251.813)",
    400: "oklch(70.7% 0.165 254.624)",
    500: "oklch(62.3% 0.214 259.815)",
    600: "oklch(54.6% 0.245 262.881)",
    700: "oklch(48.8% 0.243 264.376)",
    800: "oklch(42.4% 0.199 265.638)",
    900: "oklch(37.9% 0.146 265.522)",
    950: "oklch(28.2% 0.091 267.935)"
  },
  indigo: {
    50: "oklch(96.2% 0.018 272.314)",
    100: "oklch(93% 0.034 272.788)",
    200: "oklch(87% 0.065 274.039)",
    300: "oklch(78.5% 0.115 274.713)",
    400: "oklch(67.3% 0.182 276.935)",
    500: "oklch(58.5% 0.233 277.117)",
    600: "oklch(51.1% 0.262 276.966)",
    700: "oklch(45.7% 0.24 277.023)",
    800: "oklch(39.8% 0.195 277.366)",
    900: "oklch(35.9% 0.144 278.697)",
    950: "oklch(25.7% 0.09 281.288)"
  },
  violet: {
    50: "oklch(96.9% 0.016 293.756)",
    100: "oklch(94.3% 0.029 294.588)",
    200: "oklch(89.4% 0.057 293.283)",
    300: "oklch(81.1% 0.111 293.571)",
    400: "oklch(70.2% 0.183 293.541)",
    500: "oklch(60.6% 0.25 292.717)",
    600: "oklch(54.1% 0.281 293.009)",
    700: "oklch(49.1% 0.27 292.581)",
    800: "oklch(43.2% 0.232 292.759)",
    900: "oklch(38% 0.189 293.745)",
    950: "oklch(28.3% 0.141 291.089)"
  },
  purple: {
    50: "oklch(97.7% 0.014 308.299)",
    100: "oklch(94.6% 0.033 307.174)",
    200: "oklch(90.2% 0.063 306.703)",
    300: "oklch(82.7% 0.119 306.383)",
    400: "oklch(71.4% 0.203 305.504)",
    500: "oklch(62.7% 0.265 303.9)",
    600: "oklch(55.8% 0.288 302.321)",
    700: "oklch(49.6% 0.265 301.924)",
    800: "oklch(43.8% 0.218 303.724)",
    900: "oklch(38.1% 0.176 304.987)",
    950: "oklch(29.1% 0.149 302.717)"
  },
  fuchsia: {
    50: "oklch(97.7% 0.017 320.058)",
    100: "oklch(95.2% 0.037 318.852)",
    200: "oklch(90.3% 0.076 319.62)",
    300: "oklch(83.3% 0.145 321.434)",
    400: "oklch(74% 0.238 322.16)",
    500: "oklch(66.7% 0.295 322.15)",
    600: "oklch(59.1% 0.293 322.896)",
    700: "oklch(51.8% 0.253 323.949)",
    800: "oklch(45.2% 0.211 324.591)",
    900: "oklch(40.1% 0.17 325.612)",
    950: "oklch(29.3% 0.136 325.661)"
  },
  pink: {
    50: "oklch(97.1% 0.014 343.198)",
    100: "oklch(94.8% 0.028 342.258)",
    200: "oklch(89.9% 0.061 343.231)",
    300: "oklch(82.3% 0.12 346.018)",
    400: "oklch(71.8% 0.202 349.761)",
    500: "oklch(65.6% 0.241 354.308)",
    600: "oklch(59.2% 0.249 0.584)",
    700: "oklch(52.5% 0.223 3.958)",
    800: "oklch(45.9% 0.187 3.815)",
    900: "oklch(40.8% 0.153 2.432)",
    950: "oklch(28.4% 0.109 3.907)"
  },
  rose: {
    50: "oklch(96.9% 0.015 12.422)",
    100: "oklch(94.1% 0.03 12.58)",
    200: "oklch(89.2% 0.058 10.001)",
    300: "oklch(81% 0.117 11.638)",
    400: "oklch(71.2% 0.194 13.428)",
    500: "oklch(64.5% 0.246 16.439)",
    600: "oklch(58.6% 0.253 17.585)",
    700: "oklch(51.4% 0.222 16.935)",
    800: "oklch(45.5% 0.188 13.697)",
    900: "oklch(41% 0.159 10.272)",
    950: "oklch(27.1% 0.105 12.094)"
  }
};
function je(e) {
  return He[e];
}
function gt(e) {
  const t = e.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
  if (!t) return null;
  const [l, a, o, r] = t.map(Number);
  return { lightness: a, chroma: o, hue: r };
}
function ya(e) {
  e = e.replace(/^#/, ""), e.length === 3 && (e = e.split("").map((o) => o + o).join(""));
  const t = parseInt(e.slice(0, 2), 16) / 255, l = parseInt(e.slice(2, 4), 16) / 255, a = parseInt(e.slice(4, 6), 16) / 255;
  return { r: t, g: l, b: a };
}
function ba(e) {
  const { r: t, g: l, b: a } = e, o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), r = l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4), i = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), u = 0.4124 * o + 0.3576 * r + 0.1805 * i, n = 0.2126 * o + 0.7152 * r + 0.0722 * i, c = 0.0193 * o + 0.1192 * r + 0.9505 * i, s = 0.95047, m = 1, v = 1.08883, p = u > 8856e-6 ? Math.pow(u / s, 1 / 3) : 7.787 * u / s + 16 / 116, h = n > 8856e-6 ? Math.pow(n / m, 1 / 3) : 7.787 * n / m + 16 / 116, b = c > 8856e-6 ? Math.pow(c / v, 1 / 3) : 7.787 * c / v + 16 / 116, I = 116 * h - 16, $ = 500 * (p - h), A = 200 * (h - b);
  return { l: I, a: $, b: A };
}
function xa(e) {
  const { l: t, a: l, b: a } = e, o = Math.sqrt(l * l + a * a);
  let r = Math.atan2(a, l) * 180 / Math.PI;
  return r < 0 && (r += 360), { l: t, c: o, h: r };
}
function wa(e) {
  const t = ya(e), l = ba(t), a = xa(l);
  return {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    // 限制在合理範圍內
    hue: a.h
  };
}
function ze(e) {
  return e.startsWith("oklch(");
}
function qe(e) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e);
}
function Pa(e, t) {
  const l = Math.min(
    Math.abs(e.hue - t.hue),
    360 - Math.abs(e.hue - t.hue)
  ), a = l > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((e.lightness - t.lightness) * 1.5, 2) + Math.pow((e.chroma - t.chroma) * 2, 2) + Math.pow(l / 360 * a, 2) * 100
  );
}
function it(e, t) {
  let l = "indigo", a = "500", o = 1 / 0;
  for (const [r, i] of Object.entries(t))
    for (const [u, n] of Object.entries(i)) {
      if (!["300", "400", "500", "600", "700"].includes(u)) continue;
      const c = gt(n);
      if (!c) continue;
      const s = Pa(e, c);
      s < o && (o = s, l = r, a = u);
    }
  return { color: l, shade: a, distance: o };
}
function ht(e) {
  const t = "indigo";
  if (ze(e)) {
    const l = gt(e);
    return l ? it(l, He).color : t;
  }
  if (qe(e)) {
    const l = wa(e);
    return it(l, He).color;
  }
  return e;
}
function Ca(e) {
  const t = je(e), l = {};
  return Object.entries(t).forEach(([a, o]) => {
    l[`--vdt-theme-${a}`] = o;
  }), l;
}
function Sa(e) {
  const t = typeof e == "string" && (qe(e) || ze(e)) ? ht(e) : e, l = Ca(t), a = document.documentElement;
  Object.entries(l).forEach(([o, r]) => {
    a.style.setProperty(o, r);
  });
}
function Ia(e) {
  const t = typeof e == "string" && (qe(e) || ze(e)) ? ht(e) : e;
  return Sa(t), {
    color: t,
    mainColor: je(t)[500] || je(t)[400]
  };
}
const $a = {}, Na = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Fa(e, t) {
  return k(), x("svg", Na, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ba = /* @__PURE__ */ pe($a, [["render", Fa]]), Ra = {}, Ma = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Aa(e, t) {
  return k(), x("svg", Ma, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const La = /* @__PURE__ */ pe(Ra, [["render", Aa]]), Ta = {}, Ea = { class: "px-3 py-1.5" };
function Da(e, t) {
  return k(), x("span", Ea, t[0] || (t[0] = [
    P("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      P("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Oa = /* @__PURE__ */ pe(Ta, [["render", Da]]), Ha = {}, ja = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Va(e, t) {
  return k(), x("svg", ja, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const za = /* @__PURE__ */ pe(Ha, [["render", Va]]), qa = {}, Wa = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ka(e, t) {
  return k(), x("svg", Wa, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Ua = /* @__PURE__ */ pe(qa, [["render", Ka]]), Ja = /* @__PURE__ */ E({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, l) => (k(), x("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      V(Ua, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), Ga = ["checked", "disabled", "aria-checked"], Za = {
  class: "h-4 w-4 text-white stroke-3",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Qa = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Xa = /* @__PURE__ */ E({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, l = y(() => t.checked), a = y(() => t.partial);
    return (o, r) => (k(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !o.disabled && "cursor-pointer group",
        o.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: r[0] || (r[0] = Ve((i) => !o.disabled && o.$emit("change"), ["stop", "prevent"]))
    }, [
      P("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: l.value,
        disabled: o.disabled,
        "aria-checked": l.value
      }, null, 8, Ga),
      P("div", {
        class: S(["h-4 w-4 rounded-sm transition-all duration-200 border", [
          // Base states
          l.value && !a.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          a.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          !l.value && !a.value && [
            "border-gray-300 bg-white",
            !o.disabled && "group-hover:border-vdt-primary-300"
          ],
          // Focus states
          !o.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50"
        ]])
      }, [
        De((k(), x("svg", Za, r[1] || (r[1] = [
          P("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Oe, l.value && !a.value]
        ]),
        De((k(), x("svg", Qa, r[2] || (r[2] = [
          P("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Oe, a.value]
        ])
      ], 2)
    ], 2));
  }
}), pt = /* @__PURE__ */ E({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const l = t;
    return (a, o) => (k(), W(Xa, {
      checked: a.checked,
      disabled: a.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (r) => l("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), Ya = /* @__PURE__ */ E({
  __name: "MultipleSelectCheckBox",
  props: {
    status: {
      type: String,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const l = e, a = y(() => l.status === "allSelected"), o = y(() => l.status === "partSelected"), r = t;
    return (i, u) => (k(), W(pt, {
      checked: a.value,
      partial: o.value,
      disabled: e.disabled,
      onChange: u[0] || (u[0] = (n) => r("change", !a.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), _a = {
  key: 1,
  class: "items-center gap-2"
}, el = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, tl = /* @__PURE__ */ E({
  __name: "TableHeaderCell",
  props: {
    header: {
      type: Object,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    fixedDistance: String,
    // lastFixedColumn: String,
    lastLeftFixedColumn: String,
    firstRightFixedColumn: String,
    headerItemClassName: {
      type: [String, Function],
      default: ""
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: {
      type: String,
      default: "noneSelected"
    },
    multiSort: Boolean,
    isMultiSorting: {
      type: Function,
      required: !0
    },
    getMultiSortNumber: {
      type: Function,
      required: !0
    }
  },
  emits: ["headerClick", "toggleSelectAll"],
  setup(e, { emit: t }) {
    const l = t, a = dt(), o = (i) => [
      `header-${i.value}`,
      `header-${i.value.toLowerCase()}`,
      "header"
    ].find((n) => a[n]) || "header", r = (i) => {
      i.sortable && i.sortType && l("headerClick", i);
    };
    return (i, u) => (k(), x("th", {
      style: Pe(e.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-300": e.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastLeftFixedColumn,
          "shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.firstRightFixedColumn
        },
        e.header.sortable && {
          "bg-gray-200": e.header.sortType === "none",
          "bg-gray-300": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
        },
        typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
      ]]),
      onClick: u[1] || (u[1] = Ve((n) => r(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (k(), W(Ya, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: u[0] || (u[0] = (n) => i.$emit("toggleSelectAll", n))
      }, null, 8, ["disabled", "status"])) : (k(), x("div", _a, [
        N(i.$slots, o(e.header), H(se({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          P("span", null, q(e.header.text), 1)
        ]),
        e.header.sortable ? (k(), W(d(Ja), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (k(), x("span", el, q(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), al = /* @__PURE__ */ E({
  __name: "TableHeader",
  props: {
    headers: {
      type: Array,
      required: !0
    },
    hideHeader: Boolean,
    fixedHeader: Boolean,
    headerClassName: String,
    borderCell: Boolean,
    lastLeftFixedColumn: String,
    firstRightFixedColumn: String,
    headerItemClassName: {
      type: [String, Function],
      default: ""
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: String,
    multiSort: Boolean,
    isMultiSorting: {
      type: Function,
      required: !0
    },
    getMultiSortNumber: {
      type: Function,
      required: !0
    },
    getFixedDistance: {
      type: Function,
      required: !0
    }
  },
  emits: ["headerClick", "toggleSelectAll"],
  setup(e, { emit: t }) {
    const l = t, a = (r) => {
      l("headerClick", r);
    }, o = (r) => {
      l("toggleSelectAll", r);
    };
    return (r, i) => e.headers.length && !e.hideHeader ? (k(), x("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm text-slate-700 uppercase text-nowrap text-left",
        { "sticky top-0 z-10": e.fixedHeader },
        e.headerClassName
      ]])
    }, [
      P("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-200": e.borderCell }]])
      }, [
        (k(!0), x(re, null, Q(e.headers, (u, n) => (k(), W(tl, {
          key: n,
          header: u,
          index: n,
          "fixed-distance": e.getFixedDistance(u.value),
          "last-left-fixed-column": e.lastLeftFixedColumn,
          "first-right-fixed-column": e.firstRightFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: a,
          onToggleSelectAll: o
        }, he({ _: 2 }, [
          Q(r.$slots, (c, s) => ({
            name: s,
            fn: G((m) => [
              N(r.$slots, s, Z({ ref_for: !0 }, m))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), ll = /* @__PURE__ */ E({
  __name: "TableBodyCell",
  props: {
    column: {},
    item: {},
    index: {},
    style: {},
    isDisabled: { type: Boolean },
    expandColumn: {},
    isExpanded: { type: Boolean },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["toggle-select", "toggle-expand"],
  setup(e, { emit: t }) {
    const l = e, a = t, o = y(() => l.isDisabled ?? !1), r = y(() => typeof l.bodyItemClassName == "function" ? l.bodyItemClassName(l.column, l.index) : l.bodyItemClassName), i = y(
      () => l.column === "expand" || l.column === l.expandColumn
    ), u = () => {
      i.value && l.expandColumn === "" && a("toggle-expand", event);
    }, n = (s) => {
      a("toggle-expand", s);
    }, c = () => {
      a("toggle-select");
    };
    return (s, m) => (k(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": s.column === "expand" && s.expandColumn === "" },
        r.value
      ]]),
      style: Pe(s.style),
      onClick: u
    }, [
      s.column === "checkbox" ? (k(), x(re, { key: 0 }, [
        s.column === "checkbox" ? N(s.$slots, "selection-checkbox", H(Z({ key: 0 }, { item: s.item, index: s.index, isDisabled: o.value, toggleSelectItem: c })), () => [
          V(pt, {
            checked: !!s.item.checkbox,
            disabled: o.value,
            onChange: c
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : i.value ? N(s.$slots, "expand-button", H(Z({ key: 1 }, { item: s.item, expanded: s.isExpanded, toggle: n })), () => [
        P("button", {
          onClick: Ve(n, ["stop"]),
          class: "inline-flex items-center"
        }, [
          V(d(za), {
            class: S({ "transform rotate-90": s.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : N(s.$slots, `item-${s.column}`, H(Z({ key: 2 }, s.item)), () => [
        N(s.$slots, `item-${s.column.toLowerCase()}`, H(se(s.item)), () => [
          N(s.$slots, "item", H(se({ column: s.column, item: s.item })), () => [
            Ae(q(d(ma)(s.column, s.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), ol = /* @__PURE__ */ E({
  __name: "TableBodyRow",
  props: {
    item: {},
    index: {},
    columns: {},
    alternating: { type: Boolean },
    noHover: { type: Boolean },
    borderCell: { type: Boolean },
    bodyRowClassName: { type: [String, Function] },
    isExpanded: { type: Boolean },
    isDisabled: { type: Boolean },
    expandColumn: {},
    getFixedDistance: { type: Function },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: t }) {
    const l = e, a = t, o = y(() => typeof l.bodyRowClassName == "function" ? l.bodyRowClassName(l.item, l.index) : l.bodyRowClassName), r = (n) => {
      a("click", n, l.item, l.index);
    }, i = (n) => {
      a("dblclick", n, l.item, l.index);
    }, u = (n) => {
      a("contextmenu", n, l.item);
    };
    return (n, c) => (k(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors border-t border-gray-200", [
        { "bg-white": n.alternating && n.index % 2 === 0 },
        { "bg-gray-50": !n.alternating || n.index % 2 === 1 },
        { "hover:bg-gray-100": !n.noHover },
        { "divide-x divide-gray-200": n.borderCell },
        o.value
      ]]),
      onClick: r,
      onDblclick: i,
      onContextmenu: u
    }, [
      N(n.$slots, "prepend"),
      (k(!0), x(re, null, Q(n.columns, (s, m) => {
        var v;
        return k(), W(ll, {
          key: m,
          column: s,
          item: n.item,
          index: n.index,
          style: Pe((v = n.getFixedDistance) == null ? void 0 : v.call(n, s, "td")),
          "is-disabled": n.isDisabled,
          "expand-column": n.expandColumn,
          "is-expanded": n.isExpanded,
          "body-item-class-name": n.bodyItemClassName,
          onToggleExpand: c[0] || (c[0] = (p) => n.$emit("toggle-expand", p, n.index, n.item)),
          onToggleSelect: c[1] || (c[1] = () => n.$emit("toggle-select", n.item))
        }, he({ _: 2 }, [
          Q(n.$slots, (p, h) => ({
            name: h,
            fn: G((b) => [
              N(n.$slots, h, Z({ ref_for: !0 }, b))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]);
      }), 128)),
      N(n.$slots, "append")
    ], 34));
  }
}), nl = {}, sl = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" };
function rl(e, t) {
  return k(), x("div", sl, t[0] || (t[0] = [
    P("div", { class: "absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500" }, null, -1)
  ]));
}
const il = /* @__PURE__ */ pe(nl, [["render", rl], ["__scopeId", "data-v-9ef81a40"]]), ul = ["colspan"], cl = { class: "overflow-hidden" }, dl = /* @__PURE__ */ E({
  __name: "TableExpandRow",
  props: {
    item: {},
    index: {},
    columnsCount: {},
    loading: { type: Boolean },
    isExpanded: { type: Boolean },
    bodyExpandRowClassName: { type: [String, Function] }
  },
  setup(e) {
    const t = e, l = y(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
    return (a, o) => (k(), x("tr", {
      class: S(["vdt-expand-row border-0", [l.value, { "bg-gray-50": (a.index + 1) % 2 === 0, "border-t": a.isExpanded }]])
    }, [
      P("td", {
        colspan: a.columnsCount,
        class: "relative p-0"
      }, [
        a.loading ? (k(), W(il, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        P("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": a.isExpanded }]])
        }, [
          P("div", cl, [
            N(a.$slots, "default")
          ])
        ], 2)
      ], 8, ul)
    ], 2));
  }
}), gl = { class: "flex items-center gap-2 text-sm text-gray-700" }, hl = { class: "relative inline-block min-w-[70px]" }, pl = ["aria-expanded"], fl = { class: "block truncate" }, ml = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, vl = ["aria-selected", "onClick"], kl = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-vdt-primary-600"
}, yl = /* @__PURE__ */ E({
  __name: "RowsPerPageSelector",
  props: {
    modelValue: {
      type: Number,
      requilime: !0
    },
    rowsItems: {
      type: Array,
      required: !0
    },
    message: {
      type: String,
      default: "Rows per page:"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const l = e, a = t, o = _(!1), r = _(!1), i = y({
      get: () => l.modelValue,
      set: (v) => a("update:modelValue", v)
    }), u = Ht("dataTable");
    de(o, (v) => {
      if (v && (u != null && u.value)) {
        const p = window.innerHeight, h = u.value.getBoundingClientRect(), b = p - (h.height + h.top);
        r.value = b <= 100;
      }
    });
    const n = (v) => {
      i.value = v, o.value = !1;
    }, c = () => {
      o.value = !o.value;
    }, s = (v) => {
      v.target.closest(".relative") || (o.value = !1);
    }, m = (v) => {
      const p = v.relatedTarget;
      p != null && p.closest(".relative") || (o.value = !1);
    };
    return ct(() => {
      document.addEventListener("click", s);
    }), jt(() => {
      document.removeEventListener("click", s);
    }), (v, p) => (k(), x("div", gl, [
      Ae(q(e.message) + " ", 1),
      P("div", hl, [
        P("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-gray-300", [
            "focus:border-vdt-primary-500 focus:outline-hidden focus:ring-1 focus:ring-vdt-primary-500",
            o.value ? "ring-1 ring-vdt-primary-500 border-vdt-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: c,
          "aria-haspopup": "listbox",
          "aria-expanded": o.value
        }, [
          P("span", fl, q(i.value), 1),
          P("span", ml, [
            (k(), x("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": o.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, p[0] || (p[0] = [
              P("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, pl),
        V(Vt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: G(() => [
            o.value ? (k(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": r.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: m
            }, [
              (k(!0), x(re, null, Q(e.rowsItems, (h) => (k(), x("li", {
                key: h,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  h === i.value ? "text-vdt-primary-800 bg-vdt-primary-100 font-semibold" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": h === i.value,
                onClick: (b) => n(h)
              }, [
                P("span", {
                  class: S(["block", { "font-medium": h === i.value }])
                }, q(h), 3),
                h === i.value ? (k(), x("span", kl, p[1] || (p[1] = [
                  P("svg", {
                    class: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    P("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1)
                ]))) : D("", !0)
              ], 10, vl))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), bl = { class: "text-sm text-gray-700" }, xl = /* @__PURE__ */ E({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, l) => (k(), x("div", bl, [
      N(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        Ae(q(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + q(t.rowsOfPageSeparatorMessage) + " " + q(t.totalItemsLength), 1)
      ])
    ]));
  }
}), wl = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Pl = ["disabled"], Cl = ["disabled"], ut = /* @__PURE__ */ E({
  __name: "PaginationArrows",
  props: {
    isFirstPage: {
      type: Boolean,
      required: !0,
      default: !1
    },
    isLastPage: {
      type: Boolean,
      required: !0,
      default: !1
    }
  },
  emits: ["clickPrevPage", "clickNextPage"],
  setup(e, { emit: t }) {
    const l = t;
    return (a, o) => (k(), x("div", wl, [
      P("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isFirstPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isFirstPage,
        onClick: o[0] || (o[0] = (r) => l("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        V(d(La), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Pl),
      N(a.$slots, "buttonsPagination"),
      P("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isLastPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isLastPage,
        onClick: o[1] || (o[1] = (r) => l("clickNextPage")),
        "aria-label": "Next page"
      }, [
        V(d(Ba), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Cl)
    ]));
  }
}), Sl = {
  class: "vdt-pagination inline-flex rounded-md shadow-xs",
  role: "navigation",
  "aria-label": "Pagination"
}, Il = ["onClick"], ge = 7, $l = /* @__PURE__ */ E({
  __name: "ButtonsPagination",
  props: {
    maxPaginationNumber: {
      type: Number,
      required: !0
    },
    currentPaginationNumber: {
      type: Number,
      required: !0
    }
  },
  emits: ["updatePage"],
  setup(e, { emit: t }) {
    const l = e, a = t, o = (i) => {
      i.type === "button" && !i.active && a("updatePage", i.page);
    }, r = y(() => {
      const i = [], { maxPaginationNumber: u, currentPaginationNumber: n } = l;
      if (u <= ge) {
        for (let c = 1; c <= u; c += 1)
          i.push({
            type: "button",
            page: c,
            active: c === n,
            activePrev: c + 1 === n
          });
        return i;
      }
      if ([1, 2, u, u - 1].includes(n))
        for (let c = 1; c <= ge; c += 1)
          if (c <= 3)
            i.push({
              type: "button",
              page: c,
              active: c === n,
              activePrev: c + 1 === n
            });
          else if (c === 4)
            i.push({ type: "omission" });
          else {
            const s = u - (ge - c);
            i.push({
              type: "button",
              page: s,
              active: s === n,
              activePrev: s + 1 === n
            });
          }
      else if ([3, 4].includes(n))
        for (let c = 1; c <= ge; c += 1)
          c <= 5 ? i.push({
            type: "button",
            page: c,
            active: c === n,
            activePrev: c + 1 === n
          }) : c === 6 ? i.push({ type: "omission" }) : i.push({
            type: "button",
            page: u,
            active: u === n,
            activePrev: !1
          });
      else if ([u - 2, u - 3].includes(n))
        for (let c = 1; c <= ge; c += 1)
          if (c === 1)
            i.push({
              type: "button",
              page: 1,
              active: n === 1,
              activePrev: !1
            });
          else if (c === 2)
            i.push({ type: "omission" });
          else {
            const s = u - (ge - c);
            i.push({
              type: "button",
              page: s,
              active: s === n,
              activePrev: s + 1 === n
            });
          }
      else
        for (let c = 1; c <= ge; c += 1)
          if (c === 1)
            i.push({
              type: "button",
              page: 1,
              active: n === 1,
              activePrev: !1
            });
          else if (c === 2 || c === 6)
            i.push({ type: "omission" });
          else if (c === 7)
            i.push({
              type: "button",
              page: u,
              active: u === n,
              activePrev: !1
            });
          else {
            const s = 4 - c, m = n - s;
            i.push({
              type: "button",
              page: m,
              active: m === n,
              activePrev: m + 1 === n
            });
          }
      return i;
    });
    return (i, u) => (k(), x("div", Sl, [
      (k(!0), x(re, null, Q(r.value, (n, c) => (k(), x("div", {
        key: c,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          c === 0 && "rounded-l-md",
          // Last item styles
          c === r.value.length - 1 && "rounded-r-md",
          // Button specific styles
          n.type === "button" && [
            "border border-gray-300",
            // Active state
            n.active ? [
              "z-10",
              "bg-vdt-primary-500 border-vdt-primary-500 text-white",
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-hidden focus:ring-1",
              "focus:ring-vdt-primary-500",
              "focus:border-vdt-primary-500"
            ],
            // Disable hover effect for active button
            !n.active && "cursor-pointer",
            // Connect borders for middle buttons
            c !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          n.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            c !== 0 && "-ml-px"
          ]
        ]]),
        onClick: (s) => o(n)
      }, [
        n.type === "button" ? (k(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": n.active }])
        }, q(n.page), 3)) : (k(), W(d(Oa), { key: 1 }))
      ], 10, Il))), 128))
    ]));
  }
}), Nl = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Fl = /* @__PURE__ */ E({
  __name: "TableFooter",
  props: {
    hideFooter: { type: Boolean },
    hideRowsPerPage: { type: Boolean },
    hidePaginationInfo: { type: Boolean },
    buttonsPagination: { type: Boolean },
    showShadow: { type: Boolean },
    footerClassName: {},
    rowsPerPage: {},
    rowsItems: {},
    rowsPerPageMessage: {},
    rowsOfPageSeparatorMessage: {},
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    currentPaginationNumber: {},
    maxPaginationNumber: {},
    isFirstPage: { type: Boolean },
    isLastPage: { type: Boolean }
  },
  emits: ["update:rowsPerPage", "nextPage", "prevPage", "updatePage"],
  setup(e, { emit: t }) {
    const l = e, a = t, o = y(() => ({
      isFirstPage: l.isFirstPage,
      isLastPage: l.isLastPage,
      currentPaginationNumber: l.currentPaginationNumber,
      maxPaginationNumber: l.maxPaginationNumber,
      nextPage: () => a("nextPage"),
      prevPage: () => a("prevPage"),
      updatePage: (r) => a("updatePage", r)
    }));
    return (r, i) => r.hideFooter ? D("", !0) : (k(), x("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-xs": r.showShadow }, r.footerClassName]])
    }, [
      V(ut, {
        "is-first-page": r.isFirstPage,
        "is-last-page": r.isLastPage,
        onClickNextPage: i[0] || (i[0] = () => a("nextPage")),
        onClickPrevPage: i[1] || (i[1] = () => a("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: G(() => i[6] || (i[6] = [
          P("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      P("div", Nl, [
        r.hideRowsPerPage ? D("", !0) : (k(), W(yl, {
          key: 0,
          "model-value": r.rowsPerPage,
          "rows-items": r.rowsItems,
          message: r.rowsPerPageMessage,
          "onUpdate:modelValue": i[2] || (i[2] = (u) => a("update:rowsPerPage", u))
        }, null, 8, ["model-value", "rows-items", "message"])),
        r.hidePaginationInfo ? D("", !0) : (k(), W(xl, {
          key: 1,
          "current-page-first-index": r.currentPageFirstIndex,
          "current-page-last-index": r.currentPageLastIndex,
          "total-items-length": r.totalItemsLength,
          "rows-of-page-separator-message": r.rowsOfPageSeparatorMessage
        }, he({ _: 2 }, [
          r.$slots["pagination-info"] ? {
            name: "default",
            fn: G((u) => [
              N(r.$slots, "pagination-info", H(se(u)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        r.$slots.pagination ? N(r.$slots, "pagination", H(Z({ key: 2 }, o.value))) : (k(), W(ut, {
          key: 3,
          "is-first-page": r.isFirstPage,
          "is-last-page": r.isLastPage,
          onClickNextPage: i[4] || (i[4] = () => a("nextPage")),
          onClickPrevPage: i[5] || (i[5] = () => a("prevPage"))
        }, he({ _: 2 }, [
          r.buttonsPagination ? {
            name: "buttonsPagination",
            fn: G(() => [
              V($l, {
                "current-pagination-number": r.currentPaginationNumber,
                "max-pagination-number": r.maxPaginationNumber,
                onUpdatePage: i[3] || (i[3] = (u) => a("updatePage", u))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Bl = ["id"], Rl = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Ml = { class: "relative z-10" }, Al = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, ft = /* @__PURE__ */ E({
  __name: "DataTable",
  props: {
    items: { default: () => [] },
    headers: { default: () => [] },
    currentPage: { default: 1 },
    rowsPerPage: { default: 25 },
    rowsItems: { default: () => [25, 50, 100] },
    hideFooter: { type: Boolean, default: !1 },
    hideRowsPerPage: { type: Boolean, default: !1 },
    rowsPerPageMessage: { default: "rows per page:" },
    rowsOfPageSeparatorMessage: { default: "of" },
    buttonsPagination: { type: Boolean, default: !0 },
    hidePaginationInfo: { type: Boolean },
    sortBy: { default: "" },
    sortType: { default: "asc" },
    multiSort: { type: Boolean, default: !1 },
    mustSort: { type: Boolean, default: !0 },
    filterOptions: { default: null },
    searchField: { default: "" },
    searchValue: { default: "" },
    serverOptions: { default: null },
    serverItemsLength: { default: 0 },
    theme: { default: () => "indigo" },
    alternating: { type: Boolean, default: !0 },
    noHover: { type: Boolean, default: !1 },
    borderCell: { type: Boolean, default: !1 },
    checkboxColumnWidth: { default: null },
    expandColumnWidth: { default: 36 },
    indexColumnWidth: { default: 60 },
    showIndex: { type: Boolean, default: !1 },
    showIndexSymbol: { default: "#" },
    fixedExpand: { type: Boolean, default: !1 },
    fixedHeader: { type: Boolean, default: !1 },
    fixedCheckbox: { type: Boolean, default: !1 },
    fixedIndex: { type: Boolean, default: !1 },
    wrapperClassName: { default: "" },
    containerClassName: { default: "" },
    tableClassName: { default: "" },
    headerClassName: { default: "" },
    bodyClassName: { default: "" },
    headerItemClassName: { type: [Function, String], default: "" },
    bodyRowClassName: { type: [Function, String], default: "" },
    bodyExpandRowClassName: { type: [Function, String], default: "" },
    bodyItemClassName: { type: [Function, String], default: "" },
    footerClassName: { default: "" },
    hideHeader: { type: Boolean, default: !1 },
    itemsSelected: { default: null },
    clickRowToSelect: { type: Boolean, default: !1 },
    disabledRows: { type: Function, default: () => !1 },
    loading: { type: Boolean, default: !1 },
    emptyMessage: { default: "No Available Data" },
    clickEventType: { default: "single" },
    clickRowToExpand: { type: Boolean, default: !1 },
    tableNodeId: { default: "" },
    preventContextMenuRow: { type: Boolean, default: !1 },
    expandColumn: { default: "" },
    expandTransition: { type: Boolean, default: void 0 },
    batchSelectionThreshold: { default: 1e4 }
  },
  emits: [
    "clickRow",
    "contextmenuRow",
    "selectRow",
    "deselectRow",
    "expandRow",
    "updateSort",
    "updateFilter",
    "update:itemsSelected",
    "update:serverOptions",
    "updatePageItems",
    "updateTotalItems",
    "selectAll",
    "updateSelectionStatus"
  ],
  setup(e, { expose: t, emit: l }) {
    const a = e, {
      checkboxColumnWidth: o,
      expandColumnWidth: r,
      indexColumnWidth: i,
      rowsItems: u,
      showIndexSymbol: n,
      currentPage: c,
      filterOptions: s,
      headers: m,
      itemsSelected: v,
      loading: p,
      items: h,
      rowsPerPage: b,
      searchField: I,
      searchValue: $,
      serverItemsLength: A,
      showIndex: L,
      sortBy: ee,
      sortType: j,
      serverOptions: te,
      multiSort: ie,
      mustSort: ke,
      clickEventType: ye,
      clickRowToExpand: be,
      clickRowToSelect: K,
      fixedExpand: B,
      fixedCheckbox: O,
      fixedIndex: T,
      batchSelectionThreshold: U,
      expandColumn: z
    } = zt(a);
    Ia(a.theme);
    const f = dt(), C = y(() => !!f.expand), w = y(() => !!f.body), M = y(
      () => typeof a.expandTransition < "u" ? a.expandTransition : C.value
    ), ae = _(null), le = _(null);
    qt("dataTable", ae);
    const X = l, fe = y(() => v.value !== null), oe = y(() => te.value !== null), {
      serverOptionsComputed: xe,
      updateServerOptionsPage: Ce,
      updateServerOptionsSort: mt,
      updateServerOptionsRowsPerPage: vt
    } = da(
      te,
      ie,
      X
    ), {
      clientSortOptions: We,
      headerColumns: Ke,
      headersForRender: me,
      updateSortField: kt,
      isMultiSorting: yt,
      getMultiSortNumber: bt
    } = la(
      n,
      o,
      r,
      O,
      B,
      T,
      m,
      C,
      i,
      fe,
      oe,
      ke,
      xe,
      L,
      ee,
      j,
      ie,
      z,
      mt,
      X
    ), {
      rowsItemsComputed: Ue,
      rowsPerPageRef: ve,
      updateRowsPerPage: Je
    } = ca(
      oe,
      u,
      te,
      b
    ), {
      totalItems: Ge,
      selectItemsComputed: xt,
      totalItemsLength: Se,
      toggleSelectAll: wt,
      toggleSelectItem: Ze,
      isProcessing: Pt,
      processProgress: Ct
    } = ka(
      We,
      s,
      oe,
      h,
      v,
      I,
      $,
      A,
      ie,
      U,
      a.disabledRows,
      X
    ), {
      currentPaginationNumber: ue,
      maxPaginationNumber: Ie,
      isLastPage: $e,
      isFirstPage: Ne,
      nextPage: Fe,
      prevPage: Be,
      updatePage: we,
      updateCurrentPaginationNumber: St
    } = ua(
      c,
      oe,
      p,
      Se,
      ve,
      te,
      Ce
    ), {
      currentPageFirstIndex: Qe,
      currentPageLastIndex: Xe,
      multipleSelectStatus: It,
      pageItems: ce
    } = ia(
      ue,
      fe,
      oe,
      h,
      ve,
      xt,
      L,
      Ge,
      Se,
      a.disabledRows
    ), Re = y(() => ue.value === 0 ? 0 : (ue.value - 1) * ve.value), {
      expandingItemIndexList: Le,
      updateExpandingItemIndexList: Ye,
      clearExpandingItemIndexList: _e
    } = ta(
      ce,
      Re,
      X
    ), {
      fixedHeaders: et,
      lastLeftFixedColumn: tt,
      firstRightFixedColumn: at,
      fixedColumnsInfos: $t,
      showShadow: lt
    } = aa(
      me,
      le
    ), Nt = (g) => {
      const ne = g.width ?? (et.value.length ? 100 : null);
      if (ne) return `width: ${ne}px; min-width: ${ne}px;`;
    }, ot = (g, ne = "th") => {
      if (!et.value.length) return;
      const F = $t.value.find((R) => R.value === g);
      if (F) {
        const R = F.position === "left";
        return `
            ${R ? `left: ${F.distance}px;` : `right: ${F.distance}px;`}
            z-index: ${ne === "th" ? 3 : 1};
            position: sticky;
            background-color: ${ne === "th" ? "none" : "inherit"};
            ${R && F.value === tt.value || !R && F.value === at.value ? `
                    box-shadow: ${R ? "4px 0 6px -2px" : "-4px 0 6px -2px"} rgba(0, 0, 0, 0.1);
                    clip-path: inset(0px ${R ? "-10px 0px 0px" : "0px 0px -10px"});
                ` : ""}
            isolation: isolate;
        `;
      }
    }, Ft = (g) => {
      g.sortable && g.sortType && kt(g.value, g.sortType);
    }, Te = (g) => typeof a.disabledRows == "function" ? a.disabledRows(g) : !1, Bt = y(() => ce.value.every((g) => a.disabledRows(g))), Rt = (g) => {
      Te(g) || Ze(g);
    }, {
      handleRowClick: Mt,
      handleRowDoubleClick: At,
      handleRowContextMenu: Lt
    } = ea(
      ye,
      fe,
      L,
      Te,
      be,
      K,
      Ye,
      Ze,
      X
    );
    return de(p, (g, ne) => {
      xe.value && g === !1 && ne === !0 && (St(xe.value.page), _e());
    }), de(ve, (g) => {
      oe.value ? vt(g) : we(1);
    }), de([$, s], () => {
      oe.value || we(1);
    }), de([ue, We, I, $, s], () => {
      _e();
    }, { deep: !0 }), de(ce, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), de(Ge, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Qe,
      currentPageLastIndex: Xe,
      clientItemsLength: Se,
      maxPaginationNumber: Ie,
      currentPaginationNumber: ue,
      isLastPage: $e,
      isFirstPage: Ne,
      nextPage: Fe,
      prevPage: Be,
      updatePage: we,
      rowsPerPageOptions: Ue,
      rowsPerPageActiveOption: ve,
      updateRowsPerPageActiveOption: Je
    }), (g, ne) => (k(), x("div", {
      ref_key: "tableWrapper",
      ref: ae,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      P("div", {
        ref_key: "tableContainer",
        ref: le,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-xs": d(lt) }, g.containerClassName]])
      }, [
        P("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [g.tableClassName]])
        }, [
          P("colgroup", null, [
            (k(!0), x(re, null, Q(d(me), (F, R) => (k(), x("col", {
              key: R,
              style: Pe(Nt(F))
            }, null, 4))), 128))
          ]),
          d(f)["customize-headers"] ? N(g.$slots, "customize-headers", { key: 0 }) : D("", !0),
          V(al, Z({
            headers: d(me),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: d(tt),
            firstRightFixedColumn: d(at),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Bt.value,
            multipleSelectStatus: d(It),
            multiSort: d(ie)
          }, {
            "is-multi-sorting": d(yt),
            "get-multi-sort-number": d(bt),
            "get-fixed-distance": ot,
            onHeaderClick: Ft,
            onToggleSelectAll: d(wt)
          }), he({ _: 2 }, [
            Q(g.$slots, (F, R) => ({
              name: R,
              fn: G((J) => [
                N(g.$slots, R, H(se(J)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          w.value ? N(g.$slots, "body", H(Z({ key: 1 }, d(ce)))) : d(Ke).length ? (k(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            N(g.$slots, "body-prepend", H(se({
              items: d(ce),
              pagination: { isFirstPage: d(Ne), isLastPage: d($e), currentPaginationNumber: d(ue), maxPaginationNumber: d(Ie), nextPage: d(Fe), prevPage: d(Be) },
              headers: d(me)
            }))),
            (k(!0), x(re, null, Q(d(ce), (F, R) => (k(), x(re, {
              key: F.key || R
            }, [
              V(ol, {
                item: F,
                index: R,
                columns: d(Ke),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": d(Le).includes(R + Re.value),
                "is-disabled": Te(F),
                "expand-column": d(z),
                "get-fixed-distance": ot,
                onClick: (J) => d(Mt)(J, F, R),
                onDblclick: (J) => d(At)(J, F, R),
                onContextmenu: (J) => d(Lt)(J, F),
                onToggleExpand: (J) => d(Ye)(R, F, J),
                onToggleSelect: (J) => Rt(F)
              }, he({ _: 2 }, [
                Q(g.$slots, (J, nt) => ({
                  name: nt,
                  fn: G((Tt) => [
                    N(g.$slots, nt, Z({ ref_for: !0 }, Tt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              M.value || d(Le).includes(R + Re.value) ? (k(), W(dl, {
                key: 0,
                item: F,
                index: R,
                "columns-count": d(me).length,
                loading: F.expandLoading,
                "is-expanded": d(Le).includes(R + Re.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: G(() => [
                  N(g.$slots, "expand", Z({ ref_for: !0 }, F))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            N(g.$slots, "body-append", H(se({
              items: d(ce),
              pagination: { isFirstPage: d(Ne), isLastPage: d($e), currentPaginationNumber: d(ue), maxPaginationNumber: d(Ie), nextPage: d(Fe), prevPage: d(Be), updatePage: d(we) },
              headers: d(me)
            })))
          ], 2)) : D("", !0)
        ], 10, Bl),
        d(p) ? (k(), x("div", Rl, [
          P("div", Ml, [
            N(g.$slots, "loading", {}, () => [
              V(Jt)
            ])
          ])
        ])) : D("", !0),
        !d(ce).length && !d(p) ? (k(), x("div", Al, [
          N(g.$slots, "empty-message", {}, () => [
            Ae(q(g.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      V(Fl, Z({
        hideFooter: g.hideFooter,
        hideRowsPerPage: g.hideRowsPerPage,
        hidePaginationInfo: g.hidePaginationInfo,
        buttonsPagination: g.buttonsPagination,
        showShadow: d(lt),
        footerClassName: g.footerClassName,
        rowsPerPage: d(ve),
        rowsItems: d(Ue),
        rowsPerPageMessage: g.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: g.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: d(Qe),
        currentPageLastIndex: d(Xe),
        totalItemsLength: d(Se),
        currentPaginationNumber: d(ue),
        maxPaginationNumber: d(Ie),
        isFirstPage: d(Ne),
        isLastPage: d($e)
      }, {
        "onUpdate:rowsPerPage": d(Je),
        onNextPage: d(Fe),
        onPrevPage: d(Be),
        onUpdatePage: d(we)
      }), he({ _: 2 }, [
        g.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: G((F) => [
            N(g.$slots, "pagination-info", H(se(F)))
          ]),
          key: "0"
        } : void 0,
        g.$slots.pagination ? {
          name: "pagination",
          fn: G((F) => [
            N(g.$slots, "pagination", H(se(F)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      De(V(_t, { progress: d(Ct) }, null, 8, ["progress"]), [
        [Oe, d(Pt)]
      ])
    ], 2));
  }
}), Ll = (e) => {
  e.component("DataTable", ft);
};
ft.install = Ll;
export {
  Dl as createFilter,
  ft as default,
  Ll as install
};
