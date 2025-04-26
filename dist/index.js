var Tt = Object.defineProperty;
var Et = (e, t, o) => t in e ? Tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var He = (e, t, o) => Et(e, typeof t != "symbol" ? t + "" : t, o);
import { defineComponent as L, inject as be, createElementBlock as x, openBlock as k, Fragment as re, renderList as Q, createElementVNode as P, normalizeStyle as ie, normalizeClass as S, unref as d, toDisplayString as U, ref as _, computed as y, onMounted as ct, onUnmounted as Dt, watch as he, createVNode as q, withModifiers as qe, withDirectives as Oe, vShow as je, createBlock as V, useSlots as dt, renderSlot as I, createCommentVNode as E, normalizeProps as O, guardReactiveProps as ne, createSlots as me, withCtx as Z, mergeProps as G, createTextVNode as Te, onBeforeUnmount as Ht, Transition as Ot, toRefs as jt, provide as st } from "vue";
const qt = { class: "inline-flex relative w-[60px] h-[60px]" }, zt = /* @__PURE__ */ L({
  __name: "Loading",
  setup(e) {
    const t = be("themeClasses");
    return (o, l) => (k(), x("div", qt, [
      (k(), x(re, null, Q(4, (s) => P("div", {
        key: s,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(s - 1) * 150}`]]),
        style: ie({
          borderTopColor: d(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), fe = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [l, s] of t)
    o[l] = s;
  return o;
}, Ut = /* @__PURE__ */ fe(zt, [["__scopeId", "data-v-e9a27991"]]), Vt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Wt = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Kt = { class: "w-64" }, Jt = { class: "h-2 bg-gray-200 rounded-sm" }, Zt = { class: "text-center text-sm text-gray-600" }, Gt = /* @__PURE__ */ L({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = be("themeClasses");
    return (o, l) => (k(), x("div", Vt, [
      P("div", Wt, [
        l[0] || (l[0] = P("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        P("div", Kt, [
          P("div", Jt, [
            P("div", {
              class: "h-2 rounded-sm transition-all duration-300 ease-out",
              style: ie({ width: `${o.progress}%`, backgroundColor: d(t).hex })
            }, null, 4)
          ])
        ]),
        P("div", Zt, U(Math.round(o.progress)) + "% ", 1)
      ])
    ]));
  }
});
function Qt(e, t, o, l, s, i, u, n, r) {
  const c = (f, m) => {
    const b = { ...f };
    return t.value && (delete b.checkbox, b.isSelected = f.checkbox), o.value && (delete b.index, b.indexInCurrentPage = m + 1), b;
  };
  return {
    handleRowClick: (f, m, b) => {
      if (!f.target.closest(".checkbox, .expand-button") && (s.value && u(b, m, f), i.value && !l(m) && n(m), e.value === "single")) {
        const $ = c(m, b);
        r("clickRow", $, f);
      }
    },
    handleRowDoubleClick: (f, m, b) => {
      if (e.value === "double") {
        const $ = c(m, b);
        r("clickRow", $, f);
      }
    },
    handleRowContextMenu: (f, m) => {
      const b = c(m, -1);
      r("contextmenuRow", b, f);
    }
  };
}
function Xt(e, t, o) {
  const l = _([]);
  return {
    expandingItemIndexList: l,
    // 展開項的索引列表
    updateExpandingItemIndexList: (u, n, r) => {
      r.stopPropagation();
      const c = l.value.indexOf(u);
      if (c !== -1)
        l.value.splice(c, 1);
      else {
        const a = e.value.findIndex((h) => JSON.stringify(h) === JSON.stringify(n));
        o("expandRow", t.value + a, n), l.value.push(t.value + a);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      l.value = [];
    }
    // 清空展開列表的方法
  };
}
function Yt(e, t) {
  const o = y(() => e.value.filter((a) => a.fixed)), l = y(() => o.value.filter((a) => !a.fixedPosition || a.fixedPosition === "left")), s = y(() => o.value.filter((a) => a.fixedPosition === "right")), i = y(() => l.value.length ? l.value[l.value.length - 1].value : ""), u = y(() => s.value.length ? s.value[0].value : ""), n = y(() => {
    if (!o.value.length) return [];
    const a = [];
    if (l.value.length) {
      const h = l.value.map((p) => p.width ?? 100);
      l.value.forEach((p, f) => {
        a.push({
          value: p.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: p.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: f === 0 ? 0 : h.reduce((m, b, $) => $ < f ? m + b : m, 0)
        });
      });
    }
    if (s.value.length) {
      const h = s.value.map((p) => p.width ?? 100);
      s.value.forEach((p, f) => {
        a.push({
          value: p.value,
          fixed: !0,
          position: "right",
          width: p.width ?? 100,
          distance: f === s.value.length - 1 ? 0 : h.reduce((m, b, $) => $ > f ? m + b : m, 0)
        });
      });
    }
    return a;
  }), r = _(!1);
  let c = null;
  return ct(() => {
    const a = t.value;
    if (a) {
      const h = () => {
        r.value = a.scrollLeft > 0;
      };
      h(), a.addEventListener("scroll", h), c = () => {
        a.removeEventListener("scroll", h);
      };
    }
  }), Dt(() => {
    c && (c(), c = null);
  }), {
    fixedHeaders: o,
    leftFixedHeaders: l,
    rightFixedHeaders: s,
    lastLeftFixedColumn: i,
    firstRightFixedColumn: u,
    fixedColumnsInfos: n,
    showShadow: r
  };
}
function _t(e, t, o, l, s, i, u, n, r, c, a, h, p, f, m, b, $, N, D, M) {
  const ee = y(() => u.value.length ? {
    hasFixedColumns: u.value.some((B) => B.fixed),
    fixedHeaders: u.value.filter((B) => B.fixed),
    unFixedHeaders: u.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), j = _(
    ea(m.value, b.value, $.value)
  ), te = y(() => {
    const B = u.value.filter(
      (z) => z.fixed && (!z.fixedPosition || z.fixedPosition === "left")
    ), H = u.value.filter((z) => !z.fixed), T = u.value.filter(
      (z) => z.fixed && z.fixedPosition === "right"
    );
    return [
      ...Object.values(ue.value).filter(Boolean),
      ...B,
      ...H,
      ...T
    ];
  }), ue = y(() => ({
    checkbox: c.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: l.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value ?? 36
    },
    index: f.value && {
      text: e.value,
      value: "index",
      fixed: i.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: r.value
    },
    expand: n.value && !N.value && {
      text: "",
      value: "expand",
      fixed: s.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: o.value
    }
  })), xe = y(
    () => te.value.map((B) => B.value)
  ), we = (B, H) => {
    const T = H === "none" ? "asc" : H === "asc" ? "desc" : h.value ? "asc" : null;
    if (a.value) {
      D(B, T);
      return;
    }
    const K = $.value ? ta(B, T, j.value) : aa(B, T);
    j.value = K, M("updateSort", { sortType: T, sortBy: B });
  }, Pe = y(() => (B) => {
    var T, K;
    const H = a.value ? (T = p.value) == null ? void 0 : T.sortBy : (K = j.value) == null ? void 0 : K.sortBy;
    return Array.isArray(H) && H.includes(B);
  }), W = y(() => (B) => {
    var T, K;
    const H = a.value ? (T = p.value) == null ? void 0 : T.sortBy : (K = j.value) == null ? void 0 : K.sortBy;
    return Array.isArray(H) ? H.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: j,
    headerColumns: xe,
    headersForRender: te,
    updateSortField: we,
    isMultiSorting: Pe,
    getMultiSortNumber: W
  };
}
function ea(e, t, o) {
  return o && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((l) => l === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const ta = (e, t, o) => {
  if (!(o != null && o.sortBy) || !Array.isArray(o.sortBy) || !Array.isArray(o.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const l = o.sortBy.indexOf(e), s = [...o.sortBy], i = [...o.sortDesc];
  return l === -1 && t !== null ? (s.push(e), i.push(t === "desc")) : t === null ? (s.splice(l, 1), i.splice(l, 1)) : i[l] = t === "desc", { sortBy: s, sortDesc: i };
}, aa = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
class la {
  constructor() {
    He(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    He(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let o = this.itemKeyCache.get(t);
    if (!o) {
      const { checkbox: l, index: s, ...i } = t;
      o = Object.entries(i).sort(([u], [n]) => u.localeCompare(n)).map(([u, n]) => `${u}:${n}`).join("|"), this.itemKeyCache.set(t, o);
    }
    return o;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function oa(e, t, o, l, s, i, u, n, r, c) {
  const a = new la(), h = y(
    () => (e.value - 1) * s.value + 1
  ), p = y(() => o.value ? Math.min(
    r.value,
    e.value * s.value
  ) : Math.min(
    n.value.length,
    e.value * s.value
  )), f = y(() => o.value ? l.value : n.value.slice(
    h.value - 1,
    p.value
  )), m = y(() => u.value ? f.value.map((N, D) => ({
    index: h.value + D,
    ...N
  })) : f.value), b = y(() => {
    if (i.value.length === 0)
      return "noneSelected";
    const N = c ? n.value.filter((M) => !c(M)) : n.value;
    return i.value.length === N.length && i.value.every(
      (ee) => N.some(
        (j) => a.getItemKey(ee) === a.getItemKey(j)
      )
    ) ? "allSelected" : "partSelected";
  }), $ = y(() => {
    if (!t.value)
      return m.value;
    switch (b.value) {
      case "allSelected":
        return m.value.map((N) => ({
          checkbox: !c || !c(N),
          // 考慮禁用狀態
          ...N
        }));
      case "noneSelected":
        return m.value.map((N) => ({
          checkbox: !1,
          ...N
        }));
      default:
        return m.value.map((N) => ({
          checkbox: i.value.some(
            (M) => a.getItemKey(N) === a.getItemKey(M)
          ) && (!c || !c(N)),
          ...N
        }));
    }
  });
  return {
    currentPageFirstIndex: h,
    currentPageLastIndex: p,
    multipleSelectStatus: b,
    pageItems: $
  };
}
function sa(e, t, o, l, s, i, u) {
  const n = _(i.value ? i.value.page : e.value), r = y(() => Math.ceil(l.value / s.value)), c = y(() => r.value === 0 || n.value === r.value), a = y(() => n.value === 1);
  return {
    currentPaginationNumber: n,
    maxPaginationNumber: r,
    isLastPage: c,
    isFirstPage: a,
    nextPage: () => {
      if (l.value !== 0 && !c.value && !o.value)
        if (t.value) {
          const b = n.value + 1;
          u(b);
        } else
          n.value += 1;
    },
    prevPage: () => {
      if (l.value !== 0 && !a.value && !o.value)
        if (t.value) {
          const b = n.value - 1;
          u(b);
        } else
          n.value -= 1;
    },
    updatePage: (b) => {
      o.value || (t.value ? u(b) : n.value = b);
    },
    updateCurrentPaginationNumber: (b) => {
      n.value = b;
    }
  };
}
function na(e, t, o, l) {
  var n;
  const s = y(() => !e.value && t.value.findIndex((r) => r === l.value) === -1 ? [l.value, ...t.value] : t.value), i = _(((n = o.value) == null ? void 0 : n.rowsPerPage) ?? l.value);
  return {
    rowsItemsComputed: s,
    // 計算後的每頁行數選項
    rowsPerPageRef: i,
    // 每頁行數
    updateRowsPerPage: (r) => {
      i.value = r;
    }
    // 更新每頁行數
  };
}
function ra(e, t, o) {
  const l = y({
    get: () => {
      if (e.value) {
        const { page: n, rowsPerPage: r, sortBy: c, sortType: a } = e.value;
        return { page: n, rowsPerPage: r, sortBy: c ?? null, sortType: a ?? null };
      }
      return null;
    },
    set: (n) => {
      o("update:serverOptions", n);
    }
  });
  return {
    serverOptionsComputed: l,
    updateServerOptionsPage: (n) => {
      l.value && (l.value = {
        ...l.value,
        page: n
      });
    },
    updateServerOptionsSort: (n, r) => {
      if (l.value)
        if (t.value && Array.isArray(l.value.sortBy) && Array.isArray(l.value.sortType)) {
          const c = l.value.sortBy.findIndex((a) => a === n);
          c === -1 && r !== null && (l.value.sortBy.push(n), l.value.sortType.push(r)), r === null ? (l.value.sortBy.splice(c, 1), l.value.sortType.splice(c, 1)) : l.value.sortType[c] = r;
        } else
          l.value = {
            ...l.value,
            sortBy: r !== null ? n : null,
            sortType: r
          };
    },
    updateServerOptionsRowsPerPage: (n) => {
      l.value && (l.value = {
        ...l.value,
        page: 1,
        rowsPerPage: n
      });
    }
  };
}
function ia(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ua(e) {
  return e.comparison === "in";
}
function ca(e) {
  return typeof e.comparison == "function";
}
function da(e) {
  return typeof e == "number" && !isNaN(e);
}
const Nl = {
  number(e, t, o) {
    return { field: e, comparison: t, criteria: o };
  },
  string(e, t, o) {
    return { field: e, comparison: t, criteria: o };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, o) {
    return { field: e, comparison: t, criteria: o };
  }
};
function Y(e, t) {
  if (e.includes(".")) {
    const o = e.split(".");
    let l = t;
    for (const s of o)
      if (l && typeof l == "object")
        l = l[s];
      else
        return "";
    return l ?? "";
  }
  return t[e] ?? "";
}
function ga(e, t) {
  const o = Y(e, t);
  return Array.isArray(o) ? o.join(",") : o;
}
const nt = 1e3, rt = /* @__PURE__ */ new WeakMap(), Me = (e) => {
  let t = rt.get(e);
  if (!t) {
    const { checkbox: o, index: l, ...s } = e;
    t = JSON.stringify(s), rt.set(e, t);
  }
  return t;
};
function ha(e, t, o, l) {
  const s = _({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  he(t, (a) => {
    if (a === null) {
      s.value.selectedItems.clear(), s.value.itemsMap.clear();
      return;
    }
    const h = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
    for (const f of a) {
      const m = Me(f);
      h.add(m), p.set(m, f);
    }
    s.value.selectedItems = h, s.value.itemsMap = p;
  }, { immediate: !0, deep: !0 });
  const i = async (a, h, p) => new Promise((f) => {
    requestAnimationFrame(() => {
      const m = new Set(s.value.selectedItems), b = new Map(s.value.itemsMap);
      for (let $ = 0; $ < a.length; $++) {
        const N = a[$], D = Me(N);
        h ? (m.add(D), b.set(D, N)) : m.delete(D), s.value.processedCount = p + $ + 1, s.value.visualProgress = s.value.processedCount / s.value.totalCount * 100;
      }
      s.value.selectedItems = m, s.value.itemsMap = b, f();
    });
  }), u = async (a) => {
    if (!s.value.selectionInProgress)
      try {
        if (s.value.selectionInProgress = !0, s.value.processedCount = 0, s.value.totalCount = e.value.length, s.value.visualProgress = 0, !a) {
          s.value.selectedItems.clear(), s.value.itemsMap.clear(), l("update:itemsSelected", []), s.value.visualProgress = 100;
          return;
        }
        const h = e.value;
        for (let p = 0; p < h.length; p += nt) {
          const m = h.slice(p, Math.min(p + nt, h.length)).filter((b) => !o(b));
          await i(m, a, p), await new Promise((b) => setTimeout(b, 0));
        }
        l("update:itemsSelected", r.value), a && l("selectAll");
      } finally {
        s.value.selectionInProgress = !1;
      }
  }, n = (a) => {
    const h = Me(a), p = { ...a };
    delete p.checkbox, delete p.index;
    const f = new Set(s.value.selectedItems), m = new Map(s.value.itemsMap);
    f.has(h) ? (f.delete(h), l("deselectRow", p)) : (f.add(h), m.set(h, p), l("selectRow", p)), s.value.selectedItems = f, s.value.itemsMap = m, l("update:itemsSelected", Array.from(m.values()).filter(($) => f.has(Me($))));
  }, r = y(() => s.value.selectedItems.size === 0 ? [] : Array.from(s.value.itemsMap.entries()).filter(([a]) => s.value.selectedItems.has(a)).map(([, a]) => a)), c = y(() => s.value.visualProgress);
  return {
    selectedItems: r,
    toggleSelectAll: u,
    toggleSelectItem: n,
    isProcessing: y(() => s.value.selectionInProgress),
    selectionProgress: c
  };
}
function pa(e, t, o, l, s, i, u, n, r, c, a, h) {
  const p = /* @__PURE__ */ new WeakMap(), f = (v) => {
    let C = p.get(v);
    return C || (typeof i.value == "string" && i.value !== "" ? C = String(Y(i.value, v)) : Array.isArray(i.value) ? C = i.value.map((w) => String(Y(w, v))).join(" ") : C = Object.values(v).map(String).join(" "), p.set(v, C)), C;
  }, m = y(() => {
    if (!o.value && u.value !== "") {
      const v = new RegExp(u.value, "i");
      return l.value.filter((C) => v.test(f(C)));
    }
    return l.value;
  }), b = (v, C) => {
    const w = da(v) ? v : parseFloat(String(v));
    if (isNaN(w)) return !1;
    if (C.comparison === "between" && Array.isArray(C.criteria)) {
      const [ce, ae] = C.criteria;
      return w >= ce && w <= ae;
    }
    const A = C.criteria;
    switch (C.comparison) {
      case ">":
        return w > A;
      case ">=":
        return w >= A;
      case "<":
        return w < A;
      case "<=":
        return w <= A;
      default:
        return !1;
    }
  }, $ = y(() => {
    var v;
    return (v = t.value) != null && v.length ? m.value.filter(
      (C) => t.value.every((w) => {
        const A = Y(w.field, C);
        return ca(w) ? w.comparison(A, w.criteria) : ia(w) ? b(A, w) : ua(w) ? w.criteria.includes(A) : w.comparison === "=" ? A === w.criteria : A !== w.criteria;
      })
    ) : m.value;
  }), N = (v, C, w) => v === C ? 0 : v == null ? 1 : C == null ? -1 : v < C ? w ? 1 : -1 : w ? -1 : 1, D = (v, C, w, A) => A < 0 ? v : D(v, C, w, A - 1).sort((ce, ae) => {
    if (!C.slice(0, A).every((ve) => Y(ve, ce) === Y(ve, ae))) return 0;
    const X = C[A], Se = Y(X, ce), le = Y(X, ae);
    return N(Se, le, w[A]);
  }), M = y(() => {
    if (o.value) return l.value;
    if (!e.value) return $.value;
    const { sortBy: v, sortDesc: C } = e.value, w = [...$.value];
    return r.value && Array.isArray(v) && Array.isArray(C) ? v.length ? D(w, v, C, v.length - 1) : w : w.sort((A, ce) => {
      const ae = Y(v, A), Ce = Y(v, ce);
      return N(ae, Ce, C);
    });
  }), ee = y(() => o.value ? n.value : M.value.length), j = y(() => o.value ? !1 : (o.value ? n.value : l.value.length) >= c.value), {
    selectedItems: te,
    toggleSelectAll: ue,
    toggleSelectItem: xe,
    isProcessing: we,
    selectionProgress: Pe
  } = ha(M, s, a, h), W = y({
    get: () => s.value ?? [],
    set: (v) => {
      h("update:itemsSelected", v);
    }
  }), B = (v) => v.filter((C) => !a(C)), H = (v) => {
    W.value = v ? B(M.value) : W.value = [], v && h("selectAll");
  }, T = (v) => {
    const C = v.checkbox;
    if (delete v.checkbox, delete v.index, C)
      W.value = W.value.filter(
        (w) => JSON.stringify(w) !== JSON.stringify(v)
      ), h("deselectRow", v);
    else {
      const w = W.value;
      w.unshift(v), W.value = w, h("selectRow", v);
    }
  };
  return {
    totalItems: M,
    selectItemsComputed: W,
    totalItemsLength: ee,
    toggleSelectAll: (v) => {
      if (!M.value.every((w) => a(w)))
        if (j.value) {
          h("updateSelectionStatus", !0);
          try {
            ue(v), h("update:itemsSelected", v ? Array.from(te.value) : []), v && h("selectAll");
          } finally {
            h("updateSelectionStatus", !1);
          }
        } else
          H(v);
    },
    toggleSelectItem: (v) => {
      a(v) || (j.value ? xe(v) : T(v));
    },
    isProcessing: y(() => j.value && we.value),
    processProgress: Pe
  };
}
var se = { inherit: "inherit", current: "currentcolor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "oklch(98.4% 0.003 247.858)", 100: "oklch(96.8% 0.007 247.896)", 200: "oklch(92.9% 0.013 255.508)", 300: "oklch(86.9% 0.022 252.894)", 400: "oklch(70.4% 0.04 256.788)", 500: "oklch(55.4% 0.046 257.417)", 600: "oklch(44.6% 0.043 257.281)", 700: "oklch(37.2% 0.044 257.287)", 800: "oklch(27.9% 0.041 260.031)", 900: "oklch(20.8% 0.042 265.755)", 950: "oklch(12.9% 0.042 264.695)" }, gray: { 50: "oklch(98.5% 0.002 247.839)", 100: "oklch(96.7% 0.003 264.542)", 200: "oklch(92.8% 0.006 264.531)", 300: "oklch(87.2% 0.01 258.338)", 400: "oklch(70.7% 0.022 261.325)", 500: "oklch(55.1% 0.027 264.364)", 600: "oklch(44.6% 0.03 256.802)", 700: "oklch(37.3% 0.034 259.733)", 800: "oklch(27.8% 0.033 256.848)", 900: "oklch(21% 0.034 264.665)", 950: "oklch(13% 0.028 261.692)" }, zinc: { 50: "oklch(98.5% 0 0)", 100: "oklch(96.7% 0.001 286.375)", 200: "oklch(92% 0.004 286.32)", 300: "oklch(87.1% 0.006 286.286)", 400: "oklch(70.5% 0.015 286.067)", 500: "oklch(55.2% 0.016 285.938)", 600: "oklch(44.2% 0.017 285.786)", 700: "oklch(37% 0.013 285.805)", 800: "oklch(27.4% 0.006 286.033)", 900: "oklch(21% 0.006 285.885)", 950: "oklch(14.1% 0.005 285.823)" }, neutral: { 50: "oklch(98.5% 0 0)", 100: "oklch(97% 0 0)", 200: "oklch(92.2% 0 0)", 300: "oklch(87% 0 0)", 400: "oklch(70.8% 0 0)", 500: "oklch(55.6% 0 0)", 600: "oklch(43.9% 0 0)", 700: "oklch(37.1% 0 0)", 800: "oklch(26.9% 0 0)", 900: "oklch(20.5% 0 0)", 950: "oklch(14.5% 0 0)" }, stone: { 50: "oklch(98.5% 0.001 106.423)", 100: "oklch(97% 0.001 106.424)", 200: "oklch(92.3% 0.003 48.717)", 300: "oklch(86.9% 0.005 56.366)", 400: "oklch(70.9% 0.01 56.259)", 500: "oklch(55.3% 0.013 58.071)", 600: "oklch(44.4% 0.011 73.639)", 700: "oklch(37.4% 0.01 67.558)", 800: "oklch(26.8% 0.007 34.298)", 900: "oklch(21.6% 0.006 56.043)", 950: "oklch(14.7% 0.004 49.25)" }, red: { 50: "oklch(97.1% 0.013 17.38)", 100: "oklch(93.6% 0.032 17.717)", 200: "oklch(88.5% 0.062 18.334)", 300: "oklch(80.8% 0.114 19.571)", 400: "oklch(70.4% 0.191 22.216)", 500: "oklch(63.7% 0.237 25.331)", 600: "oklch(57.7% 0.245 27.325)", 700: "oklch(50.5% 0.213 27.518)", 800: "oklch(44.4% 0.177 26.899)", 900: "oklch(39.6% 0.141 25.723)", 950: "oklch(25.8% 0.092 26.042)" }, orange: { 50: "oklch(98% 0.016 73.684)", 100: "oklch(95.4% 0.038 75.164)", 200: "oklch(90.1% 0.076 70.697)", 300: "oklch(83.7% 0.128 66.29)", 400: "oklch(75% 0.183 55.934)", 500: "oklch(70.5% 0.213 47.604)", 600: "oklch(64.6% 0.222 41.116)", 700: "oklch(55.3% 0.195 38.402)", 800: "oklch(47% 0.157 37.304)", 900: "oklch(40.8% 0.123 38.172)", 950: "oklch(26.6% 0.079 36.259)" }, amber: { 50: "oklch(98.7% 0.022 95.277)", 100: "oklch(96.2% 0.059 95.617)", 200: "oklch(92.4% 0.12 95.746)", 300: "oklch(87.9% 0.169 91.605)", 400: "oklch(82.8% 0.189 84.429)", 500: "oklch(76.9% 0.188 70.08)", 600: "oklch(66.6% 0.179 58.318)", 700: "oklch(55.5% 0.163 48.998)", 800: "oklch(47.3% 0.137 46.201)", 900: "oklch(41.4% 0.112 45.904)", 950: "oklch(27.9% 0.077 45.635)" }, yellow: { 50: "oklch(98.7% 0.026 102.212)", 100: "oklch(97.3% 0.071 103.193)", 200: "oklch(94.5% 0.129 101.54)", 300: "oklch(90.5% 0.182 98.111)", 400: "oklch(85.2% 0.199 91.936)", 500: "oklch(79.5% 0.184 86.047)", 600: "oklch(68.1% 0.162 75.834)", 700: "oklch(55.4% 0.135 66.442)", 800: "oklch(47.6% 0.114 61.907)", 900: "oklch(42.1% 0.095 57.708)", 950: "oklch(28.6% 0.066 53.813)" }, lime: { 50: "oklch(98.6% 0.031 120.757)", 100: "oklch(96.7% 0.067 122.328)", 200: "oklch(93.8% 0.127 124.321)", 300: "oklch(89.7% 0.196 126.665)", 400: "oklch(84.1% 0.238 128.85)", 500: "oklch(76.8% 0.233 130.85)", 600: "oklch(64.8% 0.2 131.684)", 700: "oklch(53.2% 0.157 131.589)", 800: "oklch(45.3% 0.124 130.933)", 900: "oklch(40.5% 0.101 131.063)", 950: "oklch(27.4% 0.072 132.109)" }, green: { 50: "oklch(98.2% 0.018 155.826)", 100: "oklch(96.2% 0.044 156.743)", 200: "oklch(92.5% 0.084 155.995)", 300: "oklch(87.1% 0.15 154.449)", 400: "oklch(79.2% 0.209 151.711)", 500: "oklch(72.3% 0.219 149.579)", 600: "oklch(62.7% 0.194 149.214)", 700: "oklch(52.7% 0.154 150.069)", 800: "oklch(44.8% 0.119 151.328)", 900: "oklch(39.3% 0.095 152.535)", 950: "oklch(26.6% 0.065 152.934)" }, emerald: { 50: "oklch(97.9% 0.021 166.113)", 100: "oklch(95% 0.052 163.051)", 200: "oklch(90.5% 0.093 164.15)", 300: "oklch(84.5% 0.143 164.978)", 400: "oklch(76.5% 0.177 163.223)", 500: "oklch(69.6% 0.17 162.48)", 600: "oklch(59.6% 0.145 163.225)", 700: "oklch(50.8% 0.118 165.612)", 800: "oklch(43.2% 0.095 166.913)", 900: "oklch(37.8% 0.077 168.94)", 950: "oklch(26.2% 0.051 172.552)" }, teal: { 50: "oklch(98.4% 0.014 180.72)", 100: "oklch(95.3% 0.051 180.801)", 200: "oklch(91% 0.096 180.426)", 300: "oklch(85.5% 0.138 181.071)", 400: "oklch(77.7% 0.152 181.912)", 500: "oklch(70.4% 0.14 182.503)", 600: "oklch(60% 0.118 184.704)", 700: "oklch(51.1% 0.096 186.391)", 800: "oklch(43.7% 0.078 188.216)", 900: "oklch(38.6% 0.063 188.416)", 950: "oklch(27.7% 0.046 192.524)" }, cyan: { 50: "oklch(98.4% 0.019 200.873)", 100: "oklch(95.6% 0.045 203.388)", 200: "oklch(91.7% 0.08 205.041)", 300: "oklch(86.5% 0.127 207.078)", 400: "oklch(78.9% 0.154 211.53)", 500: "oklch(71.5% 0.143 215.221)", 600: "oklch(60.9% 0.126 221.723)", 700: "oklch(52% 0.105 223.128)", 800: "oklch(45% 0.085 224.283)", 900: "oklch(39.8% 0.07 227.392)", 950: "oklch(30.2% 0.056 229.695)" }, sky: { 50: "oklch(97.7% 0.013 236.62)", 100: "oklch(95.1% 0.026 236.824)", 200: "oklch(90.1% 0.058 230.902)", 300: "oklch(82.8% 0.111 230.318)", 400: "oklch(74.6% 0.16 232.661)", 500: "oklch(68.5% 0.169 237.323)", 600: "oklch(58.8% 0.158 241.966)", 700: "oklch(50% 0.134 242.749)", 800: "oklch(44.3% 0.11 240.79)", 900: "oklch(39.1% 0.09 240.876)", 950: "oklch(29.3% 0.066 243.157)" }, blue: { 50: "oklch(97% 0.014 254.604)", 100: "oklch(93.2% 0.032 255.585)", 200: "oklch(88.2% 0.059 254.128)", 300: "oklch(80.9% 0.105 251.813)", 400: "oklch(70.7% 0.165 254.624)", 500: "oklch(62.3% 0.214 259.815)", 600: "oklch(54.6% 0.245 262.881)", 700: "oklch(48.8% 0.243 264.376)", 800: "oklch(42.4% 0.199 265.638)", 900: "oklch(37.9% 0.146 265.522)", 950: "oklch(28.2% 0.091 267.935)" }, indigo: { 50: "oklch(96.2% 0.018 272.314)", 100: "oklch(93% 0.034 272.788)", 200: "oklch(87% 0.065 274.039)", 300: "oklch(78.5% 0.115 274.713)", 400: "oklch(67.3% 0.182 276.935)", 500: "oklch(58.5% 0.233 277.117)", 600: "oklch(51.1% 0.262 276.966)", 700: "oklch(45.7% 0.24 277.023)", 800: "oklch(39.8% 0.195 277.366)", 900: "oklch(35.9% 0.144 278.697)", 950: "oklch(25.7% 0.09 281.288)" }, violet: { 50: "oklch(96.9% 0.016 293.756)", 100: "oklch(94.3% 0.029 294.588)", 200: "oklch(89.4% 0.057 293.283)", 300: "oklch(81.1% 0.111 293.571)", 400: "oklch(70.2% 0.183 293.541)", 500: "oklch(60.6% 0.25 292.717)", 600: "oklch(54.1% 0.281 293.009)", 700: "oklch(49.1% 0.27 292.581)", 800: "oklch(43.2% 0.232 292.759)", 900: "oklch(38% 0.189 293.745)", 950: "oklch(28.3% 0.141 291.089)" }, purple: { 50: "oklch(97.7% 0.014 308.299)", 100: "oklch(94.6% 0.033 307.174)", 200: "oklch(90.2% 0.063 306.703)", 300: "oklch(82.7% 0.119 306.383)", 400: "oklch(71.4% 0.203 305.504)", 500: "oklch(62.7% 0.265 303.9)", 600: "oklch(55.8% 0.288 302.321)", 700: "oklch(49.6% 0.265 301.924)", 800: "oklch(43.8% 0.218 303.724)", 900: "oklch(38.1% 0.176 304.987)", 950: "oklch(29.1% 0.149 302.717)" }, fuchsia: { 50: "oklch(97.7% 0.017 320.058)", 100: "oklch(95.2% 0.037 318.852)", 200: "oklch(90.3% 0.076 319.62)", 300: "oklch(83.3% 0.145 321.434)", 400: "oklch(74% 0.238 322.16)", 500: "oklch(66.7% 0.295 322.15)", 600: "oklch(59.1% 0.293 322.896)", 700: "oklch(51.8% 0.253 323.949)", 800: "oklch(45.2% 0.211 324.591)", 900: "oklch(40.1% 0.17 325.612)", 950: "oklch(29.3% 0.136 325.661)" }, pink: { 50: "oklch(97.1% 0.014 343.198)", 100: "oklch(94.8% 0.028 342.258)", 200: "oklch(89.9% 0.061 343.231)", 300: "oklch(82.3% 0.12 346.018)", 400: "oklch(71.8% 0.202 349.761)", 500: "oklch(65.6% 0.241 354.308)", 600: "oklch(59.2% 0.249 0.584)", 700: "oklch(52.5% 0.223 3.958)", 800: "oklch(45.9% 0.187 3.815)", 900: "oklch(40.8% 0.153 2.432)", 950: "oklch(28.4% 0.109 3.907)" }, rose: { 50: "oklch(96.9% 0.015 12.422)", 100: "oklch(94.1% 0.03 12.58)", 200: "oklch(89.2% 0.058 10.001)", 300: "oklch(81% 0.117 11.638)", 400: "oklch(71.2% 0.194 13.428)", 500: "oklch(64.5% 0.246 16.439)", 600: "oklch(58.6% 0.253 17.585)", 700: "oklch(51.4% 0.222 16.935)", 800: "oklch(45.5% 0.188 13.697)", 900: "oklch(41% 0.159 10.272)", 950: "oklch(27.1% 0.105 12.094)" } };
const ze = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, ma = (e) => {
  const t = it(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let o = { color: "indigo", variant: "DEFAULT" }, l = 1 / 0;
  const s = Object.entries(se).reduce((i, [u, n]) => {
    if (typeof n == "object") {
      const r = u;
      Object.entries(ze).forEach(([c, a]) => {
        n[a] && (i[n[a]] = { color: r, variant: c });
      });
    }
    return i;
  }, {});
  return Object.entries(s).forEach(([i, u]) => {
    const n = it(i);
    if (!n) return;
    const r = ka(t, n);
    r < l && (l = r, o = u);
  }), o;
}, fa = (e, t) => {
  const o = ze[t], l = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": se[e][o],
    "--theme-border": se[e][o],
    "--theme-hover": se[e][l],
    "--theme-active": se[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": se.gray[300],
    "--theme-light": se[e]["400"],
    "--theme-focus": se[e][o] + "80"
    // 添加 50% 透明度
  };
}, va = (e) => {
  const { color: t, variant: o = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? ma(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : se[t][ze[o]],
    tailwindName: t,
    style: fa(t, o)
  };
};
function it(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function ka(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const ya = {}, ba = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function xa(e, t) {
  return k(), x("svg", ba, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const wa = /* @__PURE__ */ fe(ya, [["render", xa]]), Pa = {}, Ca = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Sa(e, t) {
  return k(), x("svg", Ca, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ia = /* @__PURE__ */ fe(Pa, [["render", Sa]]), $a = {}, Na = { class: "px-3 py-1.5" };
function Fa(e, t) {
  return k(), x("span", Na, t[0] || (t[0] = [
    P("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      P("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Ba = /* @__PURE__ */ fe($a, [["render", Fa]]), Ra = {}, Aa = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function La(e, t) {
  return k(), x("svg", Aa, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ma = /* @__PURE__ */ fe(Ra, [["render", La]]), Ta = {}, Ea = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Da(e, t) {
  return k(), x("svg", Ea, t[0] || (t[0] = [
    P("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Ha = /* @__PURE__ */ fe(Ta, [["render", Da]]), Oa = /* @__PURE__ */ L({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, o) => (k(), x("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      q(Ha, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), ja = ["checked", "disabled", "aria-checked"], qa = {
  class: "h-4 w-4 text-white stroke-3",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, za = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Ua = /* @__PURE__ */ L({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, o = y(() => t.checked), l = y(() => t.partial), s = be("themeClasses");
    return (i, u) => (k(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !i.disabled && "cursor-pointer group",
        i.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: u[0] || (u[0] = qe((n) => !i.disabled && i.$emit("change"), ["stop", "prevent"]))
    }, [
      P("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: o.value,
        disabled: i.disabled,
        "aria-checked": o.value
      }, null, 8, ja),
      P("div", {
        class: S(["h-4 w-4 rounded-sm transition-all duration-200 border", [
          // Base states
          o.value && !l.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          l.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !o.value && !l.value && [
            "border-gray-300 bg-white",
            !i.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !i.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: ie(d(s).style)
      }, [
        Oe((k(), x("svg", qa, u[1] || (u[1] = [
          P("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [je, o.value && !l.value]
        ]),
        Oe((k(), x("svg", za, u[2] || (u[2] = [
          P("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [je, l.value]
        ])
      ], 6)
    ], 2));
  }
}), gt = /* @__PURE__ */ L({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const o = t;
    return (l, s) => (k(), V(Ua, {
      checked: l.checked,
      disabled: l.disabled,
      partial: !1,
      onChange: s[0] || (s[0] = (i) => o("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), Va = /* @__PURE__ */ L({
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
    const o = e, l = y(() => o.status === "allSelected"), s = y(() => o.status === "partSelected"), i = t;
    return (u, n) => (k(), V(gt, {
      checked: l.value,
      partial: s.value,
      disabled: e.disabled,
      onChange: n[0] || (n[0] = (r) => i("change", !l.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), Wa = {
  key: 1,
  class: "items-center gap-2"
}, Ka = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, Ja = /* @__PURE__ */ L({
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
    const o = t, l = dt(), s = (u) => [
      `header-${u.value}`,
      `header-${u.value.toLowerCase()}`,
      "header"
    ].find((r) => l[r]) || "header", i = (u) => {
      u.sortable && u.sortType && o("headerClick", u);
    };
    return (u, n) => (k(), x("th", {
      style: ie(e.fixedDistance),
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
      onClick: n[1] || (n[1] = qe((r) => i(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (k(), V(Va, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: n[0] || (n[0] = (r) => u.$emit("toggleSelectAll", r))
      }, null, 8, ["disabled", "status"])) : (k(), x("div", Wa, [
        I(u.$slots, s(e.header), O(ne({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          P("span", null, U(e.header.text), 1)
        ]),
        e.header.sortable ? (k(), V(d(Oa), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : E("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (k(), x("span", Ka, U(e.getMultiSortNumber(e.header.value)), 1)) : E("", !0)
      ]))
    ], 6));
  }
}), Za = /* @__PURE__ */ L({
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
    const o = t, l = (i) => {
      o("headerClick", i);
    }, s = (i) => {
      o("toggleSelectAll", i);
    };
    return (i, u) => e.headers.length && !e.hideHeader ? (k(), x("thead", {
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
        (k(!0), x(re, null, Q(e.headers, (n, r) => (k(), V(Ja, {
          key: r,
          header: n,
          index: r,
          "fixed-distance": e.getFixedDistance(n.value),
          "last-left-fixed-column": e.lastLeftFixedColumn,
          "first-right-fixed-column": e.firstRightFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: l,
          onToggleSelectAll: s
        }, me({ _: 2 }, [
          Q(i.$slots, (c, a) => ({
            name: a,
            fn: Z((h) => [
              I(i.$slots, a, G({ ref_for: !0 }, h))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : E("", !0);
  }
}), Ga = /* @__PURE__ */ L({
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
    const o = e, l = t, s = y(() => o.isDisabled ?? !1), i = y(() => typeof o.bodyItemClassName == "function" ? o.bodyItemClassName(o.column, o.index) : o.bodyItemClassName), u = y(
      () => o.column === "expand" || o.column === o.expandColumn
    ), n = () => {
      u.value && o.expandColumn === "" && l("toggle-expand", event);
    }, r = (a) => {
      l("toggle-expand", a);
    }, c = () => {
      l("toggle-select");
    };
    return (a, h) => (k(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": a.column === "expand" && a.expandColumn === "" },
        i.value
      ]]),
      style: ie(a.style),
      onClick: n
    }, [
      a.column === "checkbox" ? (k(), x(re, { key: 0 }, [
        a.column === "checkbox" ? I(a.$slots, "selection-checkbox", O(G({ key: 0 }, { item: a.item, index: a.index, isDisabled: s.value, toggleSelectItem: c })), () => [
          q(gt, {
            checked: !!a.item.checkbox,
            disabled: s.value,
            onChange: c
          }, null, 8, ["checked", "disabled"])
        ]) : E("", !0)
      ], 64)) : u.value ? I(a.$slots, "expand-button", O(G({ key: 1 }, { item: a.item, expanded: a.isExpanded, toggle: r })), () => [
        P("button", {
          onClick: qe(r, ["stop"]),
          class: "inline-flex items-center"
        }, [
          q(d(Ma), {
            class: S({ "transform rotate-90": a.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(a.$slots, `item-${a.column}`, O(G({ key: 2 }, a.item)), () => [
        I(a.$slots, `item-${a.column.toLowerCase()}`, O(ne(a.item)), () => [
          I(a.$slots, "item", O(ne({ column: a.column, item: a.item })), () => [
            Te(U(d(ga)(a.column, a.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), Qa = /* @__PURE__ */ L({
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
    const o = e, l = t, s = y(() => typeof o.bodyRowClassName == "function" ? o.bodyRowClassName(o.item, o.index) : o.bodyRowClassName), i = (r) => {
      l("click", r, o.item, o.index);
    }, u = (r) => {
      l("dblclick", r, o.item, o.index);
    }, n = (r) => {
      l("contextmenu", r, o.item);
    };
    return (r, c) => (k(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors border-t border-gray-200", [
        { "bg-white": r.alternating && r.index % 2 === 0 },
        { "bg-gray-50": !r.alternating || r.index % 2 === 1 },
        { "hover:bg-gray-100": !r.noHover },
        { "divide-x divide-gray-200": r.borderCell },
        s.value
      ]]),
      onClick: i,
      onDblclick: u,
      onContextmenu: n
    }, [
      I(r.$slots, "prepend"),
      (k(!0), x(re, null, Q(r.columns, (a, h) => {
        var p;
        return k(), V(Ga, {
          key: h,
          column: a,
          item: r.item,
          index: r.index,
          style: ie((p = r.getFixedDistance) == null ? void 0 : p.call(r, a, "td")),
          "is-disabled": r.isDisabled,
          "expand-column": r.expandColumn,
          "is-expanded": r.isExpanded,
          "body-item-class-name": r.bodyItemClassName,
          onToggleExpand: c[0] || (c[0] = (f) => r.$emit("toggle-expand", f, r.index, r.item)),
          onToggleSelect: c[1] || (c[1] = () => r.$emit("toggle-select", r.item))
        }, me({ _: 2 }, [
          Q(r.$slots, (f, m) => ({
            name: m,
            fn: Z((b) => [
              I(r.$slots, m, G({ ref_for: !0 }, b))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]);
      }), 128)),
      I(r.$slots, "append")
    ], 34));
  }
}), Xa = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, Ya = /* @__PURE__ */ L({
  __name: "LoadingLine",
  setup(e) {
    const t = be("themeClasses");
    return (o, l) => (k(), x("div", Xa, [
      P("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ie({ backgroundColor: d(t).hex })
      }, null, 4)
    ]));
  }
}), _a = /* @__PURE__ */ fe(Ya, [["__scopeId", "data-v-cbdc3562"]]), el = ["colspan"], tl = { class: "overflow-hidden" }, al = /* @__PURE__ */ L({
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
    const t = e, o = y(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
    return (l, s) => (k(), x("tr", {
      class: S(["vdt-expand-row border-0", [o.value, { "bg-gray-50": (l.index + 1) % 2 === 0, "border-t": l.isExpanded }]])
    }, [
      P("td", {
        colspan: l.columnsCount,
        class: "relative p-0"
      }, [
        l.loading ? (k(), V(_a, {
          key: 0,
          class: "mb-4"
        })) : E("", !0),
        P("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": l.isExpanded }]])
        }, [
          P("div", tl, [
            I(l.$slots, "default")
          ])
        ], 2)
      ], 8, el)
    ], 2));
  }
}), ll = { class: "flex items-center gap-2 text-sm text-gray-700" }, ol = { class: "relative inline-block min-w-[70px]" }, sl = ["aria-expanded"], nl = { class: "block truncate" }, rl = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, il = ["aria-selected", "onClick"], ul = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, cl = /* @__PURE__ */ L({
  __name: "RowsPerPageSelector",
  props: {
    modelValue: {
      type: Number,
      required: !0
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
    const o = e, l = t, s = _(!1), i = _(!1), u = y({
      get: () => o.modelValue,
      set: (p) => l("update:modelValue", p)
    }), n = be("dataTable");
    he(s, (p) => {
      if (p && (n != null && n.value)) {
        const f = window.innerHeight, m = n.value.getBoundingClientRect(), b = f - (m.height + m.top);
        i.value = b <= 100;
      }
    });
    const r = (p) => {
      u.value = p, s.value = !1;
    }, c = () => {
      s.value = !s.value;
    }, a = (p) => {
      p.target.closest(".relative") || (s.value = !1);
    }, h = (p) => {
      const f = p.relatedTarget;
      f != null && f.closest(".relative") || (s.value = !1);
    };
    return ct(() => {
      document.addEventListener("click", a);
    }), Ht(() => {
      document.removeEventListener("click", a);
    }), (p, f) => (k(), x("div", ll, [
      Te(U(e.message) + " ", 1),
      P("div", ol, [
        P("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-gray-300", [
            "focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500",
            s.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: c,
          "aria-haspopup": "listbox",
          "aria-expanded": s.value
        }, [
          P("span", nl, U(u.value), 1),
          P("span", rl, [
            (k(), x("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": s.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, f[0] || (f[0] = [
              P("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, sl),
        q(Ot, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: Z(() => [
            s.value ? (k(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": i.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: h
            }, [
              (k(!0), x(re, null, Q(e.rowsItems, (m) => (k(), x("li", {
                key: m,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  m === u.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": m === u.value,
                onClick: (b) => r(m)
              }, [
                P("span", {
                  class: S(["block", { "font-medium": m === u.value }])
                }, U(m), 3),
                m === u.value ? (k(), x("span", ul, f[1] || (f[1] = [
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
                ]))) : E("", !0)
              ], 10, il))), 128))
            ], 34)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), dl = { class: "text-sm text-gray-700" }, gl = /* @__PURE__ */ L({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, o) => (k(), x("div", dl, [
      I(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        Te(U(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + U(t.rowsOfPageSeparatorMessage) + " " + U(t.totalItemsLength), 1)
      ])
    ]));
  }
}), hl = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, pl = ["disabled"], ml = ["disabled"], ut = /* @__PURE__ */ L({
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
    const o = t;
    return (l, s) => (k(), x("div", hl, [
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
        onClick: s[0] || (s[0] = (i) => o("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        q(d(Ia), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, pl),
      I(l.$slots, "buttonsPagination"),
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
        onClick: s[1] || (s[1] = (i) => o("clickNextPage")),
        "aria-label": "Next page"
      }, [
        q(d(wa), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, ml)
    ]));
  }
}), fl = {
  class: "vdt-pagination inline-flex rounded-md shadow-xs",
  role: "navigation",
  "aria-label": "Pagination"
}, vl = ["onClick"], pe = 7, kl = /* @__PURE__ */ L({
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
    const o = e, l = t, s = be("themeClasses"), i = (n) => {
      n.type === "button" && !n.active && l("updatePage", n.page);
    }, u = y(() => {
      const n = [], { maxPaginationNumber: r, currentPaginationNumber: c } = o;
      if (r <= pe) {
        for (let a = 1; a <= r; a += 1)
          n.push({
            type: "button",
            page: a,
            active: a === c,
            activePrev: a + 1 === c
          });
        return n;
      }
      if ([1, 2, r, r - 1].includes(c))
        for (let a = 1; a <= pe; a += 1)
          if (a <= 3)
            n.push({
              type: "button",
              page: a,
              active: a === c,
              activePrev: a + 1 === c
            });
          else if (a === 4)
            n.push({ type: "omission" });
          else {
            const h = r - (pe - a);
            n.push({
              type: "button",
              page: h,
              active: h === c,
              activePrev: h + 1 === c
            });
          }
      else if ([3, 4].includes(c))
        for (let a = 1; a <= pe; a += 1)
          a <= 5 ? n.push({
            type: "button",
            page: a,
            active: a === c,
            activePrev: a + 1 === c
          }) : a === 6 ? n.push({ type: "omission" }) : n.push({
            type: "button",
            page: r,
            active: r === c,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(c))
        for (let a = 1; a <= pe; a += 1)
          if (a === 1)
            n.push({
              type: "button",
              page: 1,
              active: c === 1,
              activePrev: !1
            });
          else if (a === 2)
            n.push({ type: "omission" });
          else {
            const h = r - (pe - a);
            n.push({
              type: "button",
              page: h,
              active: h === c,
              activePrev: h + 1 === c
            });
          }
      else
        for (let a = 1; a <= pe; a += 1)
          if (a === 1)
            n.push({
              type: "button",
              page: 1,
              active: c === 1,
              activePrev: !1
            });
          else if (a === 2 || a === 6)
            n.push({ type: "omission" });
          else if (a === 7)
            n.push({
              type: "button",
              page: r,
              active: r === c,
              activePrev: !1
            });
          else {
            const h = 4 - a, p = c - h;
            n.push({
              type: "button",
              page: p,
              active: p === c,
              activePrev: p + 1 === c
            });
          }
      return n;
    });
    return (n, r) => (k(), x("div", fl, [
      (k(!0), x(re, null, Q(u.value, (c, a) => (k(), x("div", {
        key: a,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          a === 0 && "rounded-l-md",
          // Last item styles
          a === u.value.length - 1 && "rounded-r-md",
          // Button specific styles
          c.type === "button" && [
            "border border-gray-300",
            // Active state
            c.active ? [
              "z-10",
              d(s).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-hidden focus:ring-1",
              `focus:ring-${d(s).tailwindName}-500`,
              `focus:border-${d(s).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !c.active && "cursor-pointer",
            // Connect borders for middle buttons
            a !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          c.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            a !== 0 && "-ml-px"
          ]
        ]]),
        style: ie(d(s).style),
        onClick: (h) => i(c)
      }, [
        c.type === "button" ? (k(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": c.active }])
        }, U(c.page), 3)) : (k(), V(d(Ba), { key: 1 }))
      ], 14, vl))), 128))
    ]));
  }
}), yl = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, bl = /* @__PURE__ */ L({
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
    const o = e, l = t, s = y(() => ({
      isFirstPage: o.isFirstPage,
      isLastPage: o.isLastPage,
      currentPaginationNumber: o.currentPaginationNumber,
      maxPaginationNumber: o.maxPaginationNumber,
      nextPage: () => l("nextPage"),
      prevPage: () => l("prevPage"),
      updatePage: (i) => l("updatePage", i)
    }));
    return (i, u) => i.hideFooter ? E("", !0) : (k(), x("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-xs": i.showShadow }, i.footerClassName]])
    }, [
      q(ut, {
        "is-first-page": i.isFirstPage,
        "is-last-page": i.isLastPage,
        onClickNextPage: u[0] || (u[0] = () => l("nextPage")),
        onClickPrevPage: u[1] || (u[1] = () => l("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: Z(() => u[6] || (u[6] = [
          P("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      P("div", yl, [
        i.hideRowsPerPage ? E("", !0) : (k(), V(cl, {
          key: 0,
          "model-value": i.rowsPerPage,
          "rows-items": i.rowsItems,
          message: i.rowsPerPageMessage,
          "onUpdate:modelValue": u[2] || (u[2] = (n) => l("update:rowsPerPage", n))
        }, null, 8, ["model-value", "rows-items", "message"])),
        i.hidePaginationInfo ? E("", !0) : (k(), V(gl, {
          key: 1,
          "current-page-first-index": i.currentPageFirstIndex,
          "current-page-last-index": i.currentPageLastIndex,
          "total-items-length": i.totalItemsLength,
          "rows-of-page-separator-message": i.rowsOfPageSeparatorMessage
        }, me({ _: 2 }, [
          i.$slots["pagination-info"] ? {
            name: "default",
            fn: Z((n) => [
              I(i.$slots, "pagination-info", O(ne(n)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        i.$slots.pagination ? I(i.$slots, "pagination", O(G({ key: 2 }, s.value))) : (k(), V(ut, {
          key: 3,
          "is-first-page": i.isFirstPage,
          "is-last-page": i.isLastPage,
          onClickNextPage: u[4] || (u[4] = () => l("nextPage")),
          onClickPrevPage: u[5] || (u[5] = () => l("prevPage"))
        }, me({ _: 2 }, [
          i.buttonsPagination ? {
            name: "buttonsPagination",
            fn: Z(() => [
              q(kl, {
                "current-pagination-number": i.currentPaginationNumber,
                "max-pagination-number": i.maxPaginationNumber,
                onUpdatePage: u[3] || (u[3] = (n) => l("updatePage", n))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), xl = ["id"], wl = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Pl = { class: "relative z-10" }, Cl = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, ht = /* @__PURE__ */ L({
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
    theme: { default: () => ({ color: "indigo", variant: "DEFAULT" }) },
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
  setup(e, { expose: t, emit: o }) {
    const l = e, {
      checkboxColumnWidth: s,
      expandColumnWidth: i,
      indexColumnWidth: u,
      rowsItems: n,
      showIndexSymbol: r,
      currentPage: c,
      filterOptions: a,
      headers: h,
      itemsSelected: p,
      loading: f,
      items: m,
      rowsPerPage: b,
      searchField: $,
      searchValue: N,
      serverItemsLength: D,
      showIndex: M,
      sortBy: ee,
      sortType: j,
      serverOptions: te,
      multiSort: ue,
      mustSort: xe,
      clickEventType: we,
      clickRowToExpand: Pe,
      clickRowToSelect: W,
      fixedExpand: B,
      fixedCheckbox: H,
      fixedIndex: T,
      batchSelectionThreshold: K,
      expandColumn: z
    } = jt(l), v = y(() => va(l.theme));
    st("themeClasses", v);
    const C = dt(), w = y(() => !!C.expand), A = y(() => !!C.body), ce = y(
      () => typeof l.expandTransition < "u" ? l.expandTransition : w.value
    ), ae = _(null), Ce = _(null);
    st("dataTable", ae);
    const X = o, Se = y(() => p.value !== null), le = y(() => te.value !== null), {
      serverOptionsComputed: ve,
      updateServerOptionsPage: pt,
      updateServerOptionsSort: mt,
      updateServerOptionsRowsPerPage: ft
    } = ra(
      te,
      ue,
      X
    ), {
      clientSortOptions: Ue,
      headerColumns: Ve,
      headersForRender: ke,
      updateSortField: vt,
      isMultiSorting: kt,
      getMultiSortNumber: yt
    } = _t(
      r,
      s,
      i,
      H,
      B,
      T,
      h,
      w,
      u,
      Se,
      le,
      xe,
      ve,
      M,
      ee,
      j,
      ue,
      z,
      mt,
      X
    ), {
      rowsItemsComputed: We,
      rowsPerPageRef: ye,
      updateRowsPerPage: Ke
    } = na(
      le,
      n,
      te,
      b
    ), {
      totalItems: Je,
      selectItemsComputed: bt,
      totalItemsLength: $e,
      toggleSelectAll: xt,
      toggleSelectItem: Ze,
      isProcessing: wt,
      processProgress: Pt
    } = pa(
      Ue,
      a,
      le,
      m,
      p,
      $,
      N,
      D,
      ue,
      K,
      l.disabledRows,
      X
    ), {
      currentPaginationNumber: de,
      maxPaginationNumber: Ne,
      isLastPage: Fe,
      isFirstPage: Be,
      nextPage: Re,
      prevPage: Ae,
      updatePage: Ie,
      updateCurrentPaginationNumber: Ct
    } = sa(
      c,
      le,
      f,
      $e,
      ye,
      te,
      pt
    ), {
      currentPageFirstIndex: Ge,
      currentPageLastIndex: Qe,
      multipleSelectStatus: St,
      pageItems: ge
    } = oa(
      de,
      Se,
      le,
      m,
      ye,
      bt,
      M,
      Je,
      $e,
      l.disabledRows
    ), Le = y(() => de.value === 0 ? 0 : (de.value - 1) * ye.value), {
      expandingItemIndexList: Ee,
      updateExpandingItemIndexList: Xe,
      clearExpandingItemIndexList: Ye
    } = Xt(
      ge,
      Le,
      X
    ), {
      fixedHeaders: _e,
      lastLeftFixedColumn: et,
      firstRightFixedColumn: tt,
      fixedColumnsInfos: It,
      showShadow: at
    } = Yt(
      ke,
      Ce
    ), $t = (g) => {
      const oe = g.width ?? (_e.value.length ? 100 : null);
      if (oe) return `width: ${oe}px; min-width: ${oe}px;`;
    }, lt = (g, oe = "th") => {
      if (!_e.value.length) return;
      const F = It.value.find((R) => R.value === g);
      if (F) {
        const R = F.position === "left";
        return `
            ${R ? `left: ${F.distance}px;` : `right: ${F.distance}px;`}
            z-index: ${oe === "th" ? 3 : 1};
            position: sticky;
            background-color: ${oe === "th" ? "none" : "inherit"};
            ${R && F.value === et.value || !R && F.value === tt.value ? `
                    box-shadow: ${R ? "4px 0 6px -2px" : "-4px 0 6px -2px"} rgba(0, 0, 0, 0.1);
                    clip-path: inset(0px ${R ? "-10px 0px 0px" : "0px 0px -10px"});
                ` : ""}
            isolation: isolate;
        `;
      }
    }, Nt = (g) => {
      g.sortable && g.sortType && vt(g.value, g.sortType);
    }, De = (g) => typeof l.disabledRows == "function" ? l.disabledRows(g) : !1, Ft = y(() => ge.value.every((g) => l.disabledRows(g))), Bt = (g) => {
      De(g) || Ze(g);
    }, {
      handleRowClick: Rt,
      handleRowDoubleClick: At,
      handleRowContextMenu: Lt
    } = Qt(
      we,
      Se,
      M,
      De,
      Pe,
      W,
      Xe,
      Ze,
      X
    );
    return he(f, (g, oe) => {
      ve.value && g === !1 && oe === !0 && (Ct(ve.value.page), Ye());
    }), he(ye, (g) => {
      le.value ? ft(g) : Ie(1);
    }), he([N, a], () => {
      le.value || Ie(1);
    }), he([de, Ue, $, N, a], () => {
      Ye();
    }, { deep: !0 }), he(ge, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), he(Je, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Ge,
      currentPageLastIndex: Qe,
      clientItemsLength: $e,
      maxPaginationNumber: Ne,
      currentPaginationNumber: de,
      isLastPage: Fe,
      isFirstPage: Be,
      nextPage: Re,
      prevPage: Ae,
      updatePage: Ie,
      rowsPerPageOptions: We,
      rowsPerPageActiveOption: ye,
      updateRowsPerPageActiveOption: Ke
    }), (g, oe) => (k(), x("div", {
      ref_key: "tableWrapper",
      ref: ae,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      P("div", {
        ref_key: "tableContainer",
        ref: Ce,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-xs": d(at) }, g.containerClassName]])
      }, [
        P("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [g.tableClassName]])
        }, [
          P("colgroup", null, [
            (k(!0), x(re, null, Q(d(ke), (F, R) => (k(), x("col", {
              key: R,
              style: ie($t(F))
            }, null, 4))), 128))
          ]),
          d(C)["customize-headers"] ? I(g.$slots, "customize-headers", { key: 0 }) : E("", !0),
          q(Za, G({
            headers: d(ke),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: d(et),
            firstRightFixedColumn: d(tt),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Ft.value,
            multipleSelectStatus: d(St),
            multiSort: d(ue)
          }, {
            "is-multi-sorting": d(kt),
            "get-multi-sort-number": d(yt),
            "get-fixed-distance": lt,
            onHeaderClick: Nt,
            onToggleSelectAll: d(xt)
          }), me({ _: 2 }, [
            Q(g.$slots, (F, R) => ({
              name: R,
              fn: Z((J) => [
                I(g.$slots, R, O(ne(J)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          A.value ? I(g.$slots, "body", O(G({ key: 1 }, d(ge)))) : d(Ve).length ? (k(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            I(g.$slots, "body-prepend", O(ne({
              items: d(ge),
              pagination: { isFirstPage: d(Be), isLastPage: d(Fe), currentPaginationNumber: d(de), maxPaginationNumber: d(Ne), nextPage: d(Re), prevPage: d(Ae) },
              headers: d(ke)
            }))),
            (k(!0), x(re, null, Q(d(ge), (F, R) => (k(), x(re, {
              key: F.key || R
            }, [
              q(Qa, {
                item: F,
                index: R,
                columns: d(Ve),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": d(Ee).includes(R + Le.value),
                "is-disabled": De(F),
                "expand-column": d(z),
                "get-fixed-distance": lt,
                onClick: (J) => d(Rt)(J, F, R),
                onDblclick: (J) => d(At)(J, F, R),
                onContextmenu: (J) => d(Lt)(J, F),
                onToggleExpand: (J) => d(Xe)(R, F, J),
                onToggleSelect: (J) => Bt(F)
              }, me({ _: 2 }, [
                Q(g.$slots, (J, ot) => ({
                  name: ot,
                  fn: Z((Mt) => [
                    I(g.$slots, ot, G({ ref_for: !0 }, Mt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ce.value || d(Ee).includes(R + Le.value) ? (k(), V(al, {
                key: 0,
                item: F,
                index: R,
                "columns-count": d(ke).length,
                loading: F.expandLoading,
                "is-expanded": d(Ee).includes(R + Le.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: Z(() => [
                  I(g.$slots, "expand", G({ ref_for: !0 }, F))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : E("", !0)
            ], 64))), 128)),
            I(g.$slots, "body-append", O(ne({
              items: d(ge),
              pagination: { isFirstPage: d(Be), isLastPage: d(Fe), currentPaginationNumber: d(de), maxPaginationNumber: d(Ne), nextPage: d(Re), prevPage: d(Ae), updatePage: d(Ie) },
              headers: d(ke)
            })))
          ], 2)) : E("", !0)
        ], 10, xl),
        d(f) ? (k(), x("div", wl, [
          P("div", Pl, [
            I(g.$slots, "loading", {}, () => [
              q(Ut)
            ])
          ])
        ])) : E("", !0),
        !d(ge).length && !d(f) ? (k(), x("div", Cl, [
          I(g.$slots, "empty-message", {}, () => [
            Te(U(g.emptyMessage), 1)
          ])
        ])) : E("", !0)
      ], 2),
      q(bl, G({
        hideFooter: g.hideFooter,
        hideRowsPerPage: g.hideRowsPerPage,
        hidePaginationInfo: g.hidePaginationInfo,
        buttonsPagination: g.buttonsPagination,
        showShadow: d(at),
        footerClassName: g.footerClassName,
        rowsPerPage: d(ye),
        rowsItems: d(We),
        rowsPerPageMessage: g.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: g.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: d(Ge),
        currentPageLastIndex: d(Qe),
        totalItemsLength: d($e),
        currentPaginationNumber: d(de),
        maxPaginationNumber: d(Ne),
        isFirstPage: d(Be),
        isLastPage: d(Fe)
      }, {
        "onUpdate:rowsPerPage": d(Ke),
        onNextPage: d(Re),
        onPrevPage: d(Ae),
        onUpdatePage: d(Ie)
      }), me({ _: 2 }, [
        g.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: Z((F) => [
            I(g.$slots, "pagination-info", O(ne(F)))
          ]),
          key: "0"
        } : void 0,
        g.$slots.pagination ? {
          name: "pagination",
          fn: Z((F) => [
            I(g.$slots, "pagination", O(ne(F)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      Oe(q(Gt, { progress: d(Pt) }, null, 8, ["progress"]), [
        [je, d(wt)]
      ])
    ], 2));
  }
}), Sl = (e) => {
  e.component("DataTable", ht);
};
ht.install = Sl;
export {
  Nl as createFilter,
  ht as default,
  Sl as install
};
