var qt = Object.defineProperty;
var Wt = (e, t, a) => t in e ? qt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var He = (e, t, a) => Wt(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as R, inject as ye, openBlock as m, createElementBlock as x, Fragment as oe, renderList as Y, createElementVNode as C, normalizeClass as S, normalizeStyle as ie, unref as c, toDisplayString as z, ref as _, computed as y, onMounted as ht, onUnmounted as zt, watch as fe, createVNode as W, withModifiers as Ve, withDirectives as ze, vShow as Ue, createBlock as U, useSlots as bt, renderSlot as I, normalizeProps as q, guardReactiveProps as le, createCommentVNode as D, createSlots as pe, withCtx as G, mergeProps as J, createTextVNode as Ee, onBeforeUnmount as Ut, Transition as Vt, toRefs as Kt, provide as it } from "vue";
const Gt = { class: "inline-flex relative w-[60px] h-[60px]" }, Jt = /* @__PURE__ */ R({
  __name: "Loading",
  setup(e) {
    const t = ye("themeClasses");
    return (a, s) => (m(), x("div", Gt, [
      (m(), x(oe, null, Y(4, (o) => C("div", {
        key: o,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(o - 1) * 150}`]]),
        style: ie({
          borderTopColor: c(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), me = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, o] of t)
    a[s] = o;
  return a;
}, Yt = /* @__PURE__ */ me(Jt, [["__scopeId", "data-v-e9a27991"]]), Zt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Qt = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Xt = { class: "w-64" }, _t = { class: "h-2 bg-gray-200 rounded" }, ea = { class: "text-center text-sm text-gray-600" }, ta = /* @__PURE__ */ R({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = ye("themeClasses");
    return (a, s) => (m(), x("div", Zt, [
      C("div", Qt, [
        s[0] || (s[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", Xt, [
          C("div", _t, [
            C("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ie({ width: `${a.progress}%`, backgroundColor: c(t).hex })
            }, null, 4)
          ])
        ]),
        C("div", ea, z(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function aa(e, t, a, s, o, i, d, l, r) {
  const u = (b, h) => {
    const w = { ...b };
    return t.value && (delete w.checkbox, w.isSelected = b.checkbox), a.value && (delete w.index, w.indexInCurrentPage = h + 1), w;
  };
  return {
    handleRowClick: (b, h, w) => {
      if (!b.target.closest(".checkbox, .expand-button") && (o.value && d(w, h, b), i.value && !s(h) && l(h), e.value === "single")) {
        const B = u(h, w);
        r("clickRow", B, b);
      }
    },
    handleRowDoubleClick: (b, h, w) => {
      if (e.value === "double") {
        const B = u(h, w);
        r("clickRow", B, b);
      }
    },
    handleRowContextMenu: (b, h) => {
      const w = u(h, -1);
      r("contextmenuRow", w, b);
    }
  };
}
function na(e, t, a) {
  const s = _([]);
  return {
    expandingItemIndexList: s,
    // 展開項的索引列表
    updateExpandingItemIndexList: (d, l, r) => {
      r.stopPropagation();
      const u = s.value.indexOf(d);
      if (u !== -1)
        s.value.splice(u, 1);
      else {
        const n = e.value.findIndex((g) => JSON.stringify(g) === JSON.stringify(l));
        a("expandRow", t.value + n, l), s.value.push(t.value + n);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      s.value = [];
    }
    // 清空展開列表的方法
  };
}
function sa(e, t) {
  const a = y(() => e.value.filter((l) => l.fixed)), s = y(() => a.value.length ? a.value[a.value.length - 1].value : ""), o = y(() => {
    if (!a.value.length) return [];
    const l = a.value.map((r) => r.width ?? 100);
    return a.value.map((r, u) => ({
      value: r.value,
      // 列標籤
      fixed: r.fixed ?? !0,
      // 是否固定
      width: r.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: u === 0 ? 0 : l.reduce((n, g, v) => v < u ? n + g : n, 0)
    }));
  }), i = _(!1);
  let d = null;
  return ht(() => {
    const l = t.value;
    if (l) {
      const r = () => {
        i.value = l.scrollLeft > 0;
      };
      r(), l.addEventListener("scroll", r), d = () => {
        l.removeEventListener("scroll", r);
      };
    }
  }), zt(() => {
    d && (d(), d = null);
  }), {
    fixedHeaders: a,
    lastFixedColumn: s,
    fixedColumnsInfos: o,
    showShadow: i
  };
}
function ra(e, t, a, s, o, i, d, l, r, u, n, g, v, b, h, w, B, $, O, M) {
  const Z = y(() => d.value.length ? {
    hasFixedColumns: d.value.some((N) => N.fixed),
    fixedHeaders: d.value.filter((N) => N.fixed),
    unFixedHeaders: d.value.filter((N) => !N.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), H = _(
    la(h.value, w.value, B.value)
  ), { determineHeaderSortState: ue } = ua(n, v, B, H), ee = y(() => {
    const { fixedHeaders: N, unFixedHeaders: j } = Z.value, L = [...N, ...j].map((E) => ({
      ...E,
      sortType: E.sortable ? ue(E.value) : void 0
    }));
    return [
      ...Object.values(xe.value).filter(Boolean),
      ...L
    ];
  }), xe = y(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: s.value || Z.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: b.value && {
      text: e.value,
      value: "index",
      fixed: i.value || Z.value.hasFixedColumns,
      width: r.value
    },
    expand: l.value && !$.value && {
      text: "",
      value: "expand",
      fixed: o.value || Z.value.hasFixedColumns,
      width: a.value
    }
  })), we = y(
    () => ee.value.map((N) => N.value)
  ), Pe = (N, j) => {
    const L = j === "none" ? "asc" : j === "asc" ? "desc" : g.value ? "asc" : null;
    if (n.value) {
      O(N, L);
      return;
    }
    const E = B.value ? oa(N, L, H.value) : ia(N, L);
    H.value = E, M("updateSort", { sortType: L, sortBy: N });
  }, V = y(() => (N) => {
    var L, E;
    const j = n.value ? (L = v.value) == null ? void 0 : L.sortBy : (E = H.value) == null ? void 0 : E.sortBy;
    return Array.isArray(j) && j.includes(N);
  }), Ce = y(() => (N) => {
    var L, E;
    const j = n.value ? (L = v.value) == null ? void 0 : L.sortBy : (E = H.value) == null ? void 0 : E.sortBy;
    return Array.isArray(j) ? j.indexOf(N) + 1 : !1;
  });
  return {
    clientSortOptions: H,
    headerColumns: we,
    headersForRender: ee,
    updateSortField: Pe,
    isMultiSorting: V,
    getMultiSortNumber: Ce
  };
}
function la(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((s) => s === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const oa = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const s = a.sortBy.indexOf(e), o = [...a.sortBy], i = [...a.sortDesc];
  return s === -1 && t !== null ? (o.push(e), i.push(t === "desc")) : t === null ? (o.splice(s, 1), i.splice(s, 1)) : i[s] = t === "desc", { sortBy: o, sortDesc: i };
}, ia = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function ua(e, t, a, s) {
  const o = (l) => !e.value || !t.value ? i(l) : d(l), i = (l) => {
    if (!s.value) return "none";
    const { sortBy: r, sortDesc: u } = s.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const n = r.indexOf(l);
      return n !== -1 ? u[n] ? "desc" : "asc" : "none";
    }
    return l === r ? u ? "desc" : "asc" : "none";
  }, d = (l) => {
    const { sortBy: r, sortType: u } = t.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const n = r.indexOf(l);
      return n !== -1 ? u[n] : "none";
    }
    return l === r && u ? u : "none";
  };
  return {
    determineHeaderSortState: o
  };
}
class da {
  constructor() {
    He(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    He(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: s, index: o, ...i } = t;
      a = Object.entries(i).sort(([d], [l]) => d.localeCompare(l)).map(([d, l]) => `${d}:${l}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ca(e, t, a, s, o, i, d, l, r, u) {
  const n = new da(), g = y(
    () => (e.value - 1) * o.value + 1
  ), v = y(() => a.value ? Math.min(
    r.value,
    e.value * o.value
  ) : Math.min(
    l.value.length,
    e.value * o.value
  )), b = y(() => a.value ? s.value : l.value.slice(
    g.value - 1,
    v.value
  )), h = y(() => d.value ? b.value.map(($, O) => ({
    index: g.value + O,
    ...$
  })) : b.value), w = y(() => {
    if (i.value.length === 0)
      return "noneSelected";
    const $ = u ? l.value.filter((M) => !u(M)) : l.value;
    return i.value.length === $.length && i.value.every(
      (Z) => $.some(
        (H) => n.getItemKey(Z) === n.getItemKey(H)
      )
    ) ? "allSelected" : "partSelected";
  }), B = y(() => {
    if (!t.value)
      return h.value;
    switch (w.value) {
      case "allSelected":
        return h.value.map(($) => ({
          checkbox: !u || !u($),
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
          checkbox: i.value.some(
            (M) => n.getItemKey($) === n.getItemKey(M)
          ) && (!u || !u($)),
          ...$
        }));
    }
  });
  return {
    currentPageFirstIndex: g,
    currentPageLastIndex: v,
    multipleSelectStatus: w,
    pageItems: B
  };
}
function fa(e, t, a, s, o, i, d) {
  const l = _(i.value ? i.value.page : e.value), r = y(() => Math.ceil(s.value / o.value)), u = y(() => r.value === 0 || l.value === r.value), n = y(() => l.value === 1);
  return {
    currentPaginationNumber: l,
    maxPaginationNumber: r,
    isLastPage: u,
    isFirstPage: n,
    nextPage: () => {
      if (s.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const w = l.value + 1;
          d(w);
        } else
          l.value += 1;
    },
    prevPage: () => {
      if (s.value !== 0 && !n.value && !a.value)
        if (t.value) {
          const w = l.value - 1;
          d(w);
        } else
          l.value -= 1;
    },
    updatePage: (w) => {
      a.value || (t.value ? d(w) : l.value = w);
    },
    updateCurrentPaginationNumber: (w) => {
      l.value = w;
    }
  };
}
function ga(e, t, a, s) {
  var l;
  const o = y(() => !e.value && t.value.findIndex((r) => r === s.value) === -1 ? [s.value, ...t.value] : t.value), i = _(((l = a.value) == null ? void 0 : l.rowsPerPage) ?? s.value);
  return {
    rowsItemsComputed: o,
    // 計算後的每頁行數選項
    rowsPerPageRef: i,
    // 每頁行數
    updateRowsPerPage: (r) => {
      i.value = r;
    }
    // 更新每頁行數
  };
}
function pa(e, t, a) {
  const s = y({
    get: () => {
      if (e.value) {
        const { page: l, rowsPerPage: r, sortBy: u, sortType: n } = e.value;
        return { page: l, rowsPerPage: r, sortBy: u ?? null, sortType: n ?? null };
      }
      return null;
    },
    set: (l) => {
      a("update:serverOptions", l);
    }
  });
  return {
    serverOptionsComputed: s,
    updateServerOptionsPage: (l) => {
      s.value && (s.value = {
        ...s.value,
        page: l
      });
    },
    updateServerOptionsSort: (l, r) => {
      if (s.value)
        if (t.value && Array.isArray(s.value.sortBy) && Array.isArray(s.value.sortType)) {
          const u = s.value.sortBy.findIndex((n) => n === l);
          u === -1 && r !== null && (s.value.sortBy.push(l), s.value.sortType.push(r)), r === null ? (s.value.sortBy.splice(u, 1), s.value.sortType.splice(u, 1)) : s.value.sortType[u] = r;
        } else
          s.value = {
            ...s.value,
            sortBy: r !== null ? l : null,
            sortType: r
          };
    },
    updateServerOptionsRowsPerPage: (l) => {
      s.value && (s.value = {
        ...s.value,
        page: 1,
        rowsPerPage: l
      });
    }
  };
}
function ma(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function va(e) {
  return e.comparison === "in";
}
function ha(e) {
  return typeof e.comparison == "function";
}
function ba(e) {
  return typeof e == "number" && !isNaN(e);
}
const qn = {
  number(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  string(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  }
};
function X(e, t) {
  if (e.includes(".")) {
    const a = e.split(".");
    let s = t;
    for (const o of a)
      if (s && typeof s == "object")
        s = s[o];
      else
        return "";
    return s ?? "";
  }
  return t[e] ?? "";
}
function ya(e, t) {
  const a = X(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const ut = 1e3, dt = /* @__PURE__ */ new WeakMap(), Te = (e) => {
  let t = dt.get(e);
  if (!t) {
    const { checkbox: a, index: s, ...o } = e;
    t = JSON.stringify(o), dt.set(e, t);
  }
  return t;
};
function xa(e, t, a, s) {
  const o = _({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  fe(t, (n) => {
    if (n === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const g = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
    for (const b of n) {
      const h = Te(b);
      g.add(h), v.set(h, b);
    }
    o.value.selectedItems = g, o.value.itemsMap = v;
  }, { immediate: !0, deep: !0 });
  const i = async (n, g, v) => new Promise((b) => {
    requestAnimationFrame(() => {
      const h = new Set(o.value.selectedItems), w = new Map(o.value.itemsMap);
      for (let B = 0; B < n.length; B++) {
        const $ = n[B], O = Te($);
        g ? (h.add(O), w.set(O, $)) : h.delete(O), o.value.processedCount = v + B + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = h, o.value.itemsMap = w, b();
    });
  }), d = async (n) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = e.value.length, o.value.visualProgress = 0, !n) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), s("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const g = e.value;
        for (let v = 0; v < g.length; v += ut) {
          const h = g.slice(v, Math.min(v + ut, g.length)).filter((w) => !a(w));
          await i(h, n, v), await new Promise((w) => setTimeout(w, 0));
        }
        s("update:itemsSelected", r.value), n && s("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, l = (n) => {
    const g = Te(n), v = { ...n };
    delete v.checkbox, delete v.index;
    const b = new Set(o.value.selectedItems), h = new Map(o.value.itemsMap);
    b.has(g) ? (b.delete(g), s("deselectRow", v)) : (b.add(g), h.set(g, v), s("selectRow", v)), o.value.selectedItems = b, o.value.itemsMap = h, s("update:itemsSelected", Array.from(h.values()).filter((B) => b.has(Te(B))));
  }, r = y(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([n]) => o.value.selectedItems.has(n)).map(([, n]) => n)), u = y(() => o.value.visualProgress);
  return {
    selectedItems: r,
    toggleSelectAll: d,
    toggleSelectItem: l,
    isProcessing: y(() => o.value.selectionInProgress),
    selectionProgress: u
  };
}
function wa(e, t, a, s, o, i, d, l, r, u, n, g) {
  const v = /* @__PURE__ */ new WeakMap(), b = (p) => {
    let k = v.get(p);
    return k || (typeof i.value == "string" && i.value !== "" ? k = String(X(i.value, p)) : Array.isArray(i.value) ? k = i.value.map((P) => String(X(P, p))).join(" ") : k = Object.values(p).map(String).join(" "), v.set(p, k)), k;
  }, h = y(() => {
    if (!a.value && d.value !== "") {
      const p = new RegExp(d.value, "i");
      return s.value.filter((k) => p.test(b(k)));
    }
    return s.value;
  }), w = (p, k) => {
    const P = ba(p) ? p : parseFloat(String(p));
    if (isNaN(P)) return !1;
    if (k.comparison === "between" && Array.isArray(k.criteria)) {
      const [te, ae] = k.criteria;
      return P >= te && P <= ae;
    }
    const F = k.criteria;
    switch (k.comparison) {
      case ">":
        return P > F;
      case ">=":
        return P >= F;
      case "<":
        return P < F;
      case "<=":
        return P <= F;
      default:
        return !1;
    }
  }, B = y(() => {
    var p;
    return (p = t.value) != null && p.length ? h.value.filter(
      (k) => t.value.every((P) => {
        const F = X(P.field, k);
        return ha(P) ? P.comparison(F, P.criteria) : ma(P) ? w(F, P) : va(P) ? P.criteria.includes(F) : P.comparison === "=" ? F === P.criteria : F !== P.criteria;
      })
    ) : h.value;
  }), $ = (p, k, P) => p === k ? 0 : p == null ? 1 : k == null ? -1 : p < k ? P ? 1 : -1 : P ? -1 : 1, O = (p, k, P, F) => F < 0 ? p : O(p, k, P, F - 1).sort((te, ae) => {
    if (!k.slice(0, F).every((Ie) => X(Ie, te) === X(Ie, ae))) return 0;
    const ve = k[F], ne = X(ve, te), ke = X(ve, ae);
    return $(ne, ke, P[F]);
  }), M = y(() => {
    if (a.value) return s.value;
    if (!e.value) return B.value;
    const { sortBy: p, sortDesc: k } = e.value, P = [...B.value];
    return r.value && Array.isArray(p) && Array.isArray(k) ? p.length ? O(P, p, k, p.length - 1) : P : P.sort((F, te) => {
      const ae = X(p, F), Q = X(p, te);
      return $(ae, Q, k);
    });
  }), Z = y(() => a.value ? l.value : M.value.length), H = y(() => a.value ? !1 : (a.value ? l.value : s.value.length) >= u.value), {
    selectedItems: ue,
    toggleSelectAll: ee,
    toggleSelectItem: xe,
    isProcessing: we,
    selectionProgress: Pe
  } = xa(M, o, n, g), V = y({
    get: () => o.value ?? [],
    set: (p) => {
      g("update:itemsSelected", p);
    }
  }), Ce = (p) => p.filter((k) => !n(k)), N = (p) => {
    V.value = p ? Ce(M.value) : V.value = [], p && g("selectAll");
  }, j = (p) => {
    const k = p.checkbox;
    if (delete p.checkbox, delete p.index, k)
      V.value = V.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(p)
      ), g("deselectRow", p);
    else {
      const P = V.value;
      P.unshift(p), V.value = P, g("selectRow", p);
    }
  };
  return {
    totalItems: M,
    selectItemsComputed: V,
    totalItemsLength: Z,
    toggleSelectAll: (p) => {
      if (!M.value.every((P) => n(P)))
        if (H.value) {
          g("updateSelectionStatus", !0);
          try {
            ee(p), g("update:itemsSelected", p ? Array.from(ue.value) : []), p && g("selectAll");
          } finally {
            g("updateSelectionStatus", !1);
          }
        } else
          N(p);
    },
    toggleSelectItem: (p) => {
      n(p) || (H.value ? xe(p) : j(p));
    },
    isProcessing: y(() => H.value && we.value),
    processProgress: Pe
  };
}
function Pa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, qe = {}, Le = { exports: {} }, ct;
function Ca() {
  if (ct) return Le.exports;
  ct = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Le.exports = t(), Le.exports.createColors = t, Le.exports;
}
var ft;
function ka() {
  return ft || (ft = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(r, u) {
      for (var n in u) Object.defineProperty(r, n, {
        enumerable: !0,
        get: u[n]
      });
    }
    t(e, {
      dim: function() {
        return d;
      },
      default: function() {
        return l;
      }
    });
    const a = /* @__PURE__ */ s(/* @__PURE__ */ Ca());
    function s(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    let o = /* @__PURE__ */ new Set();
    function i(r, u, n) {
      typeof process < "u" && process.env.JEST_WORKER_ID || n && o.has(n) || (n && o.add(n), console.warn(""), u.forEach((g) => console.warn(r, "-", g)));
    }
    function d(r) {
      return a.default.dim(r);
    }
    const l = {
      info(r, u) {
        i(a.default.bold(a.default.cyan("info")), ...Array.isArray(r) ? [
          r
        ] : [
          u,
          r
        ]);
      },
      warn(r, u) {
        i(a.default.bold(a.default.yellow("warn")), ...Array.isArray(r) ? [
          r
        ] : [
          u,
          r
        ]);
      },
      risk(r, u) {
        i(a.default.bold(a.default.magenta("risk")), ...Array.isArray(r) ? [
          r
        ] : [
          u,
          r
        ]);
      }
    };
  }(qe)), qe;
}
var gt;
function Sa() {
  return gt || (gt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = /* @__PURE__ */ a(ka());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    function s({ version: i, from: d, to: l }) {
      t.default.warn(`${d}-color-renamed`, [
        `As of Tailwind CSS ${i}, \`${d}\` has been renamed to \`${l}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const o = {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
      },
      get lightBlue() {
        return s({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return s({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return s({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return s({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return s({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(je)), je;
}
var We, pt;
function Ia() {
  if (pt) return We;
  pt = 1;
  let e = Sa();
  return We = (e.__esModule ? e : { default: e }).default, We;
}
var $a = Ia();
const re = /* @__PURE__ */ Pa($a), Ke = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, Ba = (e) => {
  const t = mt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, s = 1 / 0;
  const o = Object.entries(re).reduce((i, [d, l]) => {
    if (typeof l == "object") {
      const r = d;
      Object.entries(Ke).forEach(([u, n]) => {
        l[n] && (i[l[n]] = { color: r, variant: u });
      });
    }
    return i;
  }, {});
  return Object.entries(o).forEach(([i, d]) => {
    const l = mt(i);
    if (!l) return;
    const r = Fa(t, l);
    r < s && (s = r, a = d);
  }), a;
}, Na = (e, t) => {
  const a = Ke[t], s = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": re[e][a],
    "--theme-border": re[e][a],
    "--theme-hover": re[e][s],
    "--theme-active": re[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": re.gray[300],
    "--theme-light": re[e]["400"],
    "--theme-focus": re[e][a] + "80"
    // 添加 50% 透明度
  };
}, Aa = (e) => {
  const { color: t, variant: a = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? Ba(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : re[t][Ke[a]],
    tailwindName: t,
    style: Na(t, a)
  };
};
function mt(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function Fa(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const Ra = {}, Ma = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ta(e, t) {
  return m(), x("svg", Ma, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const La = /* @__PURE__ */ me(Ra, [["render", Ta]]), Ea = {}, Da = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Oa(e, t) {
  return m(), x("svg", Da, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ha = /* @__PURE__ */ me(Ea, [["render", Oa]]), ja = {}, qa = { class: "px-3 py-1.5" };
function Wa(e, t) {
  return m(), x("span", qa, t[0] || (t[0] = [
    C("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      C("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const za = /* @__PURE__ */ me(ja, [["render", Wa]]), Ua = {}, Va = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ka(e, t) {
  return m(), x("svg", Va, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ga = /* @__PURE__ */ me(Ua, [["render", Ka]]), Ja = {}, Ya = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Za(e, t) {
  return m(), x("svg", Ya, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Qa = /* @__PURE__ */ me(Ja, [["render", Za]]), Xa = /* @__PURE__ */ R({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, a) => (m(), x("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      W(Qa, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), _a = ["checked", "disabled", "aria-checked"], en = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, tn = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, an = /* @__PURE__ */ R({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = y(() => t.checked), s = y(() => t.partial), o = ye("themeClasses");
    return (i, d) => (m(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !i.disabled && "cursor-pointer group",
        i.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: d[0] || (d[0] = Ve((l) => !i.disabled && i.$emit("change"), ["stop", "prevent"]))
    }, [
      C("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: i.disabled,
        "aria-checked": a.value
      }, null, 8, _a),
      C("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          a.value && !s.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          s.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !a.value && !s.value && [
            "border-gray-300 bg-white",
            !i.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !i.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: ie(c(o).style)
      }, [
        ze((m(), x("svg", en, d[1] || (d[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ue, a.value && !s.value]
        ]),
        ze((m(), x("svg", tn, d[2] || (d[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ue, s.value]
        ])
      ], 6)
    ], 2));
  }
}), yt = /* @__PURE__ */ R({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = t;
    return (s, o) => (m(), U(an, {
      checked: s.checked,
      disabled: s.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (i) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), nn = /* @__PURE__ */ R({
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
    const a = e, s = y(() => a.status === "allSelected"), o = y(() => a.status === "partSelected"), i = t;
    return (d, l) => (m(), U(yt, {
      checked: s.value,
      partial: o.value,
      disabled: e.disabled,
      onChange: l[0] || (l[0] = (r) => i("change", !s.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), sn = {
  key: 1,
  class: "items-center gap-2"
}, rn = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, ln = /* @__PURE__ */ R({
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
    lastFixedColumn: String,
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
    const a = t, s = bt(), o = (d) => [
      `header-${d.value}`,
      `header-${d.value.toLowerCase()}`,
      "header"
    ].find((r) => s[r]) || "header", i = (d) => {
      d.sortable && d.sortType && a("headerClick", d);
    };
    return (d, l) => (m(), x("th", {
      style: ie(e.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-100 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-200": e.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastFixedColumn
        },
        e.header.sortable && {
          "bg-gray-100": e.header.sortType === "none",
          "bg-gray-200": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
        },
        typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
      ]]),
      onClick: l[1] || (l[1] = Ve((r) => i(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (m(), U(nn, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: l[0] || (l[0] = (r) => d.$emit("toggleSelectAll", r))
      }, null, 8, ["disabled", "status"])) : (m(), x("div", sn, [
        I(d.$slots, o(e.header), q(le({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, z(e.header.text), 1)
        ]),
        e.header.sortable ? (m(), U(c(Xa), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (m(), x("span", rn, z(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), on = /* @__PURE__ */ R({
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
    lastFixedColumn: String,
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
    const a = t, s = (i) => {
      a("headerClick", i);
    }, o = (i) => {
      a("toggleSelectAll", i);
    };
    return (i, d) => e.headers.length && !e.hideHeader ? (m(), x("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm text-slate-700 uppercase text-nowrap text-left",
        { "sticky top-0 z-10": e.fixedHeader },
        e.headerClassName
      ]])
    }, [
      C("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-200": e.borderCell }]])
      }, [
        (m(!0), x(oe, null, Y(e.headers, (l, r) => (m(), U(ln, {
          key: r,
          header: l,
          index: r,
          "fixed-distance": e.getFixedDistance(l.value),
          "last-fixed-column": e.lastFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: s,
          onToggleSelectAll: o
        }, pe({ _: 2 }, [
          Y(i.$slots, (u, n) => ({
            name: n,
            fn: G((g) => [
              I(i.$slots, n, J({ ref_for: !0 }, g))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), un = /* @__PURE__ */ R({
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
    const a = e, s = t, o = y(() => a.isDisabled ?? !1), i = y(() => typeof a.bodyItemClassName == "function" ? a.bodyItemClassName(a.column, a.index) : a.bodyItemClassName), d = y(
      () => a.column === "expand" || a.column === a.expandColumn
    ), l = () => {
      d.value && a.expandColumn === "" && s("toggle-expand", event);
    }, r = (n) => {
      s("toggle-expand", n);
    }, u = () => {
      s("toggle-select");
    };
    return (n, g) => (m(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": n.column === "expand" && n.expandColumn === "" },
        i.value
      ]]),
      style: ie(n.style),
      onClick: l
    }, [
      n.column === "checkbox" ? (m(), x(oe, { key: 0 }, [
        n.column === "checkbox" ? I(n.$slots, "selection-checkbox", q(J({ key: 0 }, { item: n.item, index: n.index, isDisabled: o.value, toggleSelectItem: u })), () => [
          W(yt, {
            checked: !!n.item.checkbox,
            disabled: o.value,
            onChange: u
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : d.value ? I(n.$slots, "expand-button", q(J({ key: 1 }, { item: n.item, expanded: n.isExpanded, toggle: r })), () => [
        C("button", {
          onClick: Ve(r, ["stop"]),
          class: "inline-flex items-center"
        }, [
          W(c(Ga), {
            class: S({ "transform -rotate-90": n.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(n.$slots, `item-${n.column}`, q(J({ key: 2 }, n.item)), () => [
        I(n.$slots, `item-${n.column.toLowerCase()}`, q(le(n.item)), () => [
          I(n.$slots, "item", q(le({ column: n.column, item: n.item })), () => [
            Ee(z(c(ya)(n.column, n.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), dn = /* @__PURE__ */ R({
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
    getFixedDistance: { type: Function }
  },
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: t }) {
    const a = e, s = t, o = y(() => typeof a.bodyRowClassName == "function" ? a.bodyRowClassName(a.item, a.index) : a.bodyRowClassName), i = (r) => {
      s("click", r, a.item, a.index);
    }, d = (r) => {
      s("dblclick", r, a.item, a.index);
    }, l = (r) => {
      s("contextmenu", r, a.item);
    };
    return (r, u) => (m(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors", [
        { "bg-gray-50": r.alternating && r.index % 2 === 0 },
        { "bg-white": !r.alternating || r.index % 2 === 1 },
        { "hover:bg-gray-100": !r.noHover },
        { "divide-x divide-gray-200": r.borderCell },
        o.value
      ]]),
      onClick: i,
      onDblclick: d,
      onContextmenu: l
    }, [
      I(r.$slots, "prepend"),
      (m(!0), x(oe, null, Y(r.columns, (n, g) => {
        var v;
        return m(), U(un, {
          key: g,
          column: n,
          item: r.item,
          index: r.index,
          style: ie((v = r.getFixedDistance) == null ? void 0 : v.call(r, n, "td")),
          "is-disabled": r.isDisabled,
          onToggleSelect: u[0] || (u[0] = () => r.$emit("toggle-select", r.item)),
          "expand-column": r.expandColumn,
          "is-expanded": r.isExpanded,
          onToggleExpand: u[1] || (u[1] = (b) => r.$emit("toggle-expand", b, r.index, r.item))
        }, pe({ _: 2 }, [
          Y(r.$slots, (b, h) => ({
            name: h,
            fn: G((w) => [
              I(r.$slots, h, J({ ref_for: !0 }, w))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded"]);
      }), 128)),
      I(r.$slots, "append")
    ], 34));
  }
}), cn = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, fn = /* @__PURE__ */ R({
  __name: "LoadingLine",
  setup(e) {
    const t = ye("themeClasses");
    return (a, s) => (m(), x("div", cn, [
      C("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ie({ backgroundColor: c(t).hex })
      }, null, 4)
    ]));
  }
}), gn = /* @__PURE__ */ me(fn, [["__scopeId", "data-v-cbdc3562"]]), pn = ["colspan"], mn = /* @__PURE__ */ R({
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
    const t = e, a = y(() => typeof t.bodyExpandRowClassName == "function" ? t.bodyExpandRowClassName(t.item, t.index) : t.bodyExpandRowClassName);
    return (s, o) => (m(), x("tr", {
      class: S(["vdt-expand-row", [
        { "bg-gray-50": (s.index + 1) % 2 === 0 },
        a.value
      ]])
    }, [
      C("td", {
        colspan: s.columnsCount,
        class: "px-4 py-2"
      }, [
        s.loading ? (m(), U(gn, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        C("div", {
          class: S(["transition-all duration-300", { "opacity-0": !s.isExpanded }])
        }, [
          I(s.$slots, "default")
        ], 2)
      ], 8, pn)
    ], 2));
  }
}), vn = { class: "flex items-center gap-2 text-sm text-gray-700" }, hn = { class: "relative inline-block min-w-[70px]" }, bn = ["aria-expanded"], yn = { class: "block truncate" }, xn = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, wn = ["aria-selected", "onClick"], Pn = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, Cn = /* @__PURE__ */ R({
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
    const a = e, s = t, o = _(!1), i = _(!1), d = y({
      get: () => a.modelValue,
      set: (v) => s("update:modelValue", v)
    }), l = ye("dataTable");
    fe(o, (v) => {
      if (v && (l != null && l.value)) {
        const b = window.innerHeight, h = l.value.getBoundingClientRect(), w = b - (h.height + h.top);
        i.value = w <= 100;
      }
    });
    const r = (v) => {
      d.value = v, o.value = !1;
    }, u = () => {
      o.value = !o.value;
    }, n = (v) => {
      v.target.closest(".relative") || (o.value = !1);
    }, g = (v) => {
      const b = v.relatedTarget;
      b != null && b.closest(".relative") || (o.value = !1);
    };
    return ht(() => {
      document.addEventListener("click", n);
    }), Ut(() => {
      document.removeEventListener("click", n);
    }), (v, b) => (m(), x("div", vn, [
      Ee(z(e.message) + " ", 1),
      C("div", hn, [
        C("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            o.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: u,
          "aria-haspopup": "listbox",
          "aria-expanded": o.value
        }, [
          C("span", yn, z(d.value), 1),
          C("span", xn, [
            (m(), x("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": o.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, b[0] || (b[0] = [
              C("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, bn),
        W(Vt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: G(() => [
            o.value ? (m(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": i.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: g
            }, [
              (m(!0), x(oe, null, Y(e.rowsItems, (h) => (m(), x("li", {
                key: h,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  h === d.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": h === d.value,
                onClick: (w) => r(h)
              }, [
                C("span", {
                  class: S(["block", { "font-medium": h === d.value }])
                }, z(h), 3),
                h === d.value ? (m(), x("span", Pn, b[1] || (b[1] = [
                  C("svg", {
                    class: "h-4 w-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor"
                  }, [
                    C("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M5 13l4 4L19 7"
                    })
                  ], -1)
                ]))) : D("", !0)
              ], 10, wn))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), kn = { class: "text-sm text-gray-700" }, Sn = /* @__PURE__ */ R({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, a) => (m(), x("div", kn, [
      I(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        Ee(z(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + z(t.rowsOfPageSeparatorMessage) + " " + z(t.totalItemsLength), 1)
      ])
    ]));
  }
}), In = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, $n = ["disabled"], Bn = ["disabled"], vt = /* @__PURE__ */ R({
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
    const a = t;
    return (s, o) => (m(), x("div", In, [
      C("button", {
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
        onClick: o[0] || (o[0] = (i) => a("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        W(c(Ha), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, $n),
      I(s.$slots, "buttonsPagination"),
      C("button", {
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
        onClick: o[1] || (o[1] = (i) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        W(c(La), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Bn)
    ]));
  }
}), Nn = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, An = ["onClick"], ge = 7, Fn = /* @__PURE__ */ R({
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
    const a = e, s = t, o = ye("themeClasses"), i = (l) => {
      l.type === "button" && !l.active && s("updatePage", l.page);
    }, d = y(() => {
      const l = [], { maxPaginationNumber: r, currentPaginationNumber: u } = a;
      if (r <= ge) {
        for (let n = 1; n <= r; n += 1)
          l.push({
            type: "button",
            page: n,
            active: n === u,
            activePrev: n + 1 === u
          });
        return l;
      }
      if ([1, 2, r, r - 1].includes(u))
        for (let n = 1; n <= ge; n += 1)
          if (n <= 3)
            l.push({
              type: "button",
              page: n,
              active: n === u,
              activePrev: n + 1 === u
            });
          else if (n === 4)
            l.push({ type: "omission" });
          else {
            const g = r - (ge - n);
            l.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let n = 1; n <= ge; n += 1)
          n <= 5 ? l.push({
            type: "button",
            page: n,
            active: n === u,
            activePrev: n + 1 === u
          }) : n === 6 ? l.push({ type: "omission" }) : l.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(u))
        for (let n = 1; n <= ge; n += 1)
          if (n === 1)
            l.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (n === 2)
            l.push({ type: "omission" });
          else {
            const g = r - (ge - n);
            l.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else
        for (let n = 1; n <= ge; n += 1)
          if (n === 1)
            l.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (n === 2 || n === 6)
            l.push({ type: "omission" });
          else if (n === 7)
            l.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: !1
            });
          else {
            const g = 4 - n, v = u - g;
            l.push({
              type: "button",
              page: v,
              active: v === u,
              activePrev: v + 1 === u
            });
          }
      return l;
    });
    return (l, r) => (m(), x("div", Nn, [
      (m(!0), x(oe, null, Y(d.value, (u, n) => (m(), x("div", {
        key: n,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          n === 0 && "rounded-l-md",
          // Last item styles
          n === d.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              c(o).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${c(o).tailwindName}-500`,
              `focus:border-${c(o).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            n !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            n !== 0 && "-ml-px"
          ]
        ]]),
        style: ie(c(o).style),
        onClick: (g) => i(u)
      }, [
        u.type === "button" ? (m(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, z(u.page), 3)) : (m(), U(c(za), { key: 1 }))
      ], 14, An))), 128))
    ]));
  }
}), Rn = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Mn = /* @__PURE__ */ R({
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
    const a = e, s = t, o = y(() => ({
      isFirstPage: a.isFirstPage,
      isLastPage: a.isLastPage,
      currentPaginationNumber: a.currentPaginationNumber,
      maxPaginationNumber: a.maxPaginationNumber,
      nextPage: () => s("nextPage"),
      prevPage: () => s("prevPage"),
      updatePage: (i) => s("updatePage", i)
    }));
    return (i, d) => i.hideFooter ? D("", !0) : (m(), x("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-sm": i.showShadow }, i.footerClassName]])
    }, [
      W(vt, {
        "is-first-page": i.isFirstPage,
        "is-last-page": i.isLastPage,
        onClickNextPage: d[0] || (d[0] = () => s("nextPage")),
        onClickPrevPage: d[1] || (d[1] = () => s("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: G(() => d[6] || (d[6] = [
          C("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      C("div", Rn, [
        i.hideRowsPerPage ? D("", !0) : (m(), U(Cn, {
          key: 0,
          "model-value": i.rowsPerPage,
          "rows-items": i.rowsItems,
          message: i.rowsPerPageMessage,
          "onUpdate:modelValue": d[2] || (d[2] = (l) => s("update:rowsPerPage", l))
        }, null, 8, ["model-value", "rows-items", "message"])),
        i.hidePaginationInfo ? D("", !0) : (m(), U(Sn, {
          key: 1,
          "current-page-first-index": i.currentPageFirstIndex,
          "current-page-last-index": i.currentPageLastIndex,
          "total-items-length": i.totalItemsLength,
          "rows-of-page-separator-message": i.rowsOfPageSeparatorMessage
        }, pe({ _: 2 }, [
          i.$slots["pagination-info"] ? {
            name: "default",
            fn: G((l) => [
              I(i.$slots, "pagination-info", q(le(l)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        i.$slots.pagination ? I(i.$slots, "pagination", q(J({ key: 2 }, o.value))) : (m(), U(vt, {
          key: 3,
          "is-first-page": i.isFirstPage,
          "is-last-page": i.isLastPage,
          onClickNextPage: d[4] || (d[4] = () => s("nextPage")),
          onClickPrevPage: d[5] || (d[5] = () => s("prevPage"))
        }, pe({ _: 2 }, [
          i.buttonsPagination ? {
            name: "buttonsPagination",
            fn: G(() => [
              W(Fn, {
                "current-pagination-number": i.currentPaginationNumber,
                "max-pagination-number": i.maxPaginationNumber,
                onUpdatePage: d[3] || (d[3] = (l) => s("updatePage", l))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Tn = ["id"], Ln = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, En = { class: "relative z-10" }, Dn = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, xt = /* @__PURE__ */ R({
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
    tableWrapperClass: { default: "" },
    tableContainerClass: { default: "" },
    checkboxColumnWidth: { default: null },
    expandColumnWidth: { default: 36 },
    indexColumnWidth: { default: 60 },
    showIndex: { type: Boolean, default: !1 },
    showIndexSymbol: { default: "#" },
    fixedExpand: { type: Boolean, default: !1 },
    fixedHeader: { type: Boolean, default: !1 },
    fixedCheckbox: { type: Boolean, default: !1 },
    fixedIndex: { type: Boolean, default: !1 },
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
  setup(e, { expose: t, emit: a }) {
    const s = e, {
      checkboxColumnWidth: o,
      expandColumnWidth: i,
      indexColumnWidth: d,
      rowsItems: l,
      showIndexSymbol: r,
      currentPage: u,
      filterOptions: n,
      headers: g,
      itemsSelected: v,
      loading: b,
      items: h,
      rowsPerPage: w,
      searchField: B,
      searchValue: $,
      serverItemsLength: O,
      showIndex: M,
      sortBy: Z,
      sortType: H,
      serverOptions: ue,
      multiSort: ee,
      mustSort: xe,
      clickEventType: we,
      clickRowToExpand: Pe,
      clickRowToSelect: V,
      fixedExpand: Ce,
      fixedCheckbox: N,
      fixedIndex: j,
      batchSelectionThreshold: L,
      expandColumn: E
    } = Kt(s), p = y(() => Aa(s.theme));
    it("themeClasses", p);
    const k = bt(), P = y(() => !!k.expand), F = y(() => !!k.body), te = _(null), ae = _(null);
    it("dataTable", te);
    const Q = a, ve = y(() => v.value !== null), ne = y(() => ue.value !== null), {
      serverOptionsComputed: ke,
      updateServerOptionsPage: Ie,
      updateServerOptionsSort: wt,
      updateServerOptionsRowsPerPage: Pt
    } = pa(
      ue,
      ee,
      Q
    ), {
      clientSortOptions: Ge,
      headerColumns: Je,
      headersForRender: he,
      updateSortField: Ct,
      isMultiSorting: kt,
      getMultiSortNumber: St
    } = ra(
      r,
      o,
      i,
      N,
      Ce,
      j,
      g,
      P,
      d,
      ve,
      ne,
      xe,
      ke,
      M,
      Z,
      H,
      ee,
      E,
      wt,
      Q
    ), {
      rowsItemsComputed: Ye,
      rowsPerPageRef: be,
      updateRowsPerPage: Ze
    } = ga(
      ne,
      l,
      ue,
      w
    ), {
      totalItems: Qe,
      selectItemsComputed: It,
      totalItemsLength: $e,
      toggleSelectAll: $t,
      toggleSelectItem: Xe,
      isProcessing: Bt,
      processProgress: Nt
    } = wa(
      Ge,
      n,
      ne,
      h,
      v,
      B,
      $,
      O,
      ee,
      L,
      s.disabledRows,
      Q
    ), {
      currentPaginationNumber: de,
      maxPaginationNumber: Be,
      isLastPage: Ne,
      isFirstPage: Ae,
      nextPage: Fe,
      prevPage: Re,
      updatePage: Se,
      updateCurrentPaginationNumber: At
    } = fa(
      u,
      ne,
      b,
      $e,
      be,
      ue,
      Ie
    ), {
      currentPageFirstIndex: _e,
      currentPageLastIndex: et,
      multipleSelectStatus: Ft,
      pageItems: ce
    } = ca(
      de,
      ve,
      ne,
      h,
      be,
      It,
      M,
      Qe,
      $e,
      s.disabledRows
    ), Me = y(() => de.value === 0 ? 0 : (de.value - 1) * be.value), {
      expandingItemIndexList: De,
      updateExpandingItemIndexList: tt,
      clearExpandingItemIndexList: at
    } = na(
      ce,
      Me,
      Q
    ), {
      fixedHeaders: nt,
      lastFixedColumn: st,
      fixedColumnsInfos: Rt,
      showShadow: rt
    } = sa(
      he,
      ae
    ), Mt = (f) => {
      const se = f.width ?? (nt.value.length ? 100 : null);
      if (se) return `width: ${se}px; min-width: ${se}px;`;
    }, lt = (f, se = "th") => {
      if (!nt.value.length) return;
      const A = Rt.value.find((T) => T.value === f);
      if (A)
        return `
            left: ${A.distance}px;
            z-index: ${se === "th" ? 3 : 1};
            position: sticky;
            background-color: ${se === "th" ? "none" : "inherit"};
            ${A.value === st.value ? `
                box-shadow: 4px 0 6px -2px rgba(0, 0, 0, 0.1);
                clip-path: inset(0px -10px 0px 0px);
            ` : ""}
            isolation: isolate;
        `;
    }, Tt = (f) => {
      f.sortable && f.sortType && Ct(f.value, f.sortType);
    }, Oe = (f) => typeof s.disabledRows == "function" ? s.disabledRows(f) : !1, Lt = y(() => ce.value.every((f) => s.disabledRows(f))), Et = (f) => {
      Oe(f) || Xe(f);
    }, {
      handleRowClick: Dt,
      handleRowDoubleClick: Ot,
      handleRowContextMenu: Ht
    } = aa(
      we,
      ve,
      M,
      Oe,
      Pe,
      V,
      tt,
      Xe,
      Q
    );
    return fe(b, (f, se) => {
      ke.value && f === !1 && se === !0 && (At(ke.value.page), at());
    }), fe(be, (f) => {
      ne.value ? Pt(f) : Se(1);
    }), fe([$, n], () => {
      ne.value || Se(1);
    }), fe([de, Ge, B, $, n], () => {
      at();
    }, { deep: !0 }), fe(ce, (f) => {
      Q("updatePageItems", f);
    }, { deep: !0 }), fe(Qe, (f) => {
      Q("updateTotalItems", f);
    }, { deep: !0 }), t({
      currentPageFirstIndex: _e,
      currentPageLastIndex: et,
      clientItemsLength: $e,
      maxPaginationNumber: Be,
      currentPaginationNumber: de,
      isLastPage: Ne,
      isFirstPage: Ae,
      nextPage: Fe,
      prevPage: Re,
      updatePage: Se,
      rowsPerPageOptions: Ye,
      rowsPerPageActiveOption: be,
      updateRowsPerPageActiveOption: Ze
    }), (f, se) => (m(), x("div", {
      ref_key: "tableWrapper",
      ref: te,
      class: S(["vdt-table-wrapper relative w-full", [f.tableWrapperClass]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: ae,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-sm": c(rt) }, f.tableContainerClass]])
      }, [
        C("table", {
          id: f.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [f.tableClassName]])
        }, [
          C("colgroup", null, [
            (m(!0), x(oe, null, Y(c(he), (A, T) => (m(), x("col", {
              key: T,
              style: ie(Mt(A))
            }, null, 4))), 128))
          ]),
          c(k)["customize-headers"] ? I(f.$slots, "customize-headers", { key: 0 }) : D("", !0),
          W(on, J({
            headers: c(he),
            hideHeader: f.hideHeader,
            fixedHeader: f.fixedHeader,
            headerClassName: f.headerClassName,
            borderCell: f.borderCell,
            lastFixedColumn: c(st),
            headerItemClassName: f.headerItemClassName,
            areAllVisibleRowsDisabled: Lt.value,
            multipleSelectStatus: c(Ft),
            multiSort: c(ee)
          }, {
            "is-multi-sorting": c(kt),
            "get-multi-sort-number": c(St),
            "get-fixed-distance": lt,
            onHeaderClick: Tt,
            onToggleSelectAll: c($t)
          }), pe({ _: 2 }, [
            Y(f.$slots, (A, T) => ({
              name: T,
              fn: G((K) => [
                I(f.$slots, T, q(le(K)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          F.value ? I(f.$slots, "body", q(J({ key: 1 }, c(ce)))) : c(Je).length ? (m(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm divide-y divide-gray-200", [f.bodyClassName]])
          }, [
            I(f.$slots, "body-prepend", q(le({
              items: c(ce),
              pagination: { isFirstPage: c(Ae), isLastPage: c(Ne), currentPaginationNumber: c(de), maxPaginationNumber: c(Be), nextPage: c(Fe), prevPage: c(Re) },
              headers: c(he)
            }))),
            (m(!0), x(oe, null, Y(c(ce), (A, T) => (m(), x(oe, {
              key: A.key || T
            }, [
              W(dn, {
                item: A,
                index: T,
                columns: c(Je),
                alternating: f.alternating,
                "no-hover": f.noHover,
                "border-cell": f.borderCell,
                "body-row-className": f.bodyRowClassName,
                "is-expanded": c(De).includes(T + Me.value),
                "is-disabled": Oe(A),
                "expand-column": c(E),
                "get-fixed-distance": lt,
                onClick: (K) => c(Dt)(K, A, T),
                onDblclick: (K) => c(Ot)(K, A, T),
                onContextmenu: (K) => c(Ht)(K, A),
                onToggleExpand: (K) => c(tt)(T, A, K),
                onToggleSelect: (K) => Et(A)
              }, pe({ _: 2 }, [
                Y(f.$slots, (K, ot) => ({
                  name: ot,
                  fn: G((jt) => [
                    I(f.$slots, ot, J({ ref_for: !0 }, jt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              P.value && c(De).includes(T + Me.value) ? (m(), U(mn, {
                key: 0,
                item: A,
                index: T,
                "columns-count": c(he).length,
                loading: A.expandLoading,
                "is-expanded": c(De).includes(T + Me.value),
                "body-expand-row-className": f.bodyExpandRowClassName
              }, {
                default: G(() => [
                  I(f.$slots, "expand", J({ ref_for: !0 }, A))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            I(f.$slots, "body-append", q(le({
              items: c(ce),
              pagination: { isFirstPage: c(Ae), isLastPage: c(Ne), currentPaginationNumber: c(de), maxPaginationNumber: c(Be), nextPage: c(Fe), prevPage: c(Re), updatePage: c(Se) },
              headers: c(he)
            })))
          ], 2)) : D("", !0)
        ], 10, Tn),
        c(b) ? (m(), x("div", Ln, [
          C("div", En, [
            I(f.$slots, "loading", {}, () => [
              W(Yt)
            ])
          ])
        ])) : D("", !0),
        !c(ce).length && !c(b) ? (m(), x("div", Dn, [
          I(f.$slots, "empty-message", {}, () => [
            Ee(z(f.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      W(Mn, J({
        hideFooter: f.hideFooter,
        hideRowsPerPage: f.hideRowsPerPage,
        hidePaginationInfo: f.hidePaginationInfo,
        buttonsPagination: f.buttonsPagination,
        showShadow: c(rt),
        footerClassName: f.footerClassName,
        rowsPerPage: c(be),
        rowsItems: c(Ye),
        rowsPerPageMessage: f.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: f.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: c(_e),
        currentPageLastIndex: c(et),
        totalItemsLength: c($e),
        currentPaginationNumber: c(de),
        maxPaginationNumber: c(Be),
        isFirstPage: c(Ae),
        isLastPage: c(Ne)
      }, {
        "onUpdate:rowsPerPage": c(Ze),
        onNextPage: c(Fe),
        onPrevPage: c(Re),
        onUpdatePage: c(Se)
      }), pe({ _: 2 }, [
        f.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: G((A) => [
            I(f.$slots, "pagination-info", q(le(A)))
          ]),
          key: "0"
        } : void 0,
        f.$slots.pagination ? {
          name: "pagination",
          fn: G((A) => [
            I(f.$slots, "pagination", q(le(A)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      ze(W(ta, { progress: c(Nt) }, null, 8, ["progress"]), [
        [Ue, c(Bt)]
      ])
    ], 2));
  }
}), On = (e) => {
  e.component("DataTable", xt);
};
xt.install = On;
export {
  qn as createFilter,
  xt as default,
  On as install
};
