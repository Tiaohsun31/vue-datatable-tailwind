var Wt = Object.defineProperty;
var Ut = (e, t, a) => t in e ? Wt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var je = (e, t, a) => Ut(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as M, inject as xe, createElementBlock as x, openBlock as m, Fragment as oe, renderList as Z, createElementVNode as C, normalizeStyle as ie, normalizeClass as S, unref as c, toDisplayString as U, ref as ee, computed as y, onMounted as bt, onUnmounted as Vt, watch as ge, createVNode as W, withModifiers as Ke, withDirectives as Ue, vShow as Ve, createBlock as V, useSlots as yt, renderSlot as I, createCommentVNode as O, normalizeProps as z, guardReactiveProps as le, createSlots as me, withCtx as J, mergeProps as Y, createTextVNode as De, onBeforeUnmount as Kt, Transition as Gt, toRefs as Jt, provide as ut } from "vue";
const Yt = { class: "inline-flex relative w-[60px] h-[60px]" }, Zt = /* @__PURE__ */ M({
  __name: "Loading",
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (m(), x("div", Yt, [
      (m(), x(oe, null, Z(4, (o) => C("div", {
        key: o,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(o - 1) * 150}`]]),
        style: ie({
          borderTopColor: c(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), ve = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, o] of t)
    a[n] = o;
  return a;
}, Qt = /* @__PURE__ */ ve(Zt, [["__scopeId", "data-v-e9a27991"]]), Xt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, _t = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, ea = { class: "w-64" }, ta = { class: "h-2 bg-gray-200 rounded" }, aa = { class: "text-center text-sm text-gray-600" }, na = /* @__PURE__ */ M({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (m(), x("div", Xt, [
      C("div", _t, [
        n[0] || (n[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", ea, [
          C("div", ta, [
            C("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ie({ width: `${a.progress}%`, backgroundColor: c(t).hex })
            }, null, 4)
          ])
        ]),
        C("div", aa, U(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function sa(e, t, a, n, o, i, d, l, r) {
  const u = (b, h) => {
    const w = { ...b };
    return t.value && (delete w.checkbox, w.isSelected = b.checkbox), a.value && (delete w.index, w.indexInCurrentPage = h + 1), w;
  };
  return {
    handleRowClick: (b, h, w) => {
      if (!b.target.closest(".checkbox, .expand-button") && (o.value && d(w, h, b), i.value && !n(h) && l(h), e.value === "single")) {
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
function ra(e, t, a) {
  const n = ee([]);
  return {
    expandingItemIndexList: n,
    // 展開項的索引列表
    updateExpandingItemIndexList: (d, l, r) => {
      r.stopPropagation();
      const u = n.value.indexOf(d);
      if (u !== -1)
        n.value.splice(u, 1);
      else {
        const s = e.value.findIndex((g) => JSON.stringify(g) === JSON.stringify(l));
        a("expandRow", t.value + s, l), n.value.push(t.value + s);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      n.value = [];
    }
    // 清空展開列表的方法
  };
}
function la(e, t) {
  const a = y(() => e.value.filter((l) => l.fixed)), n = y(() => a.value.length ? a.value[a.value.length - 1].value : ""), o = y(() => {
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
      distance: u === 0 ? 0 : l.reduce((s, g, v) => v < u ? s + g : s, 0)
    }));
  }), i = ee(!1);
  let d = null;
  return bt(() => {
    const l = t.value;
    if (l) {
      const r = () => {
        i.value = l.scrollLeft > 0;
      };
      r(), l.addEventListener("scroll", r), d = () => {
        l.removeEventListener("scroll", r);
      };
    }
  }), Vt(() => {
    d && (d(), d = null);
  }), {
    fixedHeaders: a,
    lastFixedColumn: n,
    fixedColumnsInfos: o,
    showShadow: i
  };
}
function oa(e, t, a, n, o, i, d, l, r, u, s, g, v, b, h, w, B, $, H, T) {
  const Q = y(() => d.value.length ? {
    hasFixedColumns: d.value.some((N) => N.fixed),
    fixedHeaders: d.value.filter((N) => N.fixed),
    unFixedHeaders: d.value.filter((N) => !N.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), j = ee(
    ia(h.value, w.value, B.value)
  ), { determineHeaderSortState: ue } = ca(s, v, B, j), te = y(() => {
    const { fixedHeaders: N, unFixedHeaders: q } = Q.value, E = [...N, ...q].map((D) => ({
      ...D,
      sortType: D.sortable ? ue(D.value) : void 0
    }));
    return [
      ...Object.values(we.value).filter(Boolean),
      ...E
    ];
  }), we = y(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: n.value || Q.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: b.value && {
      text: e.value,
      value: "index",
      fixed: i.value || Q.value.hasFixedColumns,
      width: r.value
    },
    expand: l.value && !$.value && {
      text: "",
      value: "expand",
      fixed: o.value || Q.value.hasFixedColumns,
      width: a.value
    }
  })), Pe = y(
    () => te.value.map((N) => N.value)
  ), Ce = (N, q) => {
    const E = q === "none" ? "asc" : q === "asc" ? "desc" : g.value ? "asc" : null;
    if (s.value) {
      H(N, E);
      return;
    }
    const D = B.value ? ua(N, E, j.value) : da(N, E);
    j.value = D, T("updateSort", { sortType: E, sortBy: N });
  }, K = y(() => (N) => {
    var E, D;
    const q = s.value ? (E = v.value) == null ? void 0 : E.sortBy : (D = j.value) == null ? void 0 : D.sortBy;
    return Array.isArray(q) && q.includes(N);
  }), ke = y(() => (N) => {
    var E, D;
    const q = s.value ? (E = v.value) == null ? void 0 : E.sortBy : (D = j.value) == null ? void 0 : D.sortBy;
    return Array.isArray(q) ? q.indexOf(N) + 1 : !1;
  });
  return {
    clientSortOptions: j,
    headerColumns: Pe,
    headersForRender: te,
    updateSortField: Ce,
    isMultiSorting: K,
    getMultiSortNumber: ke
  };
}
function ia(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((n) => n === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const ua = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const n = a.sortBy.indexOf(e), o = [...a.sortBy], i = [...a.sortDesc];
  return n === -1 && t !== null ? (o.push(e), i.push(t === "desc")) : t === null ? (o.splice(n, 1), i.splice(n, 1)) : i[n] = t === "desc", { sortBy: o, sortDesc: i };
}, da = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function ca(e, t, a, n) {
  const o = (l) => !e.value || !t.value ? i(l) : d(l), i = (l) => {
    if (!n.value) return "none";
    const { sortBy: r, sortDesc: u } = n.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const s = r.indexOf(l);
      return s !== -1 ? u[s] ? "desc" : "asc" : "none";
    }
    return l === r ? u ? "desc" : "asc" : "none";
  }, d = (l) => {
    const { sortBy: r, sortType: u } = t.value;
    if (a.value && Array.isArray(r) && Array.isArray(u)) {
      const s = r.indexOf(l);
      return s !== -1 ? u[s] : "none";
    }
    return l === r && u ? u : "none";
  };
  return {
    determineHeaderSortState: o
  };
}
class fa {
  constructor() {
    je(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    je(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: n, index: o, ...i } = t;
      a = Object.entries(i).sort(([d], [l]) => d.localeCompare(l)).map(([d, l]) => `${d}:${l}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ga(e, t, a, n, o, i, d, l, r, u) {
  const s = new fa(), g = y(
    () => (e.value - 1) * o.value + 1
  ), v = y(() => a.value ? Math.min(
    r.value,
    e.value * o.value
  ) : Math.min(
    l.value.length,
    e.value * o.value
  )), b = y(() => a.value ? n.value : l.value.slice(
    g.value - 1,
    v.value
  )), h = y(() => d.value ? b.value.map(($, H) => ({
    index: g.value + H,
    ...$
  })) : b.value), w = y(() => {
    if (i.value.length === 0)
      return "noneSelected";
    const $ = u ? l.value.filter((T) => !u(T)) : l.value;
    return i.value.length === $.length && i.value.every(
      (Q) => $.some(
        (j) => s.getItemKey(Q) === s.getItemKey(j)
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
            (T) => s.getItemKey($) === s.getItemKey(T)
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
function pa(e, t, a, n, o, i, d) {
  const l = ee(i.value ? i.value.page : e.value), r = y(() => Math.ceil(n.value / o.value)), u = y(() => r.value === 0 || l.value === r.value), s = y(() => l.value === 1);
  return {
    currentPaginationNumber: l,
    maxPaginationNumber: r,
    isLastPage: u,
    isFirstPage: s,
    nextPage: () => {
      if (n.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const w = l.value + 1;
          d(w);
        } else
          l.value += 1;
    },
    prevPage: () => {
      if (n.value !== 0 && !s.value && !a.value)
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
function ma(e, t, a, n) {
  var l;
  const o = y(() => !e.value && t.value.findIndex((r) => r === n.value) === -1 ? [n.value, ...t.value] : t.value), i = ee(((l = a.value) == null ? void 0 : l.rowsPerPage) ?? n.value);
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
function va(e, t, a) {
  const n = y({
    get: () => {
      if (e.value) {
        const { page: l, rowsPerPage: r, sortBy: u, sortType: s } = e.value;
        return { page: l, rowsPerPage: r, sortBy: u ?? null, sortType: s ?? null };
      }
      return null;
    },
    set: (l) => {
      a("update:serverOptions", l);
    }
  });
  return {
    serverOptionsComputed: n,
    updateServerOptionsPage: (l) => {
      n.value && (n.value = {
        ...n.value,
        page: l
      });
    },
    updateServerOptionsSort: (l, r) => {
      if (n.value)
        if (t.value && Array.isArray(n.value.sortBy) && Array.isArray(n.value.sortType)) {
          const u = n.value.sortBy.findIndex((s) => s === l);
          u === -1 && r !== null && (n.value.sortBy.push(l), n.value.sortType.push(r)), r === null ? (n.value.sortBy.splice(u, 1), n.value.sortType.splice(u, 1)) : n.value.sortType[u] = r;
        } else
          n.value = {
            ...n.value,
            sortBy: r !== null ? l : null,
            sortType: r
          };
    },
    updateServerOptionsRowsPerPage: (l) => {
      n.value && (n.value = {
        ...n.value,
        page: 1,
        rowsPerPage: l
      });
    }
  };
}
function ha(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ba(e) {
  return e.comparison === "in";
}
function ya(e) {
  return typeof e.comparison == "function";
}
function xa(e) {
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
function _(e, t) {
  if (e.includes(".")) {
    const a = e.split(".");
    let n = t;
    for (const o of a)
      if (n && typeof n == "object")
        n = n[o];
      else
        return "";
    return n ?? "";
  }
  return t[e] ?? "";
}
function wa(e, t) {
  const a = _(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const dt = 1e3, ct = /* @__PURE__ */ new WeakMap(), Le = (e) => {
  let t = ct.get(e);
  if (!t) {
    const { checkbox: a, index: n, ...o } = e;
    t = JSON.stringify(o), ct.set(e, t);
  }
  return t;
};
function Pa(e, t, a, n) {
  const o = ee({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  ge(t, (s) => {
    if (s === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const g = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
    for (const b of s) {
      const h = Le(b);
      g.add(h), v.set(h, b);
    }
    o.value.selectedItems = g, o.value.itemsMap = v;
  }, { immediate: !0, deep: !0 });
  const i = async (s, g, v) => new Promise((b) => {
    requestAnimationFrame(() => {
      const h = new Set(o.value.selectedItems), w = new Map(o.value.itemsMap);
      for (let B = 0; B < s.length; B++) {
        const $ = s[B], H = Le($);
        g ? (h.add(H), w.set(H, $)) : h.delete(H), o.value.processedCount = v + B + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = h, o.value.itemsMap = w, b();
    });
  }), d = async (s) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = e.value.length, o.value.visualProgress = 0, !s) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), n("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const g = e.value;
        for (let v = 0; v < g.length; v += dt) {
          const h = g.slice(v, Math.min(v + dt, g.length)).filter((w) => !a(w));
          await i(h, s, v), await new Promise((w) => setTimeout(w, 0));
        }
        n("update:itemsSelected", r.value), s && n("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, l = (s) => {
    const g = Le(s), v = { ...s };
    delete v.checkbox, delete v.index;
    const b = new Set(o.value.selectedItems), h = new Map(o.value.itemsMap);
    b.has(g) ? (b.delete(g), n("deselectRow", v)) : (b.add(g), h.set(g, v), n("selectRow", v)), o.value.selectedItems = b, o.value.itemsMap = h, n("update:itemsSelected", Array.from(h.values()).filter((B) => b.has(Le(B))));
  }, r = y(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([s]) => o.value.selectedItems.has(s)).map(([, s]) => s)), u = y(() => o.value.visualProgress);
  return {
    selectedItems: r,
    toggleSelectAll: d,
    toggleSelectItem: l,
    isProcessing: y(() => o.value.selectionInProgress),
    selectionProgress: u
  };
}
function Ca(e, t, a, n, o, i, d, l, r, u, s, g) {
  const v = /* @__PURE__ */ new WeakMap(), b = (p) => {
    let k = v.get(p);
    return k || (typeof i.value == "string" && i.value !== "" ? k = String(_(i.value, p)) : Array.isArray(i.value) ? k = i.value.map((P) => String(_(P, p))).join(" ") : k = Object.values(p).map(String).join(" "), v.set(p, k)), k;
  }, h = y(() => {
    if (!a.value && d.value !== "") {
      const p = new RegExp(d.value, "i");
      return n.value.filter((k) => p.test(b(k)));
    }
    return n.value;
  }), w = (p, k) => {
    const P = xa(p) ? p : parseFloat(String(p));
    if (isNaN(P)) return !1;
    if (k.comparison === "between" && Array.isArray(k.criteria)) {
      const [de, ae] = k.criteria;
      return P >= de && P <= ae;
    }
    const R = k.criteria;
    switch (k.comparison) {
      case ">":
        return P > R;
      case ">=":
        return P >= R;
      case "<":
        return P < R;
      case "<=":
        return P <= R;
      default:
        return !1;
    }
  }, B = y(() => {
    var p;
    return (p = t.value) != null && p.length ? h.value.filter(
      (k) => t.value.every((P) => {
        const R = _(P.field, k);
        return ya(P) ? P.comparison(R, P.criteria) : ha(P) ? w(R, P) : ba(P) ? P.criteria.includes(R) : P.comparison === "=" ? R === P.criteria : R !== P.criteria;
      })
    ) : h.value;
  }), $ = (p, k, P) => p === k ? 0 : p == null ? 1 : k == null ? -1 : p < k ? P ? 1 : -1 : P ? -1 : 1, H = (p, k, P, R) => R < 0 ? p : H(p, k, P, R - 1).sort((de, ae) => {
    if (!k.slice(0, R).every((he) => _(he, de) === _(he, ae))) return 0;
    const X = k[R], Ie = _(X, de), ne = _(X, ae);
    return $(Ie, ne, P[R]);
  }), T = y(() => {
    if (a.value) return n.value;
    if (!e.value) return B.value;
    const { sortBy: p, sortDesc: k } = e.value, P = [...B.value];
    return r.value && Array.isArray(p) && Array.isArray(k) ? p.length ? H(P, p, k, p.length - 1) : P : P.sort((R, de) => {
      const ae = _(p, R), Se = _(p, de);
      return $(ae, Se, k);
    });
  }), Q = y(() => a.value ? l.value : T.value.length), j = y(() => a.value ? !1 : (a.value ? l.value : n.value.length) >= u.value), {
    selectedItems: ue,
    toggleSelectAll: te,
    toggleSelectItem: we,
    isProcessing: Pe,
    selectionProgress: Ce
  } = Pa(T, o, s, g), K = y({
    get: () => o.value ?? [],
    set: (p) => {
      g("update:itemsSelected", p);
    }
  }), ke = (p) => p.filter((k) => !s(k)), N = (p) => {
    K.value = p ? ke(T.value) : K.value = [], p && g("selectAll");
  }, q = (p) => {
    const k = p.checkbox;
    if (delete p.checkbox, delete p.index, k)
      K.value = K.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(p)
      ), g("deselectRow", p);
    else {
      const P = K.value;
      P.unshift(p), K.value = P, g("selectRow", p);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: K,
    totalItemsLength: Q,
    toggleSelectAll: (p) => {
      if (!T.value.every((P) => s(P)))
        if (j.value) {
          g("updateSelectionStatus", !0);
          try {
            te(p), g("update:itemsSelected", p ? Array.from(ue.value) : []), p && g("selectAll");
          } finally {
            g("updateSelectionStatus", !1);
          }
        } else
          N(p);
    },
    toggleSelectItem: (p) => {
      s(p) || (j.value ? we(p) : q(p));
    },
    isProcessing: y(() => j.value && Pe.value),
    processProgress: Ce
  };
}
var qe = {}, ze = {}, Ee = { exports: {} }, ft;
function ka() {
  if (ft) return Ee.exports;
  ft = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Ee.exports = t(), Ee.exports.createColors = t, Ee.exports;
}
var gt;
function Sa() {
  return gt || (gt = 1, function(e) {
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
        return l;
      }
    });
    const a = /* @__PURE__ */ n(/* @__PURE__ */ ka());
    function n(r) {
      return r && r.__esModule ? r : {
        default: r
      };
    }
    let o = /* @__PURE__ */ new Set();
    function i(r, u, s) {
      typeof process < "u" && process.env.JEST_WORKER_ID || s && o.has(s) || (s && o.add(s), console.warn(""), u.forEach((g) => console.warn(r, "-", g)));
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
  }(ze)), ze;
}
var pt;
function Ia() {
  return pt || (pt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = /* @__PURE__ */ a(Sa());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    function n({ version: i, from: d, to: l }) {
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
  }(qe)), qe;
}
var We, mt;
function $a() {
  if (mt) return We;
  mt = 1;
  let e = Ia();
  return We = (e.__esModule ? e : { default: e }).default, We;
}
var F = $a();
const re = {
  slate: F.slate,
  gray: F.gray,
  zinc: F.zinc,
  neutral: F.neutral,
  stone: F.stone,
  red: F.red,
  orange: F.orange,
  amber: F.amber,
  yellow: F.yellow,
  lime: F.lime,
  green: F.green,
  emerald: F.emerald,
  teal: F.teal,
  cyan: F.cyan,
  sky: F.sky,
  blue: F.blue,
  indigo: F.indigo,
  violet: F.violet,
  purple: F.purple,
  fuchsia: F.fuchsia,
  pink: F.pink,
  rose: F.rose
}, Ge = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, Ba = (e) => {
  const t = vt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, n = 1 / 0;
  const o = Object.entries(re).reduce((i, [d, l]) => {
    if (typeof l == "object") {
      const r = d;
      Object.entries(Ge).forEach(([u, s]) => {
        l[s] && (i[l[s]] = { color: r, variant: u });
      });
    }
    return i;
  }, {});
  return Object.entries(o).forEach(([i, d]) => {
    const l = vt(i);
    if (!l) return;
    const r = Fa(t, l);
    r < n && (n = r, a = d);
  }), a;
}, Na = (e, t) => {
  const a = Ge[t], n = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": re[e][a],
    "--theme-border": re[e][a],
    "--theme-hover": re[e][n],
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
    hex: typeof e == "string" && e.startsWith("#") ? e : re[t][Ge[a]],
    tailwindName: t,
    style: Na(t, a)
  };
};
function vt(e) {
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
const La = /* @__PURE__ */ ve(Ra, [["render", Ta]]), Ea = {}, Da = {
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
const Ha = /* @__PURE__ */ ve(Ea, [["render", Oa]]), ja = {}, qa = { class: "px-3 py-1.5" };
function za(e, t) {
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
const Wa = /* @__PURE__ */ ve(ja, [["render", za]]), Ua = {}, Va = {
  class: "w-4 h-4 transition-transform",
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
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ga = /* @__PURE__ */ ve(Ua, [["render", Ka]]), Ja = {}, Ya = {
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
const Qa = /* @__PURE__ */ ve(Ja, [["render", Za]]), Xa = /* @__PURE__ */ M({
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
}, an = /* @__PURE__ */ M({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = y(() => t.checked), n = y(() => t.partial), o = xe("themeClasses");
    return (i, d) => (m(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !i.disabled && "cursor-pointer group",
        i.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: d[0] || (d[0] = Ke((l) => !i.disabled && i.$emit("change"), ["stop", "prevent"]))
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
        style: ie(c(o).style)
      }, [
        Ue((m(), x("svg", en, d[1] || (d[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ve, a.value && !n.value]
        ]),
        Ue((m(), x("svg", tn, d[2] || (d[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ve, n.value]
        ])
      ], 6)
    ], 2));
  }
}), xt = /* @__PURE__ */ M({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, o) => (m(), V(an, {
      checked: n.checked,
      disabled: n.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (i) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), nn = /* @__PURE__ */ M({
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
    const a = e, n = y(() => a.status === "allSelected"), o = y(() => a.status === "partSelected"), i = t;
    return (d, l) => (m(), V(xt, {
      checked: n.value,
      partial: o.value,
      disabled: e.disabled,
      onChange: l[0] || (l[0] = (r) => i("change", !n.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), sn = {
  key: 1,
  class: "items-center gap-2"
}, rn = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, ln = /* @__PURE__ */ M({
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
    const a = t, n = yt(), o = (d) => [
      `header-${d.value}`,
      `header-${d.value.toLowerCase()}`,
      "header"
    ].find((r) => n[r]) || "header", i = (d) => {
      d.sortable && d.sortType && a("headerClick", d);
    };
    return (d, l) => (m(), x("th", {
      style: ie(e.fixedDistance),
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
      onClick: l[1] || (l[1] = Ke((r) => i(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (m(), V(nn, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: l[0] || (l[0] = (r) => d.$emit("toggleSelectAll", r))
      }, null, 8, ["disabled", "status"])) : (m(), x("div", sn, [
        I(d.$slots, o(e.header), z(le({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, U(e.header.text), 1)
        ]),
        e.header.sortable ? (m(), V(c(Xa), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : O("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (m(), x("span", rn, U(e.getMultiSortNumber(e.header.value)), 1)) : O("", !0)
      ]))
    ], 6));
  }
}), on = /* @__PURE__ */ M({
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
        (m(!0), x(oe, null, Z(e.headers, (l, r) => (m(), V(ln, {
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
          onHeaderClick: n,
          onToggleSelectAll: o
        }, me({ _: 2 }, [
          Z(i.$slots, (u, s) => ({
            name: s,
            fn: J((g) => [
              I(i.$slots, s, Y({ ref_for: !0 }, g))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : O("", !0);
  }
}), un = /* @__PURE__ */ M({
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
    const a = e, n = t, o = y(() => a.isDisabled ?? !1), i = y(() => typeof a.bodyItemClassName == "function" ? a.bodyItemClassName(a.column, a.index) : a.bodyItemClassName), d = y(
      () => a.column === "expand" || a.column === a.expandColumn
    ), l = () => {
      d.value && a.expandColumn === "" && n("toggle-expand", event);
    }, r = (s) => {
      n("toggle-expand", s);
    }, u = () => {
      n("toggle-select");
    };
    return (s, g) => (m(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": s.column === "expand" && s.expandColumn === "" },
        i.value
      ]]),
      style: ie(s.style),
      onClick: l
    }, [
      s.column === "checkbox" ? (m(), x(oe, { key: 0 }, [
        s.column === "checkbox" ? I(s.$slots, "selection-checkbox", z(Y({ key: 0 }, { item: s.item, index: s.index, isDisabled: o.value, toggleSelectItem: u })), () => [
          W(xt, {
            checked: !!s.item.checkbox,
            disabled: o.value,
            onChange: u
          }, null, 8, ["checked", "disabled"])
        ]) : O("", !0)
      ], 64)) : d.value ? I(s.$slots, "expand-button", z(Y({ key: 1 }, { item: s.item, expanded: s.isExpanded, toggle: r })), () => [
        C("button", {
          onClick: Ke(r, ["stop"]),
          class: "inline-flex items-center"
        }, [
          W(c(Ga), {
            class: S({ "transform rotate-90": s.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(s.$slots, `item-${s.column}`, z(Y({ key: 2 }, s.item)), () => [
        I(s.$slots, `item-${s.column.toLowerCase()}`, z(le(s.item)), () => [
          I(s.$slots, "item", z(le({ column: s.column, item: s.item })), () => [
            De(U(c(wa)(s.column, s.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), dn = /* @__PURE__ */ M({
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
    const a = e, n = t, o = y(() => typeof a.bodyRowClassName == "function" ? a.bodyRowClassName(a.item, a.index) : a.bodyRowClassName), i = (r) => {
      n("click", r, a.item, a.index);
    }, d = (r) => {
      n("dblclick", r, a.item, a.index);
    }, l = (r) => {
      n("contextmenu", r, a.item);
    };
    return (r, u) => (m(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors border-t", [
        { "bg-white": r.alternating && r.index % 2 === 0 },
        { "bg-gray-50": !r.alternating || r.index % 2 === 1 },
        { "hover:bg-gray-100": !r.noHover },
        { "divide-x divide-gray-200": r.borderCell },
        o.value
      ]]),
      onClick: i,
      onDblclick: d,
      onContextmenu: l
    }, [
      I(r.$slots, "prepend"),
      (m(!0), x(oe, null, Z(r.columns, (s, g) => {
        var v;
        return m(), V(un, {
          key: g,
          column: s,
          item: r.item,
          index: r.index,
          style: ie((v = r.getFixedDistance) == null ? void 0 : v.call(r, s, "td")),
          "is-disabled": r.isDisabled,
          onToggleSelect: u[0] || (u[0] = () => r.$emit("toggle-select", r.item)),
          "expand-column": r.expandColumn,
          "is-expanded": r.isExpanded,
          onToggleExpand: u[1] || (u[1] = (b) => r.$emit("toggle-expand", b, r.index, r.item))
        }, me({ _: 2 }, [
          Z(r.$slots, (b, h) => ({
            name: h,
            fn: J((w) => [
              I(r.$slots, h, Y({ ref_for: !0 }, w))
            ])
          }))
        ]), 1032, ["column", "item", "index", "style", "is-disabled", "expand-column", "is-expanded"]);
      }), 128)),
      I(r.$slots, "append")
    ], 34));
  }
}), cn = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, fn = /* @__PURE__ */ M({
  __name: "LoadingLine",
  setup(e) {
    const t = xe("themeClasses");
    return (a, n) => (m(), x("div", cn, [
      C("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ie({ backgroundColor: c(t).hex })
      }, null, 4)
    ]));
  }
}), gn = /* @__PURE__ */ ve(fn, [["__scopeId", "data-v-cbdc3562"]]), pn = ["colspan"], mn = { class: "overflow-hidden" }, vn = /* @__PURE__ */ M({
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
    return (n, o) => (m(), x("tr", {
      class: S(["vdt-expand-row border-0", [a.value, { "bg-gray-50": (n.index + 1) % 2 === 0, "border-t": n.isExpanded }]])
    }, [
      C("td", {
        colspan: n.columnsCount,
        class: "relative p-0"
      }, [
        n.loading ? (m(), V(gn, {
          key: 0,
          class: "mb-4"
        })) : O("", !0),
        C("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": n.isExpanded }]])
        }, [
          C("div", mn, [
            I(n.$slots, "default")
          ])
        ], 2)
      ], 8, pn)
    ], 2));
  }
}), hn = { class: "flex items-center gap-2 text-sm text-gray-700" }, bn = { class: "relative inline-block min-w-[70px]" }, yn = ["aria-expanded"], xn = { class: "block truncate" }, wn = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, Pn = ["aria-selected", "onClick"], Cn = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, kn = /* @__PURE__ */ M({
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
    const a = e, n = t, o = ee(!1), i = ee(!1), d = y({
      get: () => a.modelValue,
      set: (v) => n("update:modelValue", v)
    }), l = xe("dataTable");
    ge(o, (v) => {
      if (v && (l != null && l.value)) {
        const b = window.innerHeight, h = l.value.getBoundingClientRect(), w = b - (h.height + h.top);
        i.value = w <= 100;
      }
    });
    const r = (v) => {
      d.value = v, o.value = !1;
    }, u = () => {
      o.value = !o.value;
    }, s = (v) => {
      v.target.closest(".relative") || (o.value = !1);
    }, g = (v) => {
      const b = v.relatedTarget;
      b != null && b.closest(".relative") || (o.value = !1);
    };
    return bt(() => {
      document.addEventListener("click", s);
    }), Kt(() => {
      document.removeEventListener("click", s);
    }), (v, b) => (m(), x("div", hn, [
      De(U(e.message) + " ", 1),
      C("div", bn, [
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
          C("span", xn, U(d.value), 1),
          C("span", wn, [
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
        ], 10, yn),
        W(Gt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: J(() => [
            o.value ? (m(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": i.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: g
            }, [
              (m(!0), x(oe, null, Z(e.rowsItems, (h) => (m(), x("li", {
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
                }, U(h), 3),
                h === d.value ? (m(), x("span", Cn, b[1] || (b[1] = [
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
                ]))) : O("", !0)
              ], 10, Pn))), 128))
            ], 34)) : O("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Sn = { class: "text-sm text-gray-700" }, In = /* @__PURE__ */ M({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, a) => (m(), x("div", Sn, [
      I(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        De(U(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + U(t.rowsOfPageSeparatorMessage) + " " + U(t.totalItemsLength), 1)
      ])
    ]));
  }
}), $n = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Bn = ["disabled"], Nn = ["disabled"], ht = /* @__PURE__ */ M({
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
    return (n, o) => (m(), x("div", $n, [
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
      ], 10, Bn),
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
        onClick: o[1] || (o[1] = (i) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        W(c(La), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Nn)
    ]));
  }
}), An = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Fn = ["onClick"], pe = 7, Rn = /* @__PURE__ */ M({
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
    const a = e, n = t, o = xe("themeClasses"), i = (l) => {
      l.type === "button" && !l.active && n("updatePage", l.page);
    }, d = y(() => {
      const l = [], { maxPaginationNumber: r, currentPaginationNumber: u } = a;
      if (r <= pe) {
        for (let s = 1; s <= r; s += 1)
          l.push({
            type: "button",
            page: s,
            active: s === u,
            activePrev: s + 1 === u
          });
        return l;
      }
      if ([1, 2, r, r - 1].includes(u))
        for (let s = 1; s <= pe; s += 1)
          if (s <= 3)
            l.push({
              type: "button",
              page: s,
              active: s === u,
              activePrev: s + 1 === u
            });
          else if (s === 4)
            l.push({ type: "omission" });
          else {
            const g = r - (pe - s);
            l.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let s = 1; s <= pe; s += 1)
          s <= 5 ? l.push({
            type: "button",
            page: s,
            active: s === u,
            activePrev: s + 1 === u
          }) : s === 6 ? l.push({ type: "omission" }) : l.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(u))
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            l.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (s === 2)
            l.push({ type: "omission" });
          else {
            const g = r - (pe - s);
            l.push({
              type: "button",
              page: g,
              active: g === u,
              activePrev: g + 1 === u
            });
          }
      else
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            l.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (s === 2 || s === 6)
            l.push({ type: "omission" });
          else if (s === 7)
            l.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: !1
            });
          else {
            const g = 4 - s, v = u - g;
            l.push({
              type: "button",
              page: v,
              active: v === u,
              activePrev: v + 1 === u
            });
          }
      return l;
    });
    return (l, r) => (m(), x("div", An, [
      (m(!0), x(oe, null, Z(d.value, (u, s) => (m(), x("div", {
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
            s !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            s !== 0 && "-ml-px"
          ]
        ]]),
        style: ie(c(o).style),
        onClick: (g) => i(u)
      }, [
        u.type === "button" ? (m(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, U(u.page), 3)) : (m(), V(c(Wa), { key: 1 }))
      ], 14, Fn))), 128))
    ]));
  }
}), Mn = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Tn = /* @__PURE__ */ M({
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
    const a = e, n = t, o = y(() => ({
      isFirstPage: a.isFirstPage,
      isLastPage: a.isLastPage,
      currentPaginationNumber: a.currentPaginationNumber,
      maxPaginationNumber: a.maxPaginationNumber,
      nextPage: () => n("nextPage"),
      prevPage: () => n("prevPage"),
      updatePage: (i) => n("updatePage", i)
    }));
    return (i, d) => i.hideFooter ? O("", !0) : (m(), x("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-sm": i.showShadow }, i.footerClassName]])
    }, [
      W(ht, {
        "is-first-page": i.isFirstPage,
        "is-last-page": i.isLastPage,
        onClickNextPage: d[0] || (d[0] = () => n("nextPage")),
        onClickPrevPage: d[1] || (d[1] = () => n("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: J(() => d[6] || (d[6] = [
          C("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      C("div", Mn, [
        i.hideRowsPerPage ? O("", !0) : (m(), V(kn, {
          key: 0,
          "model-value": i.rowsPerPage,
          "rows-items": i.rowsItems,
          message: i.rowsPerPageMessage,
          "onUpdate:modelValue": d[2] || (d[2] = (l) => n("update:rowsPerPage", l))
        }, null, 8, ["model-value", "rows-items", "message"])),
        i.hidePaginationInfo ? O("", !0) : (m(), V(In, {
          key: 1,
          "current-page-first-index": i.currentPageFirstIndex,
          "current-page-last-index": i.currentPageLastIndex,
          "total-items-length": i.totalItemsLength,
          "rows-of-page-separator-message": i.rowsOfPageSeparatorMessage
        }, me({ _: 2 }, [
          i.$slots["pagination-info"] ? {
            name: "default",
            fn: J((l) => [
              I(i.$slots, "pagination-info", z(le(l)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        i.$slots.pagination ? I(i.$slots, "pagination", z(Y({ key: 2 }, o.value))) : (m(), V(ht, {
          key: 3,
          "is-first-page": i.isFirstPage,
          "is-last-page": i.isLastPage,
          onClickNextPage: d[4] || (d[4] = () => n("nextPage")),
          onClickPrevPage: d[5] || (d[5] = () => n("prevPage"))
        }, me({ _: 2 }, [
          i.buttonsPagination ? {
            name: "buttonsPagination",
            fn: J(() => [
              W(Rn, {
                "current-pagination-number": i.currentPaginationNumber,
                "max-pagination-number": i.maxPaginationNumber,
                onUpdatePage: d[3] || (d[3] = (l) => n("updatePage", l))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Ln = ["id"], En = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Dn = { class: "relative z-10" }, On = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, wt = /* @__PURE__ */ M({
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
      checkboxColumnWidth: o,
      expandColumnWidth: i,
      indexColumnWidth: d,
      rowsItems: l,
      showIndexSymbol: r,
      currentPage: u,
      filterOptions: s,
      headers: g,
      itemsSelected: v,
      loading: b,
      items: h,
      rowsPerPage: w,
      searchField: B,
      searchValue: $,
      serverItemsLength: H,
      showIndex: T,
      sortBy: Q,
      sortType: j,
      serverOptions: ue,
      multiSort: te,
      mustSort: we,
      clickEventType: Pe,
      clickRowToExpand: Ce,
      clickRowToSelect: K,
      fixedExpand: ke,
      fixedCheckbox: N,
      fixedIndex: q,
      batchSelectionThreshold: E,
      expandColumn: D
    } = Jt(n), p = y(() => Aa(n.theme));
    ut("themeClasses", p);
    const k = yt(), P = y(() => !!k.expand), R = y(() => !!k.body), de = y(
      () => typeof n.expandTransition < "u" ? n.expandTransition : P.value
    ), ae = ee(null), Se = ee(null);
    ut("dataTable", ae);
    const X = a, Ie = y(() => v.value !== null), ne = y(() => ue.value !== null), {
      serverOptionsComputed: he,
      updateServerOptionsPage: Pt,
      updateServerOptionsSort: Ct,
      updateServerOptionsRowsPerPage: kt
    } = va(
      ue,
      te,
      X
    ), {
      clientSortOptions: Je,
      headerColumns: Ye,
      headersForRender: be,
      updateSortField: St,
      isMultiSorting: It,
      getMultiSortNumber: $t
    } = oa(
      r,
      o,
      i,
      N,
      ke,
      q,
      g,
      P,
      d,
      Ie,
      ne,
      we,
      he,
      T,
      Q,
      j,
      te,
      D,
      Ct,
      X
    ), {
      rowsItemsComputed: Ze,
      rowsPerPageRef: ye,
      updateRowsPerPage: Qe
    } = ma(
      ne,
      l,
      ue,
      w
    ), {
      totalItems: Xe,
      selectItemsComputed: Bt,
      totalItemsLength: Be,
      toggleSelectAll: Nt,
      toggleSelectItem: _e,
      isProcessing: At,
      processProgress: Ft
    } = Ca(
      Je,
      s,
      ne,
      h,
      v,
      B,
      $,
      H,
      te,
      E,
      n.disabledRows,
      X
    ), {
      currentPaginationNumber: ce,
      maxPaginationNumber: Ne,
      isLastPage: Ae,
      isFirstPage: Fe,
      nextPage: Re,
      prevPage: Me,
      updatePage: $e,
      updateCurrentPaginationNumber: Rt
    } = pa(
      u,
      ne,
      b,
      Be,
      ye,
      ue,
      Pt
    ), {
      currentPageFirstIndex: et,
      currentPageLastIndex: tt,
      multipleSelectStatus: Mt,
      pageItems: fe
    } = ga(
      ce,
      Ie,
      ne,
      h,
      ye,
      Bt,
      T,
      Xe,
      Be,
      n.disabledRows
    ), Te = y(() => ce.value === 0 ? 0 : (ce.value - 1) * ye.value), {
      expandingItemIndexList: Oe,
      updateExpandingItemIndexList: at,
      clearExpandingItemIndexList: nt
    } = ra(
      fe,
      Te,
      X
    ), {
      fixedHeaders: st,
      lastFixedColumn: rt,
      fixedColumnsInfos: Tt,
      showShadow: lt
    } = la(
      be,
      Se
    ), Lt = (f) => {
      const se = f.width ?? (st.value.length ? 100 : null);
      if (se) return `width: ${se}px; min-width: ${se}px;`;
    }, ot = (f, se = "th") => {
      if (!st.value.length) return;
      const A = Tt.value.find((L) => L.value === f);
      if (A)
        return `
            left: ${A.distance}px;
            z-index: ${se === "th" ? 3 : 1};
            position: sticky;
            background-color: ${se === "th" ? "none" : "inherit"};
            ${A.value === rt.value ? `
                box-shadow: 4px 0 6px -2px rgba(0, 0, 0, 0.1);
                clip-path: inset(0px -10px 0px 0px);
            ` : ""}
            isolation: isolate;
        `;
    }, Et = (f) => {
      f.sortable && f.sortType && St(f.value, f.sortType);
    }, He = (f) => typeof n.disabledRows == "function" ? n.disabledRows(f) : !1, Dt = y(() => fe.value.every((f) => n.disabledRows(f))), Ot = (f) => {
      He(f) || _e(f);
    }, {
      handleRowClick: Ht,
      handleRowDoubleClick: jt,
      handleRowContextMenu: qt
    } = sa(
      Pe,
      Ie,
      T,
      He,
      Ce,
      K,
      at,
      _e,
      X
    );
    return ge(b, (f, se) => {
      he.value && f === !1 && se === !0 && (Rt(he.value.page), nt());
    }), ge(ye, (f) => {
      ne.value ? kt(f) : $e(1);
    }), ge([$, s], () => {
      ne.value || $e(1);
    }), ge([ce, Je, B, $, s], () => {
      nt();
    }, { deep: !0 }), ge(fe, (f) => {
      X("updatePageItems", f);
    }, { deep: !0 }), ge(Xe, (f) => {
      X("updateTotalItems", f);
    }, { deep: !0 }), t({
      currentPageFirstIndex: et,
      currentPageLastIndex: tt,
      clientItemsLength: Be,
      maxPaginationNumber: Ne,
      currentPaginationNumber: ce,
      isLastPage: Ae,
      isFirstPage: Fe,
      nextPage: Re,
      prevPage: Me,
      updatePage: $e,
      rowsPerPageOptions: Ze,
      rowsPerPageActiveOption: ye,
      updateRowsPerPageActiveOption: Qe
    }), (f, se) => (m(), x("div", {
      ref_key: "tableWrapper",
      ref: ae,
      class: S(["vdt-table-wrapper relative w-full", [f.wrapperClassName]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: Se,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-sm": c(lt) }, f.containerClassName]])
      }, [
        C("table", {
          id: f.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [f.tableClassName]])
        }, [
          C("colgroup", null, [
            (m(!0), x(oe, null, Z(c(be), (A, L) => (m(), x("col", {
              key: L,
              style: ie(Lt(A))
            }, null, 4))), 128))
          ]),
          c(k)["customize-headers"] ? I(f.$slots, "customize-headers", { key: 0 }) : O("", !0),
          W(on, Y({
            headers: c(be),
            hideHeader: f.hideHeader,
            fixedHeader: f.fixedHeader,
            headerClassName: f.headerClassName,
            borderCell: f.borderCell,
            lastFixedColumn: c(rt),
            headerItemClassName: f.headerItemClassName,
            areAllVisibleRowsDisabled: Dt.value,
            multipleSelectStatus: c(Mt),
            multiSort: c(te)
          }, {
            "is-multi-sorting": c(It),
            "get-multi-sort-number": c($t),
            "get-fixed-distance": ot,
            onHeaderClick: Et,
            onToggleSelectAll: c(Nt)
          }), me({ _: 2 }, [
            Z(f.$slots, (A, L) => ({
              name: L,
              fn: J((G) => [
                I(f.$slots, L, z(le(G)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          R.value ? I(f.$slots, "body", z(Y({ key: 1 }, c(fe)))) : c(Ye).length ? (m(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [f.bodyClassName]])
          }, [
            I(f.$slots, "body-prepend", z(le({
              items: c(fe),
              pagination: { isFirstPage: c(Fe), isLastPage: c(Ae), currentPaginationNumber: c(ce), maxPaginationNumber: c(Ne), nextPage: c(Re), prevPage: c(Me) },
              headers: c(be)
            }))),
            (m(!0), x(oe, null, Z(c(fe), (A, L) => (m(), x(oe, {
              key: A.key || L
            }, [
              W(dn, {
                item: A,
                index: L,
                columns: c(Ye),
                alternating: f.alternating,
                "no-hover": f.noHover,
                "border-cell": f.borderCell,
                "body-row-className": f.bodyRowClassName,
                "is-expanded": c(Oe).includes(L + Te.value),
                "is-disabled": He(A),
                "expand-column": c(D),
                "get-fixed-distance": ot,
                onClick: (G) => c(Ht)(G, A, L),
                onDblclick: (G) => c(jt)(G, A, L),
                onContextmenu: (G) => c(qt)(G, A),
                onToggleExpand: (G) => c(at)(L, A, G),
                onToggleSelect: (G) => Ot(A)
              }, me({ _: 2 }, [
                Z(f.$slots, (G, it) => ({
                  name: it,
                  fn: J((zt) => [
                    I(f.$slots, it, Y({ ref_for: !0 }, zt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "body-row-className", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              de.value || c(Oe).includes(L + Te.value) ? (m(), V(vn, {
                key: 0,
                item: A,
                index: L,
                "columns-count": c(be).length,
                loading: A.expandLoading,
                "is-expanded": c(Oe).includes(L + Te.value),
                "body-expand-row-className": f.bodyExpandRowClassName
              }, {
                default: J(() => [
                  I(f.$slots, "expand", Y({ ref_for: !0 }, A))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : O("", !0)
            ], 64))), 128)),
            I(f.$slots, "body-append", z(le({
              items: c(fe),
              pagination: { isFirstPage: c(Fe), isLastPage: c(Ae), currentPaginationNumber: c(ce), maxPaginationNumber: c(Ne), nextPage: c(Re), prevPage: c(Me), updatePage: c($e) },
              headers: c(be)
            })))
          ], 2)) : O("", !0)
        ], 10, Ln),
        c(b) ? (m(), x("div", En, [
          C("div", Dn, [
            I(f.$slots, "loading", {}, () => [
              W(Qt)
            ])
          ])
        ])) : O("", !0),
        !c(fe).length && !c(b) ? (m(), x("div", On, [
          I(f.$slots, "empty-message", {}, () => [
            De(U(f.emptyMessage), 1)
          ])
        ])) : O("", !0)
      ], 2),
      W(Tn, Y({
        hideFooter: f.hideFooter,
        hideRowsPerPage: f.hideRowsPerPage,
        hidePaginationInfo: f.hidePaginationInfo,
        buttonsPagination: f.buttonsPagination,
        showShadow: c(lt),
        footerClassName: f.footerClassName,
        rowsPerPage: c(ye),
        rowsItems: c(Ze),
        rowsPerPageMessage: f.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: f.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: c(et),
        currentPageLastIndex: c(tt),
        totalItemsLength: c(Be),
        currentPaginationNumber: c(ce),
        maxPaginationNumber: c(Ne),
        isFirstPage: c(Fe),
        isLastPage: c(Ae)
      }, {
        "onUpdate:rowsPerPage": c(Qe),
        onNextPage: c(Re),
        onPrevPage: c(Me),
        onUpdatePage: c($e)
      }), me({ _: 2 }, [
        f.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: J((A) => [
            I(f.$slots, "pagination-info", z(le(A)))
          ]),
          key: "0"
        } : void 0,
        f.$slots.pagination ? {
          name: "pagination",
          fn: J((A) => [
            I(f.$slots, "pagination", z(le(A)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      Ue(W(na, { progress: c(Ft) }, null, 8, ["progress"]), [
        [Ve, c(At)]
      ])
    ], 2));
  }
}), Hn = (e) => {
  e.component("DataTable", wt);
};
wt.install = Hn;
export {
  zn as createFilter,
  wt as default,
  Hn as install
};
