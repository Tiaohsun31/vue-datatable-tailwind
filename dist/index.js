var Wt = Object.defineProperty;
var zt = (e, t, a) => t in e ? Wt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var He = (e, t, a) => zt(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as R, inject as ye, openBlock as m, createElementBlock as w, Fragment as oe, renderList as Y, createElementVNode as C, normalizeClass as S, normalizeStyle as le, unref as c, toDisplayString as z, ref as _, computed as y, onMounted as ht, onUnmounted as Ut, watch as fe, createVNode as W, withModifiers as Ve, withDirectives as ze, vShow as Ue, createBlock as U, useSlots as bt, renderSlot as I, normalizeProps as q, guardReactiveProps as re, createCommentVNode as D, createSlots as pe, withCtx as G, mergeProps as J, createTextVNode as Ee, onBeforeUnmount as Vt, Transition as Kt, toRefs as Gt, provide as it } from "vue";
const Jt = { class: "inline-flex relative w-[60px] h-[60px]" }, Yt = /* @__PURE__ */ R({
  __name: "Loading",
  setup(e) {
    const t = ye("themeClasses");
    return (a, n) => (m(), w("div", Jt, [
      (m(), w(oe, null, Y(4, (l) => C("div", {
        key: l,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(l - 1) * 150}`]]),
        style: le({
          borderTopColor: c(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), me = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, l] of t)
    a[n] = l;
  return a;
}, Zt = /* @__PURE__ */ me(Yt, [["__scopeId", "data-v-e9a27991"]]), Qt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Xt = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, _t = { class: "w-64" }, ea = { class: "h-2 bg-gray-200 rounded" }, ta = { class: "text-center text-sm text-gray-600" }, aa = /* @__PURE__ */ R({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = ye("themeClasses");
    return (a, n) => (m(), w("div", Qt, [
      C("div", Xt, [
        n[0] || (n[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", _t, [
          C("div", ea, [
            C("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: le({ width: `${a.progress}%`, backgroundColor: c(t).hex })
            }, null, 4)
          ])
        ]),
        C("div", ta, z(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function na(e, t, a, n, l, i, d, o, r) {
  const u = (b, h) => {
    const x = { ...b };
    return t.value && (delete x.checkbox, x.isSelected = b.checkbox), a.value && (delete x.index, x.indexInCurrentPage = h + 1), x;
  };
  return {
    handleRowClick: (b, h, x) => {
      if (!b.target.closest(".checkbox, .expand-button") && (l.value && d(x, h, b), i.value && !n(h) && o(h), e.value === "single")) {
        const B = u(h, x);
        r("clickRow", B, b);
      }
    },
    handleRowDoubleClick: (b, h, x) => {
      if (e.value === "double") {
        const B = u(h, x);
        r("clickRow", B, b);
      }
    },
    handleRowContextMenu: (b, h) => {
      const x = u(h, -1);
      r("contextmenuRow", x, b);
    }
  };
}
function sa(e, t, a) {
  const n = _([]);
  return {
    expandingItemIndexList: n,
    // 展開項的索引列表
    updateExpandingItemIndexList: (d, o, r) => {
      r.stopPropagation();
      const u = n.value.indexOf(d);
      if (u !== -1)
        n.value.splice(u, 1);
      else {
        const s = e.value.findIndex((g) => JSON.stringify(g) === JSON.stringify(o));
        a("expandRow", t.value + s, o), n.value.push(t.value + s);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      n.value = [];
    }
    // 清空展開列表的方法
  };
}
function ra(e, t) {
  const a = y(() => e.value.filter((o) => o.fixed)), n = y(() => a.value.length ? a.value[a.value.length - 1].value : ""), l = y(() => {
    if (!a.value.length) return [];
    const o = a.value.map((r) => r.width ?? 100);
    return a.value.map((r, u) => ({
      value: r.value,
      // 列標籤
      fixed: r.fixed ?? !0,
      // 是否固定
      width: r.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: u === 0 ? 0 : o.reduce((s, g, v) => v < u ? s + g : s, 0)
    }));
  }), i = _(!1);
  let d = null;
  return ht(() => {
    const o = t.value;
    if (o) {
      const r = () => {
        i.value = o.scrollLeft > 0;
      };
      r(), o.addEventListener("scroll", r), d = () => {
        o.removeEventListener("scroll", r);
      };
    }
  }), Ut(() => {
    d && (d(), d = null);
  }), {
    fixedHeaders: a,
    lastFixedColumn: n,
    fixedColumnsInfos: l,
    showShadow: i
  };
}
function oa(e, t, a, n, l, i, d, o, r, u, s, g, v, b, h, x, B, $, O, M) {
  const Z = y(() => d.value.length ? {
    hasFixedColumns: d.value.some((N) => N.fixed),
    fixedHeaders: d.value.filter((N) => N.fixed),
    unFixedHeaders: d.value.filter((N) => !N.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), H = _(
    la(h.value, x.value, B.value)
  ), { determineHeaderSortState: ie } = da(s, v, B, H), ee = y(() => {
    const { fixedHeaders: N, unFixedHeaders: j } = Z.value, L = [...N, ...j].map((E) => ({
      ...E,
      sortType: E.sortable ? ie(E.value) : void 0
    }));
    return [
      ...Object.values(we.value).filter(Boolean),
      ...L
    ];
  }), we = y(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: n.value || Z.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: b.value && {
      text: e.value,
      value: "index",
      fixed: i.value || Z.value.hasFixedColumns,
      width: r.value
    },
    expand: o.value && !$.value && {
      text: "",
      value: "expand",
      fixed: l.value || Z.value.hasFixedColumns,
      width: a.value
    }
  })), xe = y(
    () => ee.value.map((N) => N.value)
  ), Pe = (N, j) => {
    const L = j === "none" ? "asc" : j === "asc" ? "desc" : g.value ? "asc" : null;
    if (s.value) {
      O(N, L);
      return;
    }
    const E = B.value ? ia(N, L, H.value) : ua(N, L);
    H.value = E, M("updateSort", { sortType: L, sortBy: N });
  }, V = y(() => (N) => {
    var L, E;
    const j = s.value ? (L = v.value) == null ? void 0 : L.sortBy : (E = H.value) == null ? void 0 : E.sortBy;
    return Array.isArray(j) && j.includes(N);
  }), Ce = y(() => (N) => {
    var L, E;
    const j = s.value ? (L = v.value) == null ? void 0 : L.sortBy : (E = H.value) == null ? void 0 : E.sortBy;
    return Array.isArray(j) ? j.indexOf(N) + 1 : !1;
  });
  return {
    clientSortOptions: H,
    headerColumns: xe,
    headersForRender: ee,
    updateSortField: Pe,
    isMultiSorting: V,
    getMultiSortNumber: Ce
  };
}
function la(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((n) => n === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const ia = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const n = a.sortBy.indexOf(e), l = [...a.sortBy], i = [...a.sortDesc];
  return n === -1 && t !== null ? (l.push(e), i.push(t === "desc")) : t === null ? (l.splice(n, 1), i.splice(n, 1)) : i[n] = t === "desc", { sortBy: l, sortDesc: i };
}, ua = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function da(e, t, a, n) {
  const l = (o) => !e.value || !t.value ? i(o) : d(o), i = (o) => {
    if (!n.value) return "none";
    const { sortBy: r, sortDesc: u } = n.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const s = r.indexOf(o);
      return s !== -1 ? u[s] ? "desc" : "asc" : "none";
    }
    return o === r ? u ? "desc" : "asc" : "none";
  }, d = (o) => {
    const { sortBy: r, sortType: u } = t.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const s = r.indexOf(o);
      return s !== -1 ? u[s] : "none";
    }
    return o === r && u ? u : "none";
  };
  return {
    determineHeaderSortState: l
  };
}
class ca {
  constructor() {
    He(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    He(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: n, index: l, ...i } = t;
      a = Object.entries(i).sort(([d], [o]) => d.localeCompare(o)).map(([d, o]) => `${d}:${o}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function fa(e, t, a, n, l, i, d, o, r, u) {
  const s = new ca(), g = y(
    () => (e.value - 1) * l.value + 1
  ), v = y(() => a.value ? Math.min(
    r.value,
    e.value * l.value
  ) : Math.min(
    o.value.length,
    e.value * l.value
  )), b = y(() => a.value ? n.value : o.value.slice(
    g.value - 1,
    v.value
  )), h = y(() => d.value ? b.value.map(($, O) => ({
    index: g.value + O,
    ...$
  })) : b.value), x = y(() => {
    if (i.value.length === 0)
      return "noneSelected";
    const $ = u ? o.value.filter((M) => !u(M)) : o.value;
    return i.value.length === $.length && i.value.every(
      (Z) => $.some(
        (H) => s.getItemKey(Z) === s.getItemKey(H)
      )
    ) ? "allSelected" : "partSelected";
  }), B = y(() => {
    if (!t.value)
      return h.value;
    switch (x.value) {
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
            (M) => s.getItemKey($) === s.getItemKey(M)
          ) && (!u || !u($)),
          ...$
        }));
    }
  });
  return {
    currentPageFirstIndex: g,
    currentPageLastIndex: v,
    multipleSelectStatus: x,
    pageItems: B
  };
}
function ga(e, t, a, n, l, i, d) {
  const o = _(i.value ? i.value.page : e.value), r = y(() => Math.ceil(n.value / l.value)), u = y(() => r.value === 0 || o.value === r.value), s = y(() => o.value === 1);
  return {
    currentPaginationNumber: o,
    maxPaginationNumber: r,
    isLastPage: u,
    isFirstPage: s,
    nextPage: () => {
      if (n.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const x = o.value + 1;
          d(x);
        } else
          o.value += 1;
    },
    prevPage: () => {
      if (n.value !== 0 && !s.value && !a.value)
        if (t.value) {
          const x = o.value - 1;
          d(x);
        } else
          o.value -= 1;
    },
    updatePage: (x) => {
      a.value || (t.value ? d(x) : o.value = x);
    },
    updateCurrentPaginationNumber: (x) => {
      o.value = x;
    }
  };
}
function pa(e, t, a, n) {
  var o;
  const l = y(() => !e.value && t.value.findIndex((r) => r === n.value) === -1 ? [n.value, ...t.value] : t.value), i = _(((o = a.value) == null ? void 0 : o.rowsPerPage) ?? n.value);
  return {
    rowsItemsComputed: l,
    // 計算後的每頁行數選項
    rowsPerPageRef: i,
    // 每頁行數
    updateRowsPerPage: (r) => {
      i.value = r;
    }
    // 更新每頁行數
  };
}
function ma(e, t, a) {
  const n = y({
    get: () => {
      if (e.value) {
        const { page: o, rowsPerPage: r, sortBy: u, sortType: s } = e.value;
        return { page: o, rowsPerPage: r, sortBy: u ?? null, sortType: s ?? null };
      }
      return null;
    },
    set: (o) => {
      a("update:serverOptions", o);
    }
  });
  return {
    serverOptionsComputed: n,
    updateServerOptionsPage: (o) => {
      n.value && (n.value = {
        ...n.value,
        page: o
      });
    },
    updateServerOptionsSort: (o, r) => {
      if (n.value)
        if (t.value && Array.isArray(n.value.sortBy) && Array.isArray(n.value.sortType)) {
          const u = n.value.sortBy.findIndex((s) => s === o);
          u === -1 && r !== null && (n.value.sortBy.push(o), n.value.sortType.push(r)), r === null ? (n.value.sortBy.splice(u, 1), n.value.sortType.splice(u, 1)) : n.value.sortType[u] = r;
        } else
          n.value = {
            ...n.value,
            sortBy: r !== null ? o : null,
            sortType: r
          };
    },
    updateServerOptionsRowsPerPage: (o) => {
      n.value && (n.value = {
        ...n.value,
        page: 1,
        rowsPerPage: o
      });
    }
  };
}
function va(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ha(e) {
  return e.comparison === "in";
}
function ba(e) {
  return typeof e.comparison == "function";
}
function ya(e) {
  return typeof e == "number" && !isNaN(e);
}
const zn = {
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
    let n = t;
    for (const l of a)
      if (n && typeof n == "object")
        n = n[l];
      else
        return "";
    return n ?? "";
  }
  return t[e] ?? "";
}
function wa(e, t) {
  const a = X(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const ut = 1e3, dt = /* @__PURE__ */ new WeakMap(), Te = (e) => {
  let t = dt.get(e);
  if (!t) {
    const { checkbox: a, index: n, ...l } = e;
    t = JSON.stringify(l), dt.set(e, t);
  }
  return t;
};
function xa(e, t, a, n) {
  const l = _({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  fe(t, (s) => {
    if (s === null) {
      l.value.selectedItems.clear(), l.value.itemsMap.clear();
      return;
    }
    const g = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
    for (const b of s) {
      const h = Te(b);
      g.add(h), v.set(h, b);
    }
    l.value.selectedItems = g, l.value.itemsMap = v;
  }, { immediate: !0, deep: !0 });
  const i = async (s, g, v) => new Promise((b) => {
    requestAnimationFrame(() => {
      const h = new Set(l.value.selectedItems), x = new Map(l.value.itemsMap);
      for (let B = 0; B < s.length; B++) {
        const $ = s[B], O = Te($);
        g ? (h.add(O), x.set(O, $)) : h.delete(O), l.value.processedCount = v + B + 1, l.value.visualProgress = l.value.processedCount / l.value.totalCount * 100;
      }
      l.value.selectedItems = h, l.value.itemsMap = x, b();
    });
  }), d = async (s) => {
    if (!l.value.selectionInProgress)
      try {
        if (l.value.selectionInProgress = !0, l.value.processedCount = 0, l.value.totalCount = e.value.length, l.value.visualProgress = 0, !s) {
          l.value.selectedItems.clear(), l.value.itemsMap.clear(), n("update:itemsSelected", []), l.value.visualProgress = 100;
          return;
        }
        const g = e.value;
        for (let v = 0; v < g.length; v += ut) {
          const h = g.slice(v, Math.min(v + ut, g.length)).filter((x) => !a(x));
          await i(h, s, v), await new Promise((x) => setTimeout(x, 0));
        }
        n("update:itemsSelected", r.value), s && n("selectAll");
      } finally {
        l.value.selectionInProgress = !1;
      }
  }, o = (s) => {
    const g = Te(s), v = { ...s };
    delete v.checkbox, delete v.index;
    const b = new Set(l.value.selectedItems), h = new Map(l.value.itemsMap);
    b.has(g) ? (b.delete(g), n("deselectRow", v)) : (b.add(g), h.set(g, v), n("selectRow", v)), l.value.selectedItems = b, l.value.itemsMap = h, n("update:itemsSelected", Array.from(h.values()).filter((B) => b.has(Te(B))));
  }, r = y(() => l.value.selectedItems.size === 0 ? [] : Array.from(l.value.itemsMap.entries()).filter(([s]) => l.value.selectedItems.has(s)).map(([, s]) => s)), u = y(() => l.value.visualProgress);
  return {
    selectedItems: r,
    toggleSelectAll: d,
    toggleSelectItem: o,
    isProcessing: y(() => l.value.selectionInProgress),
    selectionProgress: u
  };
}
function Pa(e, t, a, n, l, i, d, o, r, u, s, g) {
  const v = /* @__PURE__ */ new WeakMap(), b = (p) => {
    let k = v.get(p);
    return k || (typeof i.value == "string" && i.value !== "" ? k = String(X(i.value, p)) : Array.isArray(i.value) ? k = i.value.map((P) => String(X(P, p))).join(" ") : k = Object.values(p).map(String).join(" "), v.set(p, k)), k;
  }, h = y(() => {
    if (!a.value && d.value !== "") {
      const p = new RegExp(d.value, "i");
      return n.value.filter((k) => p.test(b(k)));
    }
    return n.value;
  }), x = (p, k) => {
    const P = ya(p) ? p : parseFloat(String(p));
    if (isNaN(P)) return !1;
    if (k.comparison === "between" && Array.isArray(k.criteria)) {
      const [ue, te] = k.criteria;
      return P >= ue && P <= te;
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
        return ba(P) ? P.comparison(F, P.criteria) : va(P) ? x(F, P) : ha(P) ? P.criteria.includes(F) : P.comparison === "=" ? F === P.criteria : F !== P.criteria;
      })
    ) : h.value;
  }), $ = (p, k, P) => p === k ? 0 : p == null ? 1 : k == null ? -1 : p < k ? P ? 1 : -1 : P ? -1 : 1, O = (p, k, P, F) => F < 0 ? p : O(p, k, P, F - 1).sort((ue, te) => {
    if (!k.slice(0, F).every((ve) => X(ve, ue) === X(ve, te))) return 0;
    const Q = k[F], Se = X(Q, ue), ae = X(Q, te);
    return $(Se, ae, P[F]);
  }), M = y(() => {
    if (a.value) return n.value;
    if (!e.value) return B.value;
    const { sortBy: p, sortDesc: k } = e.value, P = [...B.value];
    return r.value && Array.isArray(p) && Array.isArray(k) ? p.length ? O(P, p, k, p.length - 1) : P : P.sort((F, ue) => {
      const te = X(p, F), ke = X(p, ue);
      return $(te, ke, k);
    });
  }), Z = y(() => a.value ? o.value : M.value.length), H = y(() => a.value ? !1 : (a.value ? o.value : n.value.length) >= u.value), {
    selectedItems: ie,
    toggleSelectAll: ee,
    toggleSelectItem: we,
    isProcessing: xe,
    selectionProgress: Pe
  } = xa(M, l, s, g), V = y({
    get: () => l.value ?? [],
    set: (p) => {
      g("update:itemsSelected", p);
    }
  }), Ce = (p) => p.filter((k) => !s(k)), N = (p) => {
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
      if (!M.value.every((P) => s(P)))
        if (H.value) {
          g("updateSelectionStatus", !0);
          try {
            ee(p), g("update:itemsSelected", p ? Array.from(ie.value) : []), p && g("selectAll");
          } finally {
            g("updateSelectionStatus", !1);
          }
        } else
          N(p);
    },
    toggleSelectItem: (p) => {
      s(p) || (H.value ? we(p) : j(p));
    },
    isProcessing: y(() => H.value && xe.value),
    processProgress: Pe
  };
}
function Ca(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, qe = {}, Le = { exports: {} }, ct;
function ka() {
  if (ct) return Le.exports;
  ct = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Le.exports = t(), Le.exports.createColors = t, Le.exports;
}
var ft;
function Sa() {
  return ft || (ft = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(r, u) {
      for (var s in u) Object.defineProperty(r, s, {
        enumerable: !0,
        get: u[s]
      });
    }
    t(e, {
      dim: function() {
        return d;
      },
      default: function() {
        return o;
      }
    });
    const a = /* @__PURE__ */ n(/* @__PURE__ */ ka());
    function n(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    let l = /* @__PURE__ */ new Set();
    function i(r, u, s) {
      typeof process < "u" && process.env.JEST_WORKER_ID || s && l.has(s) || (s && l.add(s), console.warn(""), u.forEach((g) => console.warn(r, "-", g)));
    }
    function d(r) {
      return a.default.dim(r);
    }
    const o = {
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
function Ia() {
  return gt || (gt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const t = /* @__PURE__ */ a(Sa());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    function n({ version: i, from: d, to: o }) {
      t.default.warn(`${d}-color-renamed`, [
        `As of Tailwind CSS ${i}, \`${d}\` has been renamed to \`${o}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const l = {
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
        return n({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return n({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return n({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return n({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return n({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(je)), je;
}
var We, pt;
function $a() {
  if (pt) return We;
  pt = 1;
  let e = Ia();
  return We = (e.__esModule ? e : { default: e }).default, We;
}
var Ba = $a();
const se = /* @__PURE__ */ Ca(Ba), Ke = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, Na = (e) => {
  const t = mt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, n = 1 / 0;
  const l = Object.entries(se).reduce((i, [d, o]) => {
    if (typeof o == "object") {
      const r = d;
      Object.entries(Ke).forEach(([u, s]) => {
        o[s] && (i[o[s]] = { color: r, variant: u });
      });
    }
    return i;
  }, {});
  return Object.entries(l).forEach(([i, d]) => {
    const o = mt(i);
    if (!o) return;
    const r = Ra(t, o);
    r < n && (n = r, a = d);
  }), a;
}, Aa = (e, t) => {
  const a = Ke[t], n = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": se[e][a],
    "--theme-border": se[e][a],
    "--theme-hover": se[e][n],
    "--theme-active": se[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": se.gray[300],
    "--theme-light": se[e]["400"],
    "--theme-focus": se[e][a] + "80"
    // 添加 50% 透明度
  };
}, Fa = (e) => {
  const { color: t, variant: a = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? Na(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : se[t][Ke[a]],
    tailwindName: t,
    style: Aa(t, a)
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
function Ra(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const Ma = {}, Ta = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function La(e, t) {
  return m(), w("svg", Ta, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ea = /* @__PURE__ */ me(Ma, [["render", La]]), Da = {}, Oa = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ha(e, t) {
  return m(), w("svg", Oa, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const ja = /* @__PURE__ */ me(Da, [["render", Ha]]), qa = {}, Wa = { class: "px-3 py-1.5" };
function za(e, t) {
  return m(), w("span", Wa, t[0] || (t[0] = [
    C("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      C("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Ua = /* @__PURE__ */ me(qa, [["render", za]]), Va = {}, Ka = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ga(e, t) {
  return m(), w("svg", Ka, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ja = /* @__PURE__ */ me(Va, [["render", Ga]]), Ya = {}, Za = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Qa(e, t) {
  return m(), w("svg", Za, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Xa = /* @__PURE__ */ me(Ya, [["render", Qa]]), _a = /* @__PURE__ */ R({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, a) => (m(), w("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      W(Xa, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), en = ["checked", "disabled", "aria-checked"], tn = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, an = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, nn = /* @__PURE__ */ R({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = y(() => t.checked), n = y(() => t.partial), l = ye("themeClasses");
    return (i, d) => (m(), w("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !i.disabled && "cursor-pointer group",
        i.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: d[0] || (d[0] = Ve((o) => !i.disabled && i.$emit("change"), ["stop", "prevent"]))
    }, [
      C("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: i.disabled,
        "aria-checked": a.value
      }, null, 8, en),
      C("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          a.value && !n.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          n.value && [
            "bg-theme border-theme",
            !i.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !a.value && !n.value && [
            "border-gray-300 bg-white",
            !i.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !i.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: le(c(l).style)
      }, [
        ze((m(), w("svg", tn, d[1] || (d[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ue, a.value && !n.value]
        ]),
        ze((m(), w("svg", an, d[2] || (d[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ue, n.value]
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
    return (n, l) => (m(), U(nn, {
      checked: n.checked,
      disabled: n.disabled,
      partial: !1,
      onChange: l[0] || (l[0] = (i) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), sn = /* @__PURE__ */ R({
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
    const a = e, n = y(() => a.status === "allSelected"), l = y(() => a.status === "partSelected"), i = t;
    return (d, o) => (m(), U(yt, {
      checked: n.value,
      partial: l.value,
      disabled: e.disabled,
      onChange: o[0] || (o[0] = (r) => i("change", !n.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), rn = {
  key: 1,
  class: "items-center gap-2"
}, on = {
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
    const a = t, n = bt(), l = (d) => [
      `header-${d.value}`,
      `header-${d.value.toLowerCase()}`,
      "header"
    ].find((r) => n[r]) || "header", i = (d) => {
      d.sortable && d.sortType && a("headerClick", d);
    };
    return (d, o) => (m(), w("th", {
      style: le(e.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-300": e.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastFixedColumn
        },
        e.header.sortable && {
          "bg-gray-200": e.header.sortType === "none",
          "bg-gray-300": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
        },
        typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
      ]]),
      onClick: o[1] || (o[1] = Ve((r) => i(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (m(), U(sn, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: o[0] || (o[0] = (r) => d.$emit("toggleSelectAll", r))
      }, null, 8, ["disabled", "status"])) : (m(), w("div", rn, [
        I(d.$slots, l(e.header), q(re({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, z(e.header.text), 1)
        ]),
        e.header.sortable ? (m(), U(c(_a), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (m(), w("span", on, z(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), un = /* @__PURE__ */ R({
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
    const a = t, n = (i) => {
      a("headerClick", i);
    }, l = (i) => {
      a("toggleSelectAll", i);
    };
    return (i, d) => e.headers.length && !e.hideHeader ? (m(), w("thead", {
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
        (m(!0), w(oe, null, Y(e.headers, (o, r) => (m(), U(ln, {
          key: r,
          header: o,
          index: r,
          "fixed-distance": e.getFixedDistance(o.value),
          "last-fixed-column": e.lastFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: n,
          onToggleSelectAll: l
        }, pe({ _: 2 }, [
          Y(i.$slots, (u, s) => ({
            name: s,
            fn: G((g) => [
              I(i.$slots, s, J({ ref_for: !0 }, g))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), dn = /* @__PURE__ */ R({
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
    const a = e, n = t, l = y(() => a.isDisabled ?? !1), i = y(() => typeof a.bodyItemClassName == "function" ? a.bodyItemClassName(a.column, a.index) : a.bodyItemClassName), d = y(
      () => a.column === "expand" || a.column === a.expandColumn
    ), o = () => {
      d.value && a.expandColumn === "" && n("toggle-expand", event);
    }, r = (s) => {
      n("toggle-expand", s);
    }, u = () => {
      n("toggle-select");
    };
    return (s, g) => (m(), w("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": s.column === "expand" && s.expandColumn === "" },
        i.value
      ]]),
      style: le(s.style),
      onClick: o
    }, [
      s.column === "checkbox" ? (m(), w(oe, { key: 0 }, [
        s.column === "checkbox" ? I(s.$slots, "selection-checkbox", q(J({ key: 0 }, { item: s.item, index: s.index, isDisabled: l.value, toggleSelectItem: u })), () => [
          W(yt, {
            checked: !!s.item.checkbox,
            disabled: l.value,
            onChange: u
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : d.value ? I(s.$slots, "expand-button", q(J({ key: 1 }, { item: s.item, expanded: s.isExpanded, toggle: r })), () => [
        C("button", {
          onClick: Ve(r, ["stop"]),
          class: "inline-flex items-center"
        }, [
          W(c(Ja), {
            class: S({ "transform rotate-90": s.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(s.$slots, `item-${s.column}`, q(J({ key: 2 }, s.item)), () => [
        I(s.$slots, `item-${s.column.toLowerCase()}`, q(re(s.item)), () => [
          I(s.$slots, "item", q(re({ column: s.column, item: s.item })), () => [
            Ee(z(c(wa)(s.column, s.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), cn = /* @__PURE__ */ R({
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
    const a = e, n = t, l = y(() => typeof a.bodyRowClassName == "function" ? a.bodyRowClassName(a.item, a.index) : a.bodyRowClassName), i = (r) => {
      n("click", r, a.item, a.index);
    }, d = (r) => {
      n("dblclick", r, a.item, a.index);
    }, o = (r) => {
      n("contextmenu", r, a.item);
    };
    return (r, u) => (m(), w("tr", {
      class: S(["vdt-tbody-tr transition-colors border-t", [
        { "bg-white": r.alternating && r.index % 2 === 0 },
        { "bg-gray-50": !r.alternating || r.index % 2 === 1 },
        { "hover:bg-gray-100": !r.noHover },
        { "divide-x divide-gray-200": r.borderCell },
        l.value
      ]]),
      onClick: i,
      onDblclick: d,
      onContextmenu: o
    }, [
      I(r.$slots, "prepend"),
      (m(!0), w(oe, null, Y(r.columns, (s, g) => {
        var v;
        return m(), U(dn, {
          key: g,
          column: s,
          item: r.item,
          index: r.index,
          style: le((v = r.getFixedDistance) == null ? void 0 : v.call(r, s, "td")),
          "is-disabled": r.isDisabled,
          onToggleSelect: u[0] || (u[0] = () => r.$emit("toggle-select", r.item)),
          "expand-column": r.expandColumn,
          "is-expanded": r.isExpanded,
          onToggleExpand: u[1] || (u[1] = (b) => r.$emit("toggle-expand", b, r.index, r.item))
        }, pe({ _: 2 }, [
          Y(r.$slots, (b, h) => ({
            name: h,
            fn: G((x) => [
              I(r.$slots, h, J({ ref_for: !0 }, x))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded"]);
      }), 128)),
      I(r.$slots, "append")
    ], 34));
  }
}), fn = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, gn = /* @__PURE__ */ R({
  __name: "LoadingLine",
  setup(e) {
    const t = ye("themeClasses");
    return (a, n) => (m(), w("div", fn, [
      C("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: le({ backgroundColor: c(t).hex })
      }, null, 4)
    ]));
  }
}), pn = /* @__PURE__ */ me(gn, [["__scopeId", "data-v-cbdc3562"]]), mn = ["colspan"], vn = { class: "overflow-hidden" }, hn = /* @__PURE__ */ R({
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
    return (n, l) => (m(), w("tr", {
      class: S(["vdt-expand-row border-0", [a.value, { "bg-gray-50": (n.index + 1) % 2 === 0, "border-t": n.isExpanded }]])
    }, [
      C("td", {
        colspan: n.columnsCount,
        class: "relative p-0"
      }, [
        n.loading ? (m(), U(pn, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        C("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": n.isExpanded }]])
        }, [
          C("div", vn, [
            I(n.$slots, "default")
          ])
        ], 2)
      ], 8, mn)
    ], 2));
  }
}), bn = { class: "flex items-center gap-2 text-sm text-gray-700" }, yn = { class: "relative inline-block min-w-[70px]" }, wn = ["aria-expanded"], xn = { class: "block truncate" }, Pn = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, Cn = ["aria-selected", "onClick"], kn = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, Sn = /* @__PURE__ */ R({
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
    const a = e, n = t, l = _(!1), i = _(!1), d = y({
      get: () => a.modelValue,
      set: (v) => n("update:modelValue", v)
    }), o = ye("dataTable");
    fe(l, (v) => {
      if (v && (o != null && o.value)) {
        const b = window.innerHeight, h = o.value.getBoundingClientRect(), x = b - (h.height + h.top);
        i.value = x <= 100;
      }
    });
    const r = (v) => {
      d.value = v, l.value = !1;
    }, u = () => {
      l.value = !l.value;
    }, s = (v) => {
      v.target.closest(".relative") || (l.value = !1);
    }, g = (v) => {
      const b = v.relatedTarget;
      b != null && b.closest(".relative") || (l.value = !1);
    };
    return ht(() => {
      document.addEventListener("click", s);
    }), Vt(() => {
      document.removeEventListener("click", s);
    }), (v, b) => (m(), w("div", bn, [
      Ee(z(e.message) + " ", 1),
      C("div", yn, [
        C("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            l.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: u,
          "aria-haspopup": "listbox",
          "aria-expanded": l.value
        }, [
          C("span", xn, z(d.value), 1),
          C("span", Pn, [
            (m(), w("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": l.value }]),
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
        ], 10, wn),
        W(Kt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: G(() => [
            l.value ? (m(), w("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": i.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: g
            }, [
              (m(!0), w(oe, null, Y(e.rowsItems, (h) => (m(), w("li", {
                key: h,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  h === d.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": h === d.value,
                onClick: (x) => r(h)
              }, [
                C("span", {
                  class: S(["block", { "font-medium": h === d.value }])
                }, z(h), 3),
                h === d.value ? (m(), w("span", kn, b[1] || (b[1] = [
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
              ], 10, Cn))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), In = { class: "text-sm text-gray-700" }, $n = /* @__PURE__ */ R({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, a) => (m(), w("div", In, [
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
}), Bn = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Nn = ["disabled"], An = ["disabled"], vt = /* @__PURE__ */ R({
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
    return (n, l) => (m(), w("div", Bn, [
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
        onClick: l[0] || (l[0] = (i) => a("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        W(c(ja), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Nn),
      I(n.$slots, "buttonsPagination"),
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
        onClick: l[1] || (l[1] = (i) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        W(c(Ea), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, An)
    ]));
  }
}), Fn = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Rn = ["onClick"], ge = 7, Mn = /* @__PURE__ */ R({
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
    const a = e, n = t, l = ye("themeClasses"), i = (o) => {
      o.type === "button" && !o.active && n("updatePage", o.page);
    }, d = y(() => {
      const o = [], { maxPaginationNumber: r, currentPaginationNumber: u } = a;
      if (r <= ge) {
        for (let s = 1; s <= r; s += 1)
          o.push({
            type: "button",
            page: s,
            active: s === u,
            activePrev: s + 1 === u
          });
        return o;
      }
      if ([1, 2, r, r - 1].includes(u))
        for (let s = 1; s <= ge; s += 1)
          if (s <= 3)
            o.push({
              type: "button",
              page: s,
              active: s === u,
              activePrev: s + 1 === u
            });
          else if (s === 4)
            o.push({ type: "omission" });
          else {
            const g = r - (ge - s);
            o.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let s = 1; s <= ge; s += 1)
          s <= 5 ? o.push({
            type: "button",
            page: s,
            active: s === u,
            activePrev: s + 1 === u
          }) : s === 6 ? o.push({ type: "omission" }) : o.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(u))
        for (let s = 1; s <= ge; s += 1)
          if (s === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (s === 2)
            o.push({ type: "omission" });
          else {
            const g = r - (ge - s);
            o.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else
        for (let s = 1; s <= ge; s += 1)
          if (s === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (s === 2 || s === 6)
            o.push({ type: "omission" });
          else if (s === 7)
            o.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: !1
            });
          else {
            const g = 4 - s, v = u - g;
            o.push({
              type: "button",
              page: v,
              active: v === u,
              activePrev: v + 1 === u
            });
          }
      return o;
    });
    return (o, r) => (m(), w("div", Fn, [
      (m(!0), w(oe, null, Y(d.value, (u, s) => (m(), w("div", {
        key: s,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          s === 0 && "rounded-l-md",
          // Last item styles
          s === d.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              c(l).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${c(l).tailwindName}-500`,
              `focus:border-${c(l).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            s !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            s !== 0 && "-ml-px"
          ]
        ]]),
        style: le(c(l).style),
        onClick: (g) => i(u)
      }, [
        u.type === "button" ? (m(), w("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, z(u.page), 3)) : (m(), U(c(Ua), { key: 1 }))
      ], 14, Rn))), 128))
    ]));
  }
}), Tn = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Ln = /* @__PURE__ */ R({
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
    const a = e, n = t, l = y(() => ({
      isFirstPage: a.isFirstPage,
      isLastPage: a.isLastPage,
      currentPaginationNumber: a.currentPaginationNumber,
      maxPaginationNumber: a.maxPaginationNumber,
      nextPage: () => n("nextPage"),
      prevPage: () => n("prevPage"),
      updatePage: (i) => n("updatePage", i)
    }));
    return (i, d) => i.hideFooter ? D("", !0) : (m(), w("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-sm": i.showShadow }, i.footerClassName]])
    }, [
      W(vt, {
        "is-first-page": i.isFirstPage,
        "is-last-page": i.isLastPage,
        onClickNextPage: d[0] || (d[0] = () => n("nextPage")),
        onClickPrevPage: d[1] || (d[1] = () => n("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: G(() => d[6] || (d[6] = [
          C("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      C("div", Tn, [
        i.hideRowsPerPage ? D("", !0) : (m(), U(Sn, {
          key: 0,
          "model-value": i.rowsPerPage,
          "rows-items": i.rowsItems,
          message: i.rowsPerPageMessage,
          "onUpdate:modelValue": d[2] || (d[2] = (o) => n("update:rowsPerPage", o))
        }, null, 8, ["model-value", "rows-items", "message"])),
        i.hidePaginationInfo ? D("", !0) : (m(), U($n, {
          key: 1,
          "current-page-first-index": i.currentPageFirstIndex,
          "current-page-last-index": i.currentPageLastIndex,
          "total-items-length": i.totalItemsLength,
          "rows-of-page-separator-message": i.rowsOfPageSeparatorMessage
        }, pe({ _: 2 }, [
          i.$slots["pagination-info"] ? {
            name: "default",
            fn: G((o) => [
              I(i.$slots, "pagination-info", q(re(o)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        i.$slots.pagination ? I(i.$slots, "pagination", q(J({ key: 2 }, l.value))) : (m(), U(vt, {
          key: 3,
          "is-first-page": i.isFirstPage,
          "is-last-page": i.isLastPage,
          onClickNextPage: d[4] || (d[4] = () => n("nextPage")),
          onClickPrevPage: d[5] || (d[5] = () => n("prevPage"))
        }, pe({ _: 2 }, [
          i.buttonsPagination ? {
            name: "buttonsPagination",
            fn: G(() => [
              W(Mn, {
                "current-pagination-number": i.currentPaginationNumber,
                "max-pagination-number": i.maxPaginationNumber,
                onUpdatePage: d[3] || (d[3] = (o) => n("updatePage", o))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), En = ["id"], Dn = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, On = { class: "relative z-10" }, Hn = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, wt = /* @__PURE__ */ R({
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
  setup(e, { expose: t, emit: a }) {
    const n = e, {
      checkboxColumnWidth: l,
      expandColumnWidth: i,
      indexColumnWidth: d,
      rowsItems: o,
      showIndexSymbol: r,
      currentPage: u,
      filterOptions: s,
      headers: g,
      itemsSelected: v,
      loading: b,
      items: h,
      rowsPerPage: x,
      searchField: B,
      searchValue: $,
      serverItemsLength: O,
      showIndex: M,
      sortBy: Z,
      sortType: H,
      serverOptions: ie,
      multiSort: ee,
      mustSort: we,
      clickEventType: xe,
      clickRowToExpand: Pe,
      clickRowToSelect: V,
      fixedExpand: Ce,
      fixedCheckbox: N,
      fixedIndex: j,
      batchSelectionThreshold: L,
      expandColumn: E
    } = Gt(n), p = y(() => Fa(n.theme));
    it("themeClasses", p);
    const k = bt(), P = y(() => !!k.expand), F = y(() => !!k.body), ue = y(
      () => typeof n.expandTransition < "u" ? n.expandTransition : P.value
    ), te = _(null), ke = _(null);
    it("dataTable", te);
    const Q = a, Se = y(() => v.value !== null), ae = y(() => ie.value !== null), {
      serverOptionsComputed: ve,
      updateServerOptionsPage: xt,
      updateServerOptionsSort: Pt,
      updateServerOptionsRowsPerPage: Ct
    } = ma(
      ie,
      ee,
      Q
    ), {
      clientSortOptions: Ge,
      headerColumns: Je,
      headersForRender: he,
      updateSortField: kt,
      isMultiSorting: St,
      getMultiSortNumber: It
    } = oa(
      r,
      l,
      i,
      N,
      Ce,
      j,
      g,
      P,
      d,
      Se,
      ae,
      we,
      ve,
      M,
      Z,
      H,
      ee,
      E,
      Pt,
      Q
    ), {
      rowsItemsComputed: Ye,
      rowsPerPageRef: be,
      updateRowsPerPage: Ze
    } = pa(
      ae,
      o,
      ie,
      x
    ), {
      totalItems: Qe,
      selectItemsComputed: $t,
      totalItemsLength: $e,
      toggleSelectAll: Bt,
      toggleSelectItem: Xe,
      isProcessing: Nt,
      processProgress: At
    } = Pa(
      Ge,
      s,
      ae,
      h,
      v,
      B,
      $,
      O,
      ee,
      L,
      n.disabledRows,
      Q
    ), {
      currentPaginationNumber: de,
      maxPaginationNumber: Be,
      isLastPage: Ne,
      isFirstPage: Ae,
      nextPage: Fe,
      prevPage: Re,
      updatePage: Ie,
      updateCurrentPaginationNumber: Ft
    } = ga(
      u,
      ae,
      b,
      $e,
      be,
      ie,
      xt
    ), {
      currentPageFirstIndex: _e,
      currentPageLastIndex: et,
      multipleSelectStatus: Rt,
      pageItems: ce
    } = fa(
      de,
      Se,
      ae,
      h,
      be,
      $t,
      M,
      Qe,
      $e,
      n.disabledRows
    ), Me = y(() => de.value === 0 ? 0 : (de.value - 1) * be.value), {
      expandingItemIndexList: De,
      updateExpandingItemIndexList: tt,
      clearExpandingItemIndexList: at
    } = sa(
      ce,
      Me,
      Q
    ), {
      fixedHeaders: nt,
      lastFixedColumn: st,
      fixedColumnsInfos: Mt,
      showShadow: rt
    } = ra(
      he,
      ke
    ), Tt = (f) => {
      const ne = f.width ?? (nt.value.length ? 100 : null);
      if (ne) return `width: ${ne}px; min-width: ${ne}px;`;
    }, ot = (f, ne = "th") => {
      if (!nt.value.length) return;
      const A = Mt.value.find((T) => T.value === f);
      if (A)
        return `
            left: ${A.distance}px;
            z-index: ${ne === "th" ? 3 : 1};
            position: sticky;
            background-color: ${ne === "th" ? "none" : "inherit"};
            ${A.value === st.value ? `
                box-shadow: 4px 0 6px -2px rgba(0, 0, 0, 0.1);
                clip-path: inset(0px -10px 0px 0px);
            ` : ""}
            isolation: isolate;
        `;
    }, Lt = (f) => {
      f.sortable && f.sortType && kt(f.value, f.sortType);
    }, Oe = (f) => typeof n.disabledRows == "function" ? n.disabledRows(f) : !1, Et = y(() => ce.value.every((f) => n.disabledRows(f))), Dt = (f) => {
      Oe(f) || Xe(f);
    }, {
      handleRowClick: Ot,
      handleRowDoubleClick: Ht,
      handleRowContextMenu: jt
    } = na(
      xe,
      Se,
      M,
      Oe,
      Pe,
      V,
      tt,
      Xe,
      Q
    );
    return fe(b, (f, ne) => {
      ve.value && f === !1 && ne === !0 && (Ft(ve.value.page), at());
    }), fe(be, (f) => {
      ae.value ? Ct(f) : Ie(1);
    }), fe([$, s], () => {
      ae.value || Ie(1);
    }), fe([de, Ge, B, $, s], () => {
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
      updatePage: Ie,
      rowsPerPageOptions: Ye,
      rowsPerPageActiveOption: be,
      updateRowsPerPageActiveOption: Ze
    }), (f, ne) => (m(), w("div", {
      ref_key: "tableWrapper",
      ref: te,
      class: S(["vdt-table-wrapper relative w-full", [f.wrapperClassName]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: ke,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-sm": c(rt) }, f.containerClassName]])
      }, [
        C("table", {
          id: f.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [f.tableClassName]])
        }, [
          C("colgroup", null, [
            (m(!0), w(oe, null, Y(c(he), (A, T) => (m(), w("col", {
              key: T,
              style: le(Tt(A))
            }, null, 4))), 128))
          ]),
          c(k)["customize-headers"] ? I(f.$slots, "customize-headers", { key: 0 }) : D("", !0),
          W(un, J({
            headers: c(he),
            hideHeader: f.hideHeader,
            fixedHeader: f.fixedHeader,
            headerClassName: f.headerClassName,
            borderCell: f.borderCell,
            lastFixedColumn: c(st),
            headerItemClassName: f.headerItemClassName,
            areAllVisibleRowsDisabled: Et.value,
            multipleSelectStatus: c(Rt),
            multiSort: c(ee)
          }, {
            "is-multi-sorting": c(St),
            "get-multi-sort-number": c(It),
            "get-fixed-distance": ot,
            onHeaderClick: Lt,
            onToggleSelectAll: c(Bt)
          }), pe({ _: 2 }, [
            Y(f.$slots, (A, T) => ({
              name: T,
              fn: G((K) => [
                I(f.$slots, T, q(re(K)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          F.value ? I(f.$slots, "body", q(J({ key: 1 }, c(ce)))) : c(Je).length ? (m(), w("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [f.bodyClassName]])
          }, [
            I(f.$slots, "body-prepend", q(re({
              items: c(ce),
              pagination: { isFirstPage: c(Ae), isLastPage: c(Ne), currentPaginationNumber: c(de), maxPaginationNumber: c(Be), nextPage: c(Fe), prevPage: c(Re) },
              headers: c(he)
            }))),
            (m(!0), w(oe, null, Y(c(ce), (A, T) => (m(), w(oe, {
              key: A.key || T
            }, [
              W(cn, {
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
                "get-fixed-distance": ot,
                onClick: (K) => c(Ot)(K, A, T),
                onDblclick: (K) => c(Ht)(K, A, T),
                onContextmenu: (K) => c(jt)(K, A),
                onToggleExpand: (K) => c(tt)(T, A, K),
                onToggleSelect: (K) => Dt(A)
              }, pe({ _: 2 }, [
                Y(f.$slots, (K, lt) => ({
                  name: lt,
                  fn: G((qt) => [
                    I(f.$slots, lt, J({ ref_for: !0 }, qt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ue.value || c(De).includes(T + Me.value) ? (m(), U(hn, {
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
            I(f.$slots, "body-append", q(re({
              items: c(ce),
              pagination: { isFirstPage: c(Ae), isLastPage: c(Ne), currentPaginationNumber: c(de), maxPaginationNumber: c(Be), nextPage: c(Fe), prevPage: c(Re), updatePage: c(Ie) },
              headers: c(he)
            })))
          ], 2)) : D("", !0)
        ], 10, En),
        c(b) ? (m(), w("div", Dn, [
          C("div", On, [
            I(f.$slots, "loading", {}, () => [
              W(Zt)
            ])
          ])
        ])) : D("", !0),
        !c(ce).length && !c(b) ? (m(), w("div", Hn, [
          I(f.$slots, "empty-message", {}, () => [
            Ee(z(f.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      W(Ln, J({
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
        onUpdatePage: c(Ie)
      }), pe({ _: 2 }, [
        f.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: G((A) => [
            I(f.$slots, "pagination-info", q(re(A)))
          ]),
          key: "0"
        } : void 0,
        f.$slots.pagination ? {
          name: "pagination",
          fn: G((A) => [
            I(f.$slots, "pagination", q(re(A)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      ze(W(aa, { progress: c(At) }, null, 8, ["progress"]), [
        [Ue, c(Nt)]
      ])
    ], 2));
  }
}), jn = (e) => {
  e.component("DataTable", wt);
};
wt.install = jn;
export {
  zn as createFilter,
  wt as default,
  jn as install
};
