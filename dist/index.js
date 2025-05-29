var _t = Object.defineProperty;
var Jt = (e, s, t) => s in e ? _t(e, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[s] = t;
var Ge = (e, s, t) => Jt(e, typeof s != "symbol" ? s + "" : s, t);
import { defineComponent as T, inject as Pe, createElementBlock as P, openBlock as y, Fragment as ie, renderList as _, createElementVNode as C, normalizeStyle as pe, normalizeClass as S, unref as p, toDisplayString as K, ref as Q, computed as v, onMounted as Ct, onUnmounted as Yt, watch as ge, createVNode as j, withModifiers as Xe, withDirectives as Ze, vShow as Qe, createBlock as X, useSlots as kt, renderSlot as I, createCommentVNode as H, normalizeProps as U, guardReactiveProps as oe, createSlots as xe, withCtx as le, mergeProps as V, createTextVNode as Oe, onBeforeUnmount as Zt, Transition as Qt, toRefs as Xt, provide as pt } from "vue";
const ea = { class: "inline-flex relative w-[60px] h-[60px]" }, ta = /* @__PURE__ */ T({
  __name: "Loading",
  setup(e) {
    const s = Pe("themeClasses");
    return (t, a) => (y(), P("div", ea, [
      (y(), P(ie, null, _(4, (o) => C("div", {
        key: o,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(o - 1) * 150}`]]),
        style: pe({
          borderTopColor: p(s).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), be = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [a, o] of s)
    t[a] = o;
  return t;
}, aa = /* @__PURE__ */ be(ta, [["__scopeId", "data-v-e9a27991"]]), sa = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, na = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, ra = { class: "w-64" }, oa = { class: "h-2 bg-gray-200 rounded" }, la = { class: "text-center text-sm text-gray-600" }, ia = /* @__PURE__ */ T({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const s = Pe("themeClasses");
    return (t, a) => (y(), P("div", sa, [
      C("div", na, [
        a[0] || (a[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", ra, [
          C("div", oa, [
            C("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: pe({ width: `${t.progress}%`, backgroundColor: p(s).hex })
            }, null, 4)
          ])
        ]),
        C("div", la, K(Math.round(t.progress)) + "% ", 1)
      ])
    ]));
  }
});
function ua(e, s, t, a, o, l, d, i, n) {
  const u = (c, h) => {
    const w = { ...c };
    return s.value && (delete w.checkbox, w.isSelected = c.checkbox), t.value && (delete w.index, w.indexInCurrentPage = h + 1), w;
  };
  return {
    handleRowClick: (c, h, w) => {
      if (!c.target.closest(".checkbox, .expand-button") && (o.value && d(w, h, c), l.value && !a(h) && i(h), e.value === "single")) {
        const $ = u(h, w);
        n("clickRow", $, c);
      }
    },
    handleRowDoubleClick: (c, h, w) => {
      if (e.value === "double") {
        const $ = u(h, w);
        n("clickRow", $, c);
      }
    },
    handleRowContextMenu: (c, h) => {
      const w = u(h, -1);
      n("contextmenuRow", w, c);
    }
  };
}
function da(e, s, t) {
  const a = Q([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (d, i, n) => {
      n.stopPropagation();
      const u = a.value.indexOf(d);
      if (u !== -1)
        a.value.splice(u, 1);
      else {
        const r = e.value.findIndex((f) => JSON.stringify(f) === JSON.stringify(i));
        t("expandRow", s.value + r, i), a.value.push(s.value + r);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      a.value = [];
    }
    // 清空展開列表的方法
  };
}
function ca(e, s) {
  const t = v(() => e.value.filter((r) => r.fixed)), a = v(() => t.value.filter((r) => !r.fixedPosition || r.fixedPosition === "left")), o = v(() => t.value.filter((r) => r.fixedPosition === "right")), l = v(() => a.value.length ? a.value[a.value.length - 1].value : ""), d = v(() => o.value.length ? o.value[0].value : ""), i = v(() => {
    if (!t.value.length) return [];
    const r = [];
    if (a.value.length) {
      const f = a.value.map((m) => m.width ?? 100);
      a.value.forEach((m, c) => {
        r.push({
          value: m.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: m.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: c === 0 ? 0 : f.reduce((h, w, $) => $ < c ? h + w : h, 0)
        });
      });
    }
    if (o.value.length) {
      const f = o.value.map((m) => m.width ?? 100);
      o.value.forEach((m, c) => {
        r.push({
          value: m.value,
          fixed: !0,
          position: "right",
          width: m.width ?? 100,
          distance: c === o.value.length - 1 ? 0 : f.reduce((h, w, $) => $ > c ? h + w : h, 0)
        });
      });
    }
    return r;
  }), n = Q(!1);
  let u = null;
  return Ct(() => {
    const r = s.value;
    if (r) {
      const f = () => {
        n.value = r.scrollLeft > 0;
      };
      f(), r.addEventListener("scroll", f), u = () => {
        r.removeEventListener("scroll", f);
      };
    }
  }), Yt(() => {
    u && (u(), u = null);
  }), {
    fixedHeaders: t,
    leftFixedHeaders: a,
    rightFixedHeaders: o,
    lastLeftFixedColumn: l,
    firstRightFixedColumn: d,
    fixedColumnsInfos: i,
    showShadow: n
  };
}
function fa(e, s, t, a, o, l, d, i, n, u, r, f, m, c, h, w, $, N, q, E) {
  const ee = v(() => d.value.length ? {
    hasFixedColumns: d.value.some((F) => F.fixed),
    fixedHeaders: d.value.filter((F) => F.fixed),
    unFixedHeaders: d.value.filter((F) => !F.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), W = Q(
    ga(h.value, w.value, $.value)
  ), { determineHeaderSortState: ue } = va(r, m, $, W), te = v(() => {
    const F = d.value.map((x) => ({
      ...x,
      sortType: x.sortable ? ue(x.value) : void 0
    })), z = F.filter(
      (x) => x.fixed && (!x.fixedPosition || x.fixedPosition === "left")
    ), O = F.filter((x) => !x.fixed), G = F.filter(
      (x) => x.fixed && x.fixedPosition === "right"
    );
    return [
      ...Object.values(we.value).filter(Boolean),
      ...z,
      ...O,
      ...G
    ];
  }), we = v(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: s.value ?? 36
    },
    index: c.value && {
      text: e.value,
      value: "index",
      fixed: l.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: n.value
    },
    expand: i.value && !N.value && {
      text: "",
      value: "expand",
      fixed: o.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value
    }
  })), Ce = v(
    () => te.value.map((F) => F.value)
  ), ke = (F, z) => {
    const O = z === "none" ? "asc" : z === "asc" ? "desc" : f.value ? "asc" : null;
    if (r.value) {
      q(F, O);
      return;
    }
    const G = $.value ? pa(F, O, W.value) : ma(F, O);
    W.value = G, E("updateSort", { sortType: O, sortBy: F });
  }, J = v(() => (F) => {
    var O, G;
    const z = r.value ? (O = m.value) == null ? void 0 : O.sortBy : (G = W.value) == null ? void 0 : G.sortBy;
    return Array.isArray(z) && z.includes(F);
  }), Se = v(() => (F) => {
    var O, G;
    const z = r.value ? (O = m.value) == null ? void 0 : O.sortBy : (G = W.value) == null ? void 0 : G.sortBy;
    return Array.isArray(z) ? z.indexOf(F) + 1 : !1;
  });
  return {
    clientSortOptions: W,
    headerColumns: Ce,
    headersForRender: te,
    updateSortField: ke,
    isMultiSorting: J,
    getMultiSortNumber: Se
  };
}
function ga(e, s, t) {
  return t && Array.isArray(e) && Array.isArray(s) ? {
    sortBy: e,
    sortDesc: s.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: s === "desc"
  } : null;
}
const pa = (e, s, t) => {
  if (!(t != null && t.sortBy) || !Array.isArray(t.sortBy) || !Array.isArray(t.sortDesc))
    return s === null ? null : {
      sortBy: [e],
      sortDesc: [s === "desc"]
    };
  const a = t.sortBy.indexOf(e), o = [...t.sortBy], l = [...t.sortDesc];
  return a === -1 && s !== null ? (o.push(e), l.push(s === "desc")) : s === null ? (o.splice(a, 1), l.splice(a, 1)) : l[a] = s === "desc", { sortBy: o, sortDesc: l };
}, ma = (e, s) => s === null ? null : {
  sortBy: e,
  sortDesc: s === "desc"
};
function va(e, s, t, a) {
  const o = (i) => !e.value || !s.value ? l(i) : d(i), l = (i) => {
    if (!a.value) return "none";
    const { sortBy: n, sortDesc: u } = a.value;
    if (t.value && Array.isArray(n) && Array.isArray(u)) {
      const r = n.indexOf(i);
      return r !== -1 ? u[r] ? "desc" : "asc" : "none";
    }
    return i === n ? u ? "desc" : "asc" : "none";
  }, d = (i) => {
    const { sortBy: n, sortType: u } = s.value;
    if (t.value && Array.isArray(n) && Array.isArray(u)) {
      const r = n.indexOf(i);
      return r !== -1 ? u[r] : "none";
    }
    return i === n && u ? u : "none";
  };
  return {
    determineHeaderSortState: o
  };
}
class ha {
  constructor() {
    Ge(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    Ge(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(s) {
    let t = this.itemKeyCache.get(s);
    if (!t) {
      const { checkbox: a, index: o, ...l } = s;
      t = Object.entries(l).sort(([d], [i]) => d.localeCompare(i)).map(([d, i]) => `${d}:${i}`).join("|"), this.itemKeyCache.set(s, t);
    }
    return t;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ba(e, s, t, a, o, l, d, i, n, u) {
  const r = new ha(), f = v(
    () => (e.value - 1) * o.value + 1
  ), m = v(() => t.value ? Math.min(
    n.value,
    e.value * o.value
  ) : Math.min(
    i.value.length,
    e.value * o.value
  )), c = v(() => t.value ? a.value : i.value.slice(
    f.value - 1,
    m.value
  )), h = v(() => d.value ? c.value.map((N, q) => ({
    index: f.value + q,
    ...N
  })) : c.value), w = v(() => {
    if (l.value.length === 0)
      return "noneSelected";
    const N = u ? i.value.filter((E) => !u(E)) : i.value;
    return l.value.length === N.length && l.value.every(
      (ee) => N.some(
        (W) => r.getItemKey(ee) === r.getItemKey(W)
      )
    ) ? "allSelected" : "partSelected";
  }), $ = v(() => {
    if (!s.value)
      return h.value;
    switch (w.value) {
      case "allSelected":
        return h.value.map((N) => ({
          checkbox: !u || !u(N),
          // 考慮禁用狀態
          ...N
        }));
      case "noneSelected":
        return h.value.map((N) => ({
          checkbox: !1,
          ...N
        }));
      default:
        return h.value.map((N) => ({
          checkbox: l.value.some(
            (E) => r.getItemKey(N) === r.getItemKey(E)
          ) && (!u || !u(N)),
          ...N
        }));
    }
  });
  return {
    currentPageFirstIndex: f,
    currentPageLastIndex: m,
    multipleSelectStatus: w,
    pageItems: $
  };
}
function ya(e, s, t, a, o, l, d) {
  const i = Q(l.value ? l.value.page : e.value), n = v(() => Math.ceil(a.value / o.value)), u = v(() => n.value === 0 || i.value === n.value), r = v(() => i.value === 1);
  return {
    currentPaginationNumber: i,
    maxPaginationNumber: n,
    isLastPage: u,
    isFirstPage: r,
    nextPage: () => {
      if (a.value !== 0 && !u.value && !t.value)
        if (s.value) {
          const w = i.value + 1;
          d(w);
        } else
          i.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !r.value && !t.value)
        if (s.value) {
          const w = i.value - 1;
          d(w);
        } else
          i.value -= 1;
    },
    updatePage: (w) => {
      t.value || (s.value ? d(w) : i.value = w);
    },
    updateCurrentPaginationNumber: (w) => {
      i.value = w;
    }
  };
}
function xa(e, s, t, a) {
  var i;
  const o = v(() => !e.value && s.value.findIndex((n) => n === a.value) === -1 ? [a.value, ...s.value] : s.value), l = Q(((i = t.value) == null ? void 0 : i.rowsPerPage) ?? a.value);
  return {
    rowsItemsComputed: o,
    // 計算後的每頁行數選項
    rowsPerPageRef: l,
    // 每頁行數
    updateRowsPerPage: (n) => {
      l.value = n;
    }
    // 更新每頁行數
  };
}
function Pa(e, s, t) {
  const a = v({
    get: () => {
      if (e.value) {
        const { page: i, rowsPerPage: n, sortBy: u, sortType: r } = e.value;
        return { page: i, rowsPerPage: n, sortBy: u ?? null, sortType: r ?? null };
      }
      return null;
    },
    set: (i) => {
      t("update:serverOptions", i);
    }
  });
  return {
    serverOptionsComputed: a,
    updateServerOptionsPage: (i) => {
      a.value && (a.value = {
        ...a.value,
        page: i
      });
    },
    updateServerOptionsSort: (i, n) => {
      if (a.value)
        if (s.value && Array.isArray(a.value.sortBy) && Array.isArray(a.value.sortType)) {
          const u = a.value.sortBy.findIndex((r) => r === i);
          u === -1 && n !== null && (a.value.sortBy.push(i), a.value.sortType.push(n)), n === null ? (a.value.sortBy.splice(u, 1), a.value.sortType.splice(u, 1)) : a.value.sortType[u] = n;
        } else
          a.value = {
            ...a.value,
            sortBy: n !== null ? i : null,
            sortType: n
          };
    },
    updateServerOptionsRowsPerPage: (i) => {
      a.value && (a.value = {
        ...a.value,
        page: 1,
        rowsPerPage: i
      });
    }
  };
}
function wa(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function Ca(e) {
  return e.comparison === "in";
}
function ka(e) {
  return typeof e.comparison == "function";
}
function Sa(e) {
  return typeof e == "number" && !isNaN(e);
}
const Xs = {
  number(e, s, t) {
    return { field: e, comparison: s, criteria: t };
  },
  string(e, s, t) {
    return { field: e, comparison: s, criteria: t };
  },
  array(e, s) {
    return { field: e, comparison: "in", criteria: s };
  },
  custom(e, s, t) {
    return { field: e, comparison: s, criteria: t };
  }
};
function Z(e, s) {
  if (e.includes(".")) {
    const t = e.split(".");
    let a = s;
    for (const o of t)
      if (a && typeof a == "object")
        a = a[o];
      else
        return "";
    return a ?? "";
  }
  return s[e] ?? "";
}
function Ia(e, s) {
  const t = Z(e, s);
  return Array.isArray(t) ? t.join(",") : t;
}
const mt = 1e3, vt = /* @__PURE__ */ new WeakMap(), Ee = (e) => {
  let s = vt.get(e);
  if (!s) {
    const { checkbox: t, index: a, ...o } = e;
    s = JSON.stringify(o), vt.set(e, s);
  }
  return s;
};
function $a(e, s, t, a) {
  const o = Q({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  ge(s, (r) => {
    if (r === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const c of r) {
      const h = Ee(c);
      f.add(h), m.set(h, c);
    }
    o.value.selectedItems = f, o.value.itemsMap = m;
  }, { immediate: !0, deep: !0 });
  const l = async (r, f, m) => new Promise((c) => {
    requestAnimationFrame(() => {
      const h = new Set(o.value.selectedItems), w = new Map(o.value.itemsMap);
      for (let $ = 0; $ < r.length; $++) {
        const N = r[$], q = Ee(N);
        f ? (h.add(q), w.set(q, N)) : h.delete(q), o.value.processedCount = m + $ + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = h, o.value.itemsMap = w, c();
    });
  }), d = async (r) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = e.value.length, o.value.visualProgress = 0, !r) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), a("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const f = e.value;
        for (let m = 0; m < f.length; m += mt) {
          const h = f.slice(m, Math.min(m + mt, f.length)).filter((w) => !t(w));
          await l(h, r, m), await new Promise((w) => setTimeout(w, 0));
        }
        a("update:itemsSelected", n.value), r && a("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, i = (r) => {
    const f = Ee(r), m = { ...r };
    delete m.checkbox, delete m.index;
    const c = new Set(o.value.selectedItems), h = new Map(o.value.itemsMap);
    c.has(f) ? (c.delete(f), a("deselectRow", m)) : (c.add(f), h.set(f, m), a("selectRow", m)), o.value.selectedItems = c, o.value.itemsMap = h, a("update:itemsSelected", Array.from(h.values()).filter(($) => c.has(Ee($))));
  }, n = v(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([r]) => o.value.selectedItems.has(r)).map(([, r]) => r)), u = v(() => o.value.visualProgress);
  return {
    selectedItems: n,
    toggleSelectAll: d,
    toggleSelectItem: i,
    isProcessing: v(() => o.value.selectionInProgress),
    selectionProgress: u
  };
}
function Na(e, s, t, a, o, l, d, i, n, u, r, f) {
  const m = /* @__PURE__ */ new WeakMap(), c = (b) => {
    let x = m.get(b);
    return x || (typeof l.value == "string" && l.value !== "" ? x = String(Z(l.value, b)) : Array.isArray(l.value) ? x = l.value.map((k) => String(Z(k, b))).join(" ") : x = Object.values(b).map(String).join(" "), m.set(b, x)), x;
  }, h = v(() => {
    if (!t.value && d.value !== "") {
      const b = new RegExp(d.value, "i");
      return a.value.filter((x) => b.test(c(x)));
    }
    return a.value;
  }), w = (b, x) => {
    const k = Sa(b) ? b : parseFloat(String(b));
    if (isNaN(k)) return !1;
    if (x.comparison === "between" && Array.isArray(x.criteria)) {
      const [de, ce] = x.criteria;
      return k >= de && k <= ce;
    }
    const M = x.criteria;
    switch (x.comparison) {
      case ">":
        return k > M;
      case ">=":
        return k >= M;
      case "<":
        return k < M;
      case "<=":
        return k <= M;
      default:
        return !1;
    }
  }, $ = v(() => {
    var b;
    return (b = s.value) != null && b.length ? h.value.filter(
      (x) => s.value.every((k) => {
        const M = Z(k.field, x);
        return ka(k) ? k.comparison(M, k.criteria) : wa(k) ? w(M, k) : Ca(k) ? k.criteria.includes(M) : k.comparison === "=" ? M === k.criteria : M !== k.criteria;
      })
    ) : h.value;
  }), N = (b, x, k) => b === x ? 0 : b == null ? 1 : x == null ? -1 : b < x ? k ? 1 : -1 : k ? -1 : 1, q = (b, x, k, M) => M < 0 ? b : q(b, x, k, M - 1).sort((de, ce) => {
    if (!x.slice(0, M).every((Y) => Z(Y, de) === Z(Y, ce))) return 0;
    const fe = x[M], ae = Z(fe, de), $e = Z(fe, ce);
    return N(ae, $e, k[M]);
  }), E = v(() => {
    if (t.value) return a.value;
    if (!e.value) return $.value;
    const { sortBy: b, sortDesc: x } = e.value, k = [...$.value];
    return n.value && Array.isArray(b) && Array.isArray(x) ? b.length ? q(k, b, x, b.length - 1) : k : k.sort((M, de) => {
      const ce = Z(b, M), Ie = Z(b, de);
      return N(ce, Ie, x);
    });
  }), ee = v(() => t.value ? i.value : E.value.length), W = v(() => t.value ? !1 : (t.value ? i.value : a.value.length) >= u.value), {
    selectedItems: ue,
    toggleSelectAll: te,
    toggleSelectItem: we,
    isProcessing: Ce,
    selectionProgress: ke
  } = $a(E, o, r, f), J = v({
    get: () => o.value ?? [],
    set: (b) => {
      f("update:itemsSelected", b);
    }
  }), Se = (b) => b.filter((x) => !r(x)), F = (b) => {
    J.value = b ? Se(E.value) : J.value = [], b && f("selectAll");
  }, z = (b) => {
    const x = b.checkbox;
    if (delete b.checkbox, delete b.index, x)
      J.value = J.value.filter(
        (k) => JSON.stringify(k) !== JSON.stringify(b)
      ), f("deselectRow", b);
    else {
      const k = J.value;
      k.unshift(b), J.value = k, f("selectRow", b);
    }
  };
  return {
    totalItems: E,
    selectItemsComputed: J,
    totalItemsLength: ee,
    toggleSelectAll: (b) => {
      if (!E.value.every((k) => r(k)))
        if (W.value) {
          f("updateSelectionStatus", !0);
          try {
            te(b), f("update:itemsSelected", b ? Array.from(ue.value) : []), b && f("selectAll");
          } finally {
            f("updateSelectionStatus", !1);
          }
        } else
          F(b);
    },
    toggleSelectItem: (b) => {
      r(b) || (W.value ? we(b) : z(b));
    },
    isProcessing: v(() => W.value && Ce.value),
    processProgress: ke
  };
}
var _e = {}, Je = {}, De = { exports: {} }, ht;
function Fa() {
  if (ht) return De.exports;
  ht = 1;
  var e = String, s = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return De.exports = s(), De.exports.createColors = s, De.exports;
}
var bt;
function Ba() {
  return bt || (bt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function s(n, u) {
      for (var r in u) Object.defineProperty(n, r, {
        enumerable: !0,
        get: u[r]
      });
    }
    s(e, {
      dim: function() {
        return d;
      },
      default: function() {
        return i;
      }
    });
    const t = /* @__PURE__ */ a(/* @__PURE__ */ Fa());
    function a(n) {
      return n && n.__esModule ? n : {
        default: n
      };
    }
    let o = /* @__PURE__ */ new Set();
    function l(n, u, r) {
      typeof process < "u" && process.env.JEST_WORKER_ID || r && o.has(r) || (r && o.add(r), console.warn(""), u.forEach((f) => console.warn(n, "-", f)));
    }
    function d(n) {
      return t.default.dim(n);
    }
    const i = {
      info(n, u) {
        l(t.default.bold(t.default.cyan("info")), ...Array.isArray(n) ? [
          n
        ] : [
          u,
          n
        ]);
      },
      warn(n, u) {
        l(t.default.bold(t.default.yellow("warn")), ...Array.isArray(n) ? [
          n
        ] : [
          u,
          n
        ]);
      },
      risk(n, u) {
        l(t.default.bold(t.default.magenta("risk")), ...Array.isArray(n) ? [
          n
        ] : [
          u,
          n
        ]);
      }
    };
  }(Je)), Je;
}
var yt;
function Ra() {
  return yt || (yt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const s = /* @__PURE__ */ t(Ba());
    function t(l) {
      return l && l.__esModule ? l : {
        default: l
      };
    }
    function a({ version: l, from: d, to: i }) {
      s.default.warn(`${d}-color-renamed`, [
        `As of Tailwind CSS ${l}, \`${d}\` has been renamed to \`${i}\`.`,
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
        return a({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return a({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return a({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return a({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return a({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(_e)), _e;
}
var Ye, xt;
function Aa() {
  if (xt) return Ye;
  xt = 1;
  let e = Ra();
  return Ye = (e.__esModule ? e : { default: e }).default, Ye;
}
var A = Aa();
const re = {
  slate: A.slate,
  gray: A.gray,
  zinc: A.zinc,
  neutral: A.neutral,
  stone: A.stone,
  red: A.red,
  orange: A.orange,
  amber: A.amber,
  yellow: A.yellow,
  lime: A.lime,
  green: A.green,
  emerald: A.emerald,
  teal: A.teal,
  cyan: A.cyan,
  sky: A.sky,
  blue: A.blue,
  indigo: A.indigo,
  violet: A.violet,
  purple: A.purple,
  fuchsia: A.fuchsia,
  pink: A.pink,
  rose: A.rose
}, et = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, La = (e) => {
  const s = Pt(e);
  if (!s) return { color: "indigo", variant: "DEFAULT" };
  let t = { color: "indigo", variant: "DEFAULT" }, a = 1 / 0;
  const o = Object.entries(re).reduce((l, [d, i]) => {
    if (typeof i == "object") {
      const n = d;
      Object.entries(et).forEach(([u, r]) => {
        i[r] && (l[i[r]] = { color: n, variant: u });
      });
    }
    return l;
  }, {});
  return Object.entries(o).forEach(([l, d]) => {
    const i = Pt(l);
    if (!i) return;
    const n = Ea(s, i);
    n < a && (a = n, t = d);
  }), t;
}, Ma = (e, s) => {
  const t = et[s], a = s === "dark" ? "700" : s === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": re[e][t],
    "--theme-border": re[e][t],
    "--theme-hover": re[e][a],
    "--theme-active": re[e][s === "light" ? "500" : s === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": re.gray[300],
    "--theme-light": re[e]["400"],
    "--theme-focus": re[e][t] + "80"
    // 添加 50% 透明度
  };
}, Ta = (e) => {
  const { color: s, variant: t = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? La(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : re[s][et[t]],
    tailwindName: s,
    style: Ma(s, t)
  };
};
function Pt(e) {
  const s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return s ? {
    r: parseInt(s[1], 16),
    g: parseInt(s[2], 16),
    b: parseInt(s[3], 16)
  } : null;
}
function Ea(e, s) {
  return Math.sqrt(
    Math.pow(s.r - e.r, 2) + Math.pow(s.g - e.g, 2) + Math.pow(s.b - e.b, 2)
  );
}
const Da = {}, Oa = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ha(e, s) {
  return y(), P("svg", Oa, s[0] || (s[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const ja = /* @__PURE__ */ be(Da, [["render", Ha]]), qa = {}, Wa = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function za(e, s) {
  return y(), P("svg", Wa, s[0] || (s[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ua = /* @__PURE__ */ be(qa, [["render", za]]), Va = {}, Ka = { class: "px-3 py-1.5" };
function Ga(e, s) {
  return y(), P("span", Ka, s[0] || (s[0] = [
    C("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      C("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const _a = /* @__PURE__ */ be(Va, [["render", Ga]]), Ja = {}, Ya = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Za(e, s) {
  return y(), P("svg", Ya, s[0] || (s[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Qa = /* @__PURE__ */ be(Ja, [["render", Za]]), Xa = {}, es = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ts(e, s) {
  return y(), P("svg", es, s[0] || (s[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const as = /* @__PURE__ */ be(Xa, [["render", ts]]), ss = /* @__PURE__ */ T({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (s, t) => (y(), P("span", {
      key: s.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        s.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      j(as, {
        class: S({ "transform rotate-180": s.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), ns = ["checked", "disabled", "aria-checked"], rs = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, os = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, ls = /* @__PURE__ */ T({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const s = e, t = v(() => s.checked), a = v(() => s.partial), o = Pe("themeClasses");
    return (l, d) => (y(), P("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !l.disabled && "cursor-pointer group",
        l.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: d[0] || (d[0] = Xe((i) => !l.disabled && l.$emit("change"), ["stop", "prevent"]))
    }, [
      C("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: t.value,
        disabled: l.disabled,
        "aria-checked": t.value
      }, null, 8, ns),
      C("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          t.value && !a.value && [
            "bg-theme border-theme",
            !l.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          a.value && [
            "bg-theme border-theme",
            !l.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !t.value && !a.value && [
            "border-gray-300 bg-white",
            !l.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !l.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: pe(p(o).style)
      }, [
        Ze((y(), P("svg", rs, d[1] || (d[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Qe, t.value && !a.value]
        ]),
        Ze((y(), P("svg", os, d[2] || (d[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Qe, a.value]
        ])
      ], 6)
    ], 2));
  }
}), St = /* @__PURE__ */ T({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: s }) {
    const t = s;
    return (a, o) => (y(), X(ls, {
      checked: a.checked,
      disabled: a.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (l) => t("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), is = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = e, a = v(() => t.status === "allSelected"), o = v(() => t.status === "partSelected"), l = s;
    return (d, i) => (y(), X(St, {
      checked: a.value,
      partial: o.value,
      disabled: e.disabled,
      onChange: i[0] || (i[0] = (n) => l("change", !a.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), us = {
  key: 1,
  class: "items-center gap-2"
}, ds = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, cs = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = s, a = kt(), o = (d) => [
      `header-${d.value}`,
      `header-${d.value.toLowerCase()}`,
      "header"
    ].find((n) => a[n]) || "header", l = (d) => {
      d.sortable && d.sortType && t("headerClick", d);
    };
    return (d, i) => (y(), P("th", {
      style: pe(e.fixedDistance),
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
      onClick: i[1] || (i[1] = Xe((n) => l(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (y(), X(is, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: i[0] || (i[0] = (n) => d.$emit("toggleSelectAll", n))
      }, null, 8, ["disabled", "status"])) : (y(), P("div", us, [
        I(d.$slots, o(e.header), U(oe({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, K(e.header.text), 1)
        ]),
        e.header.sortable ? (y(), X(p(ss), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : H("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (y(), P("span", ds, K(e.getMultiSortNumber(e.header.value)), 1)) : H("", !0)
      ]))
    ], 6));
  }
}), fs = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = s, a = (l) => {
      t("headerClick", l);
    }, o = (l) => {
      t("toggleSelectAll", l);
    };
    return (l, d) => e.headers.length && !e.hideHeader ? (y(), P("thead", {
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
        (y(!0), P(ie, null, _(e.headers, (i, n) => (y(), X(cs, {
          key: n,
          header: i,
          index: n,
          "fixed-distance": e.getFixedDistance(i.value),
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
        }, xe({ _: 2 }, [
          _(l.$slots, (u, r) => ({
            name: r,
            fn: le((f) => [
              I(l.$slots, r, V({ ref_for: !0 }, f))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : H("", !0);
  }
}), gs = /* @__PURE__ */ T({
  __name: "TableBodyCell",
  props: {
    column: {},
    item: {},
    index: {},
    style: {},
    isDisabled: { type: Boolean },
    expandColumn: {},
    isExpanded: { type: Boolean },
    bodyItemClassName: { type: [String, Function] },
    getFixedDistance: { type: Function },
    getFixedColumnClasses: { type: Function }
  },
  emits: ["toggle-select", "toggle-expand"],
  setup(e, { emit: s }) {
    const t = e, a = s, o = v(() => t.isDisabled ?? !1), l = v(() => typeof t.bodyItemClassName == "function" ? t.bodyItemClassName(t.column, t.index) : t.bodyItemClassName), d = v(
      () => t.column === "expand" || t.column === t.expandColumn
    ), i = v(() => {
      if (t.getFixedDistance)
        return t.getFixedDistance(t.column, "td");
    }), n = v(() => t.getFixedColumnClasses ? t.getFixedColumnClasses(t.column) || [] : []), u = v(() => {
      let c = t.style || "";
      return i.value && (c += i.value), n.value.length > 0 && (c += " background-color: inherit;"), c;
    }), r = () => {
      d.value && t.expandColumn === "" && a("toggle-expand", event);
    }, f = (c) => {
      a("toggle-expand", c);
    }, m = () => {
      a("toggle-select");
    };
    return (c, h) => (y(), P("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": c.column === "expand" && c.expandColumn === "" },
        ...n.value,
        l.value
      ]]),
      style: pe(u.value),
      onClick: r
    }, [
      c.column === "checkbox" ? (y(), P(ie, { key: 0 }, [
        c.column === "checkbox" ? I(c.$slots, "selection-checkbox", U(V({ key: 0 }, { item: c.item, index: c.index, isDisabled: o.value, toggleSelectItem: m })), () => [
          j(St, {
            checked: !!c.item.checkbox,
            disabled: o.value,
            onChange: m
          }, null, 8, ["checked", "disabled"])
        ]) : H("", !0)
      ], 64)) : d.value ? I(c.$slots, "expand-button", U(V({ key: 1 }, { item: c.item, expanded: c.isExpanded, toggle: f })), () => [
        C("button", {
          onClick: Xe(f, ["stop"]),
          class: "inline-flex items-center"
        }, [
          j(p(Qa), {
            class: S({ "transform rotate-90": c.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : I(c.$slots, `item-${c.column}`, U(V({ key: 2 }, c.item)), () => [
        I(c.$slots, `item-${c.column.toLowerCase()}`, U(oe(c.item)), () => [
          I(c.$slots, "item", U(oe({ column: c.column, item: c.item })), () => [
            Oe(K(p(Ia)(c.column, c.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), ps = /* @__PURE__ */ T({
  __name: "TableBodyRow",
  props: {
    item: {},
    index: {},
    columns: {},
    alternating: { type: Boolean },
    noHover: { type: Boolean },
    borderRow: { type: Boolean },
    borderCell: { type: Boolean },
    bodyRowClassName: { type: [String, Function] },
    isExpanded: { type: Boolean },
    isDisabled: { type: Boolean },
    expandColumn: {},
    getFixedDistance: { type: Function },
    getFixedColumnClasses: { type: Function },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: s }) {
    const t = e, a = s, o = v(() => typeof t.bodyRowClassName == "function" ? t.bodyRowClassName(t.item, t.index) : t.bodyRowClassName), l = (n) => {
      a("click", n, t.item, t.index);
    }, d = (n) => {
      a("dblclick", n, t.item, t.index);
    }, i = (n) => {
      a("contextmenu", n, t.item);
    };
    return (n, u) => (y(), P("tr", {
      class: S(["vdt-tbody-tr transition-colors", [
        { "bg-white": n.alternating && n.index % 2 === 0 },
        { "bg-gray-50": !n.alternating || n.index % 2 === 1 },
        { "hover:bg-gray-100": !n.noHover },
        { "divide-x divide-gray-200": n.borderCell },
        { "border-b border-gray-200 last:border-b-0 first:border-t": n.borderRow },
        o.value
      ]]),
      onClick: l,
      onDblclick: d,
      onContextmenu: i
    }, [
      I(n.$slots, "prepend"),
      (y(!0), P(ie, null, _(n.columns, (r, f) => (y(), X(gs, {
        key: f,
        column: r,
        item: n.item,
        index: n.index,
        "get-fixed-distance": n.getFixedDistance,
        "get-fixed-column-classes": n.getFixedColumnClasses,
        "is-disabled": n.isDisabled,
        "expand-column": n.expandColumn,
        "is-expanded": n.isExpanded,
        "body-item-class-name": n.bodyItemClassName,
        onToggleExpand: u[0] || (u[0] = (m) => n.$emit("toggle-expand", m, n.index, n.item)),
        onToggleSelect: u[1] || (u[1] = () => n.$emit("toggle-select", n.item))
      }, xe({ _: 2 }, [
        _(n.$slots, (m, c) => ({
          name: c,
          fn: le((h) => [
            I(n.$slots, c, V({ ref_for: !0 }, h))
          ])
        }))
      ]), 1032, ["column", "item", "index", "get-fixed-distance", "get-fixed-column-classes", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]))), 128)),
      I(n.$slots, "append")
    ], 34));
  }
}), ms = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, vs = /* @__PURE__ */ T({
  __name: "LoadingLine",
  setup(e) {
    const s = Pe("themeClasses");
    return (t, a) => (y(), P("div", ms, [
      C("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: pe({ backgroundColor: p(s).hex })
      }, null, 4)
    ]));
  }
}), hs = /* @__PURE__ */ be(vs, [["__scopeId", "data-v-cbdc3562"]]), bs = ["colspan"], ys = { class: "overflow-hidden" }, xs = /* @__PURE__ */ T({
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
    const s = e, t = v(() => typeof s.bodyExpandRowClassName == "function" ? s.bodyExpandRowClassName(s.item, s.index) : s.bodyExpandRowClassName);
    return (a, o) => (y(), P("tr", {
      class: S(["vdt-expand-row border-0", [t.value, { "bg-gray-50": (a.index + 1) % 2 === 0, "border-t": a.isExpanded }]])
    }, [
      C("td", {
        colspan: a.columnsCount,
        class: "relative p-0"
      }, [
        a.loading ? (y(), X(hs, {
          key: 0,
          class: "mb-4"
        })) : H("", !0),
        C("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": a.isExpanded }]])
        }, [
          C("div", ys, [
            I(a.$slots, "default")
          ])
        ], 2)
      ], 8, bs)
    ], 2));
  }
}), Ps = { class: "flex items-center gap-2 text-sm text-gray-700" }, ws = { class: "relative inline-block min-w-[70px]" }, Cs = ["aria-expanded"], ks = { class: "block truncate" }, Ss = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, Is = ["aria-selected", "onClick"], $s = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, Ns = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = e, a = s, o = Q(!1), l = Q(!1), d = v({
      get: () => t.modelValue,
      set: (m) => a("update:modelValue", m)
    }), i = Pe("dataTable");
    ge(o, (m) => {
      if (m && (i != null && i.value)) {
        const c = window.innerHeight, h = i.value.getBoundingClientRect(), w = c - (h.height + h.top);
        l.value = w <= 100;
      }
    });
    const n = (m) => {
      d.value = m, o.value = !1;
    }, u = () => {
      o.value = !o.value;
    }, r = (m) => {
      m.target.closest(".relative") || (o.value = !1);
    }, f = (m) => {
      const c = m.relatedTarget;
      c != null && c.closest(".relative") || (o.value = !1);
    };
    return Ct(() => {
      document.addEventListener("click", r);
    }), Zt(() => {
      document.removeEventListener("click", r);
    }), (m, c) => (y(), P("div", Ps, [
      Oe(K(e.message) + " ", 1),
      C("div", ws, [
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
          C("span", ks, K(d.value), 1),
          C("span", Ss, [
            (y(), P("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": o.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, c[0] || (c[0] = [
              C("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, Cs),
        j(Qt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: le(() => [
            o.value ? (y(), P("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": l.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: f
            }, [
              (y(!0), P(ie, null, _(e.rowsItems, (h) => (y(), P("li", {
                key: h,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  h === d.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": h === d.value,
                onClick: (w) => n(h)
              }, [
                C("span", {
                  class: S(["block", { "font-medium": h === d.value }])
                }, K(h), 3),
                h === d.value ? (y(), P("span", $s, c[1] || (c[1] = [
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
                ]))) : H("", !0)
              ], 10, Is))), 128))
            ], 34)) : H("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Fs = { class: "text-sm text-gray-700" }, Bs = /* @__PURE__ */ T({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (s, t) => (y(), P("div", Fs, [
      I(s.$slots, "default", {
        firstIndex: s.currentPageFirstIndex,
        lastIndex: s.currentPageLastIndex,
        total: s.totalItemsLength,
        separator: s.rowsOfPageSeparatorMessage
      }, () => [
        Oe(K(`${s.currentPageFirstIndex}–${s.currentPageLastIndex}`) + " " + K(s.rowsOfPageSeparatorMessage) + " " + K(s.totalItemsLength), 1)
      ])
    ]));
  }
}), Rs = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, As = ["disabled"], Ls = ["disabled"], wt = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = s;
    return (a, o) => (y(), P("div", Rs, [
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
        onClick: o[0] || (o[0] = (l) => t("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        j(p(Ua), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, As),
      I(a.$slots, "buttonsPagination"),
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
        onClick: o[1] || (o[1] = (l) => t("clickNextPage")),
        "aria-label": "Next page"
      }, [
        j(p(ja), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Ls)
    ]));
  }
}), Ms = {
  class: "vdt-pagination inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Ts = ["onClick"], he = 7, Es = /* @__PURE__ */ T({
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
  setup(e, { emit: s }) {
    const t = e, a = s, o = Pe("themeClasses"), l = (i) => {
      i.type === "button" && !i.active && a("updatePage", i.page);
    }, d = v(() => {
      const i = [], { maxPaginationNumber: n, currentPaginationNumber: u } = t;
      if (n <= he) {
        for (let r = 1; r <= n; r += 1)
          i.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          });
        return i;
      }
      if ([1, 2, n, n - 1].includes(u))
        for (let r = 1; r <= he; r += 1)
          if (r <= 3)
            i.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: r + 1 === u
            });
          else if (r === 4)
            i.push({ type: "omission" });
          else {
            const f = n - (he - r);
            i.push({
              type: "button",
              page: f,
              active: f === u,
              activePrev: f + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let r = 1; r <= he; r += 1)
          r <= 5 ? i.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          }) : r === 6 ? i.push({ type: "omission" }) : i.push({
            type: "button",
            page: n,
            active: n === u,
            activePrev: !1
          });
      else if ([n - 2, n - 3].includes(u))
        for (let r = 1; r <= he; r += 1)
          if (r === 1)
            i.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2)
            i.push({ type: "omission" });
          else {
            const f = n - (he - r);
            i.push({
              type: "button",
              page: f,
              active: f === u,
              activePrev: f + 1 === u
            });
          }
      else
        for (let r = 1; r <= he; r += 1)
          if (r === 1)
            i.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2 || r === 6)
            i.push({ type: "omission" });
          else if (r === 7)
            i.push({
              type: "button",
              page: n,
              active: n === u,
              activePrev: !1
            });
          else {
            const f = 4 - r, m = u - f;
            i.push({
              type: "button",
              page: m,
              active: m === u,
              activePrev: m + 1 === u
            });
          }
      return i;
    });
    return (i, n) => (y(), P("div", Ms, [
      (y(!0), P(ie, null, _(d.value, (u, r) => (y(), P("div", {
        key: r,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          r === 0 && "rounded-l-md",
          // Last item styles
          r === d.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              p(o).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${p(o).tailwindName}-500`,
              `focus:border-${p(o).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            r !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            r !== 0 && "-ml-px"
          ]
        ]]),
        style: pe(p(o).style),
        onClick: (f) => l(u)
      }, [
        u.type === "button" ? (y(), P("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, K(u.page), 3)) : (y(), X(p(_a), { key: 1 }))
      ], 14, Ts))), 128))
    ]));
  }
}), Ds = { class: "flex-1 flex justify-center" }, Os = { class: "text-sm text-gray-600 px-3" }, Hs = { class: "flex-1 flex items-center justify-start" }, js = {
  key: 0,
  class: "text-sm text-gray-600"
}, qs = { class: "flex-1 flex items-center justify-center" }, Ws = {
  key: 0,
  class: "text-sm text-gray-600"
}, zs = { class: "flex-1 flex items-center justify-end" }, Us = /* @__PURE__ */ T({
  __name: "TableFooter",
  props: {
    hideRowsPerPage: { type: Boolean },
    hidePaginationInfo: { type: Boolean },
    buttonsPagination: { type: Boolean },
    showShadow: { type: Boolean },
    footerClassName: { default: "" },
    mobileFooterClasses: { default: "" },
    desktopFooterClasses: { default: "" },
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
  setup(e, { emit: s }) {
    const t = e, a = s;
    v(() => ({
      rowsPerPage: t.rowsPerPage,
      rowsItems: t.rowsItems,
      rowsPerPageMessage: t.rowsPerPageMessage,
      updateRowsPerPage: (l) => a("update:rowsPerPage", l)
    })), v(() => ({
      currentPageFirstIndex: t.currentPageFirstIndex,
      currentPageLastIndex: t.currentPageLastIndex,
      totalItemsLength: t.totalItemsLength,
      rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage
    })), v(() => ({
      isFirstPage: t.isFirstPage,
      isLastPage: t.isLastPage,
      currentPaginationNumber: t.currentPaginationNumber,
      maxPaginationNumber: t.maxPaginationNumber,
      buttonsPagination: t.buttonsPagination,
      nextPage: () => a("nextPage"),
      prevPage: () => a("prevPage"),
      updatePage: (l) => a("updatePage", l)
    }));
    const o = v(() => ({
      // 原始 props (扁平化，方便直接使用)
      ...t,
      // 分頁資訊 (結構化)
      paginationInfo: {
        currentPageFirstIndex: t.currentPageFirstIndex,
        currentPageLastIndex: t.currentPageLastIndex,
        totalItemsLength: t.totalItemsLength,
        rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage
      },
      // 分頁操作 (結構化)
      pagination: {
        isFirstPage: t.isFirstPage,
        isLastPage: t.isLastPage,
        currentPaginationNumber: t.currentPaginationNumber,
        maxPaginationNumber: t.maxPaginationNumber,
        buttonsPagination: t.buttonsPagination,
        nextPage: () => a("nextPage"),
        prevPage: () => a("prevPage"),
        updatePage: (l) => a("updatePage", l)
      },
      // 每頁行數 (結構化)
      rowsPerPage: {
        current: t.rowsPerPage,
        options: t.rowsItems,
        message: t.rowsPerPageMessage,
        update: (l) => a("update:rowsPerPage", l)
      },
      // 便利方法 (扁平化，向後相容)
      updateRowsPerPage: (l) => a("update:rowsPerPage", l),
      nextPage: () => a("nextPage"),
      prevPage: () => a("prevPage"),
      updatePage: (l) => a("updatePage", l)
    }));
    return (l, d) => (y(), P("div", {
      class: S(["vdt-footer", [
        "bg-white border border-gray-200 border-t-0",
        { "shadow-sm": l.showShadow },
        l.footerClassName
      ]])
    }, [
      I(l.$slots, "footer-mobile", U(oe(o.value)), () => [
        C("div", {
          class: S(["vdt-footer-mobile sm:hidden px-4 py-3 w-full", l.mobileFooterClasses])
        }, [
          j(wt, {
            "is-first-page": l.isFirstPage,
            "is-last-page": l.isLastPage,
            onClickNextPage: d[0] || (d[0] = () => a("nextPage")),
            onClickPrevPage: d[1] || (d[1] = () => a("prevPage")),
            class: "sm:hidden flex items-center justify-between w-full"
          }, {
            buttonsPagination: le(() => [
              C("div", Ds, [
                C("span", Os, K(l.currentPaginationNumber) + " / " + K(l.maxPaginationNumber), 1)
              ])
            ]),
            _: 1
          }, 8, ["is-first-page", "is-last-page"])
        ], 2)
      ]),
      I(l.$slots, "footer-desktop", U(oe(o.value)), () => [
        C("div", {
          class: S(["vdt-footer-desktop hidden sm:flex items-center justify-between px-4 py-3 w-full", l.desktopFooterClasses])
        }, [
          C("div", Hs, [
            I(l.$slots, "rows-per-page", V(o.value.rowsPerPage, { rawProps: o.value }), () => [
              l.hideRowsPerPage ? H("", !0) : (y(), P("div", js, [
                j(Ns, {
                  "model-value": l.rowsPerPage,
                  "rows-items": l.rowsItems,
                  message: l.rowsPerPageMessage,
                  "onUpdate:modelValue": d[2] || (d[2] = (i) => a("update:rowsPerPage", i))
                }, null, 8, ["model-value", "rows-items", "message"])
              ]))
            ])
          ]),
          C("div", qs, [
            I(l.$slots, "pagination-info", V(o.value.paginationInfo, { rawProps: o.value }), () => [
              l.hidePaginationInfo ? H("", !0) : (y(), P("div", Ws, [
                j(Bs, {
                  "current-page-first-index": l.currentPageFirstIndex,
                  "current-page-last-index": l.currentPageLastIndex,
                  "total-items-length": l.totalItemsLength,
                  "rows-of-page-separator-message": l.rowsOfPageSeparatorMessage
                }, null, 8, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])
              ]))
            ])
          ]),
          C("div", zs, [
            I(l.$slots, "pagination", V(o.value.pagination, { rawProps: o.value }), () => [
              j(wt, {
                "is-first-page": l.isFirstPage,
                "is-last-page": l.isLastPage,
                onClickNextPage: d[4] || (d[4] = () => a("nextPage")),
                onClickPrevPage: d[5] || (d[5] = () => a("prevPage"))
              }, xe({ _: 2 }, [
                l.buttonsPagination ? {
                  name: "buttonsPagination",
                  fn: le(() => [
                    j(Es, {
                      "current-pagination-number": l.currentPaginationNumber,
                      "max-pagination-number": l.maxPaginationNumber,
                      onUpdatePage: d[3] || (d[3] = (i) => a("updatePage", i))
                    }, null, 8, ["current-pagination-number", "max-pagination-number"])
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["is-first-page", "is-last-page"])
            ])
          ])
        ], 2)
      ])
    ], 2));
  }
}), Vs = ["id"], Ks = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Gs = { class: "relative z-10" }, _s = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Js = {
  key: 0,
  class: "vdt-footer-section"
}, It = /* @__PURE__ */ T({
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
    borderRow: { type: Boolean, default: !0 },
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
    mobileFooterClasses: { default: "" },
    desktopFooterClasses: { default: "" },
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
  setup(e, { expose: s, emit: t }) {
    const a = e, {
      checkboxColumnWidth: o,
      expandColumnWidth: l,
      indexColumnWidth: d,
      rowsItems: i,
      showIndexSymbol: n,
      currentPage: u,
      filterOptions: r,
      headers: f,
      itemsSelected: m,
      loading: c,
      items: h,
      rowsPerPage: w,
      searchField: $,
      searchValue: N,
      serverItemsLength: q,
      showIndex: E,
      sortBy: ee,
      sortType: W,
      serverOptions: ue,
      multiSort: te,
      mustSort: we,
      clickEventType: Ce,
      clickRowToExpand: ke,
      clickRowToSelect: J,
      fixedExpand: Se,
      fixedCheckbox: F,
      fixedIndex: z,
      batchSelectionThreshold: O,
      expandColumn: G
    } = Xt(a), b = v(() => Ta(a.theme));
    pt("themeClasses", b);
    const x = kt(), k = v(() => !!x.expand), M = v(() => !!x.body), de = v(() => {
      const g = {};
      return ["rows-per-page", "pagination-info", "pagination"].forEach((B) => {
        x[B] && (g[B] = x[B]);
      }), Object.keys(x).forEach((B) => {
        B.startsWith("footer-") && B !== "footer-content" && (g[B] = x[B]);
      }), g;
    }), ce = v(
      () => typeof a.expandTransition < "u" ? a.expandTransition : k.value
    ), Ie = Q(null), fe = Q(null);
    pt("dataTable", Ie);
    const ae = t, $e = v(() => m.value !== null), Y = v(() => ue.value !== null), $t = v(() => ({
      // 分頁相關
      currentPaginationNumber: se.value,
      maxPaginationNumber: Fe.value,
      isFirstPage: Re.value,
      isLastPage: Be.value,
      // 資料相關
      currentPageFirstIndex: We.value,
      currentPageLastIndex: ze.value,
      totalItemsLength: Ne.value,
      // 每頁行數相關
      rowsPerPage: ve.value,
      rowsItems: je.value,
      rowsPerPageMessage: a.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: a.rowsOfPageSeparatorMessage,
      // 配置相關
      hideRowsPerPage: a.hideRowsPerPage,
      hidePaginationInfo: a.hidePaginationInfo,
      buttonsPagination: a.buttonsPagination,
      // 方法
      nextPage: Ae,
      prevPage: Le,
      updatePage: ye,
      updateRowsPerPage: qe,
      // 原始資料（如果需要的話）
      items: ne.value,
      headers: me.value,
      // 選擇相關
      selectedItems: nt.value,
      multipleSelectStatus: ot.value,
      // 主題
      theme: a.theme
    })), Nt = v(() => ({
      hideFooter: !1,
      // 已在外層處理
      hideRowsPerPage: a.hideRowsPerPage,
      hidePaginationInfo: a.hidePaginationInfo,
      buttonsPagination: a.buttonsPagination,
      showShadow: ft.value,
      footerClassName: a.footerClassName,
      mobileFooterClasses: a.mobileFooterClasses,
      desktopFooterClasses: a.desktopFooterClasses,
      rowsPerPage: ve.value,
      rowsItems: je.value,
      rowsPerPageMessage: a.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: a.rowsOfPageSeparatorMessage,
      currentPageFirstIndex: We.value,
      currentPageLastIndex: ze.value,
      totalItemsLength: Ne.value,
      currentPaginationNumber: se.value,
      maxPaginationNumber: Fe.value,
      isFirstPage: Re.value,
      isLastPage: Be.value
    })), {
      serverOptionsComputed: He,
      updateServerOptionsPage: Ft,
      updateServerOptionsSort: Bt,
      updateServerOptionsRowsPerPage: Rt
    } = Pa(
      ue,
      te,
      ae
    ), {
      clientSortOptions: tt,
      headerColumns: at,
      headersForRender: me,
      updateSortField: At,
      isMultiSorting: Lt,
      getMultiSortNumber: Mt
    } = fa(
      n,
      o,
      l,
      F,
      Se,
      z,
      f,
      k,
      d,
      $e,
      Y,
      we,
      He,
      E,
      ee,
      W,
      te,
      G,
      Bt,
      ae
    ), {
      rowsItemsComputed: je,
      rowsPerPageRef: ve,
      updateRowsPerPage: qe
    } = xa(
      Y,
      i,
      ue,
      w
    ), {
      totalItems: st,
      selectItemsComputed: nt,
      totalItemsLength: Ne,
      toggleSelectAll: Tt,
      toggleSelectItem: rt,
      isProcessing: Et,
      processProgress: Dt
    } = Na(
      tt,
      r,
      Y,
      h,
      m,
      $,
      N,
      q,
      te,
      O,
      a.disabledRows,
      ae
    ), {
      currentPaginationNumber: se,
      maxPaginationNumber: Fe,
      isLastPage: Be,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Le,
      updatePage: ye,
      updateCurrentPaginationNumber: Ot
    } = ya(
      u,
      Y,
      c,
      Ne,
      ve,
      ue,
      Ft
    ), {
      currentPageFirstIndex: We,
      currentPageLastIndex: ze,
      multipleSelectStatus: ot,
      pageItems: ne
    } = ba(
      se,
      $e,
      Y,
      h,
      ve,
      nt,
      E,
      st,
      Ne,
      a.disabledRows
    ), Me = v(() => se.value === 0 ? 0 : (se.value - 1) * ve.value), {
      expandingItemIndexList: Ue,
      updateExpandingItemIndexList: lt,
      clearExpandingItemIndexList: it
    } = da(
      ne,
      Me,
      ae
    ), {
      fixedHeaders: Ve,
      lastLeftFixedColumn: ut,
      firstRightFixedColumn: dt,
      fixedColumnsInfos: ct,
      showShadow: ft
    } = ca(
      me,
      fe
    ), Ht = (g) => {
      const B = g.width ?? (Ve.value.length ? 100 : null);
      if (B) return `width: ${B}px; min-width: ${B}px;`;
    }, gt = (g, B = "th") => {
      if (!Ve.value.length) return;
      const L = ct.value.find((R) => R.value === g);
      if (L)
        return `
            position: sticky;
            ${L.position === "left" ? `left: ${L.distance}px;` : `right: ${L.distance}px;`}
            z-index: ${B === "th" ? 3 : 1};
        `;
    }, jt = (g) => {
      var R, D;
      if (!Ve.value.length) return [];
      const B = [];
      return ct.value.find((Te) => Te.value === g) && (B.push("fixed-column"), a.borderRow && fe.value && ((R = fe.value) == null ? void 0 : R.scrollWidth) > ((D = fe.value) == null ? void 0 : D.clientWidth) && B.push("shadow-[inset_0_1px_0_#e5e7eb]"), g === ut.value ? B.push("fixed-left-shadow") : g === dt.value && B.push("fixed-right-shadow")), B;
    }, qt = (g) => {
      g.sortable && g.sortType && At(g.value, g.sortType);
    }, Ke = (g) => typeof a.disabledRows == "function" ? a.disabledRows(g) : !1, Wt = v(() => ne.value.every((g) => a.disabledRows(g))), zt = (g) => {
      Ke(g) || rt(g);
    }, {
      handleRowClick: Ut,
      handleRowDoubleClick: Vt,
      handleRowContextMenu: Kt
    } = ua(
      Ce,
      $e,
      E,
      Ke,
      ke,
      J,
      lt,
      rt,
      ae
    );
    return ge(c, (g, B) => {
      He.value && g === !1 && B === !0 && (Ot(He.value.page), it());
    }), ge(ve, (g) => {
      Y.value ? Rt(g) : ye(1);
    }), ge([N, r], () => {
      Y.value || ye(1);
    }), ge([se, tt, $, N, r], () => {
      it();
    }, { deep: !0 }), ge(ne, (g) => {
      ae("updatePageItems", g);
    }, { deep: !0 }), ge(st, (g) => {
      ae("updateTotalItems", g);
    }, { deep: !0 }), s({
      currentPageFirstIndex: We,
      currentPageLastIndex: ze,
      clientItemsLength: Ne,
      maxPaginationNumber: Fe,
      currentPaginationNumber: se,
      isLastPage: Be,
      isFirstPage: Re,
      nextPage: Ae,
      prevPage: Le,
      updatePage: ye,
      rowsPerPageOptions: je,
      rowsPerPageActiveOption: ve,
      updateRowsPerPageActiveOption: qe
    }), (g, B) => (y(), P("div", {
      ref_key: "tableWrapper",
      ref: Ie,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: fe,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "show-shadow": p(ft) }, g.containerClassName]])
      }, [
        C("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [
            g.tableClassName
          ]])
        }, [
          C("colgroup", null, [
            (y(!0), P(ie, null, _(p(me), (L, R) => (y(), P("col", {
              key: R,
              style: pe(Ht(L))
            }, null, 4))), 128))
          ]),
          p(x)["customize-headers"] ? I(g.$slots, "customize-headers", { key: 0 }) : H("", !0),
          j(fs, V({
            headers: p(me),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: p(ut),
            firstRightFixedColumn: p(dt),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Wt.value,
            multipleSelectStatus: p(ot),
            multiSort: p(te)
          }, {
            "is-multi-sorting": p(Lt),
            "get-multi-sort-number": p(Mt),
            "get-fixed-distance": gt,
            onHeaderClick: qt,
            onToggleSelectAll: p(Tt)
          }), xe({ _: 2 }, [
            _(g.$slots, (L, R) => ({
              name: R,
              fn: le((D) => [
                I(g.$slots, R, U(oe(D)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          M.value ? I(g.$slots, "body", U(V({ key: 1 }, p(ne)))) : p(at).length ? (y(), P("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            I(g.$slots, "body-prepend", U(oe({
              items: p(ne),
              pagination: { isFirstPage: p(Re), isLastPage: p(Be), currentPaginationNumber: p(se), maxPaginationNumber: p(Fe), nextPage: p(Ae), prevPage: p(Le) },
              headers: p(me)
            }))),
            (y(!0), P(ie, null, _(p(ne), (L, R) => (y(), P(ie, {
              key: L.key || R
            }, [
              j(ps, {
                item: L,
                index: R,
                columns: p(at),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "border-row": g.borderRow,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": p(Ue).includes(R + Me.value),
                "is-disabled": Ke(L),
                "expand-column": p(G),
                "get-fixed-distance": gt,
                "get-fixed-column-classes": jt,
                onClick: (D) => p(Ut)(D, L, R),
                onDblclick: (D) => p(Vt)(D, L, R),
                onContextmenu: (D) => p(Kt)(D, L),
                onToggleExpand: (D) => p(lt)(R, L, D),
                onToggleSelect: (D) => zt(L)
              }, xe({ _: 2 }, [
                _(g.$slots, (D, Te) => ({
                  name: Te,
                  fn: le((Gt) => [
                    I(g.$slots, Te, V({ ref_for: !0 }, Gt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "border-row", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ce.value || p(Ue).includes(R + Me.value) ? (y(), X(xs, {
                key: 0,
                item: L,
                index: R,
                "columns-count": p(me).length,
                loading: L.expandLoading,
                "is-expanded": p(Ue).includes(R + Me.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: le(() => [
                  I(g.$slots, "expand", V({ ref_for: !0 }, L))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : H("", !0)
            ], 64))), 128)),
            I(g.$slots, "body-append", U(oe({
              items: p(ne),
              pagination: { isFirstPage: p(Re), isLastPage: p(Be), currentPaginationNumber: p(se), maxPaginationNumber: p(Fe), nextPage: p(Ae), prevPage: p(Le), updatePage: p(ye) },
              headers: p(me)
            })))
          ], 2)) : H("", !0)
        ], 10, Vs),
        p(c) ? (y(), P("div", Ks, [
          C("div", Gs, [
            I(g.$slots, "loading", {}, () => [
              j(aa)
            ])
          ])
        ])) : H("", !0),
        !p(ne).length && !p(c) ? (y(), P("div", _s, [
          I(g.$slots, "empty-message", {}, () => [
            Oe(K(g.emptyMessage), 1)
          ])
        ])) : H("", !0)
      ], 2),
      g.hideFooter ? H("", !0) : (y(), P("div", Js, [
        g.$slots["footer-content"] ? I(g.$slots, "footer-content", U(V({ key: 0 }, $t.value))) : (y(), X(Us, V({ key: 1 }, Nt.value, {
          "onUpdate:rowsPerPage": p(qe),
          onNextPage: p(Ae),
          onPrevPage: p(Le),
          onUpdatePage: p(ye)
        }), xe({ _: 2 }, [
          _(de.value, (L, R) => ({
            name: R,
            fn: le((D) => [
              I(g.$slots, R, U(oe(D)))
            ])
          }))
        ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]))
      ])),
      Ze(j(ia, { progress: p(Dt) }, null, 8, ["progress"]), [
        [Qe, p(Et)]
      ])
    ], 2));
  }
}), Ys = (e) => {
  e.component("DataTable", It);
};
It.install = Ys;
export {
  Xs as createFilter,
  It as default,
  Ys as install
};
