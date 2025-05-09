var Dt = Object.defineProperty;
var Ht = (e, t, a) => t in e ? Dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var De = (e, t, a) => Ht(e, typeof t != "symbol" ? t + "" : t, a);
import { createElementBlock as w, openBlock as k, Fragment as se, renderList as Q, createElementVNode as C, normalizeClass as S, defineComponent as L, normalizeStyle as Me, toDisplayString as W, ref as _, computed as y, onMounted as dt, onUnmounted as Ot, watch as ce, createVNode as V, withModifiers as qe, withDirectives as He, vShow as Oe, createBlock as K, useSlots as gt, renderSlot as N, createCommentVNode as D, normalizeProps as j, guardReactiveProps as ne, unref as h, createSlots as ge, withCtx as G, mergeProps as Z, createTextVNode as Ae, inject as jt, onBeforeUnmount as zt, Transition as qt, toRefs as Vt, provide as Wt } from "vue";
const he = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [l, o] of t)
    a[l] = o;
  return a;
}, Kt = {}, Ut = { class: "inline-flex relative w-[60px] h-[60px]" };
function Jt(e, t) {
  return k(), w("div", Ut, [
    (k(), w(se, null, Q(4, (a) => C("div", {
      key: a,
      class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring border-t-vdt-primary-500", [`animate-delay-${(a - 1) * 150}`]])
    }, null, 2)), 64))
  ]);
}
const Gt = /* @__PURE__ */ he(Kt, [["render", Jt], ["__scopeId", "data-v-c23c712b"]]), Zt = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Qt = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Xt = { class: "w-64" }, Yt = { class: "h-2 bg-gray-200 rounded-sm" }, _t = { class: "text-center text-sm text-gray-600" }, ea = /* @__PURE__ */ L({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    return (t, a) => (k(), w("div", Zt, [
      C("div", Qt, [
        a[0] || (a[0] = C("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        C("div", Xt, [
          C("div", Yt, [
            C("div", {
              class: "h-2 rounded-sm transition-all duration-300 ease-out bg-vdt-primary-500",
              style: Me({ width: `${t.progress}%` })
            }, null, 4)
          ])
        ]),
        C("div", _t, W(Math.round(t.progress)) + "% ", 1)
      ])
    ]));
  }
});
function ta(e, t, a, l, o, s, u, r, n) {
  const i = (d, p) => {
    const x = { ...d };
    return t.value && (delete x.checkbox, x.isSelected = d.checkbox), a.value && (delete x.index, x.indexInCurrentPage = p + 1), x;
  };
  return {
    handleRowClick: (d, p, x) => {
      if (!d.target.closest(".checkbox, .expand-button") && (o.value && u(x, p, d), s.value && !l(p) && r(p), e.value === "single")) {
        const I = i(p, x);
        n("clickRow", I, d);
      }
    },
    handleRowDoubleClick: (d, p, x) => {
      if (e.value === "double") {
        const I = i(p, x);
        n("clickRow", I, d);
      }
    },
    handleRowContextMenu: (d, p) => {
      const x = i(p, -1);
      n("contextmenuRow", x, d);
    }
  };
}
function aa(e, t, a) {
  const l = _([]);
  return {
    expandingItemIndexList: l,
    // 展開項的索引列表
    updateExpandingItemIndexList: (u, r, n) => {
      n.stopPropagation();
      const i = l.value.indexOf(u);
      if (i !== -1)
        l.value.splice(i, 1);
      else {
        const c = e.value.findIndex((m) => JSON.stringify(m) === JSON.stringify(r));
        a("expandRow", t.value + c, r), l.value.push(t.value + c);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      l.value = [];
    }
    // 清空展開列表的方法
  };
}
function la(e, t) {
  const a = y(() => e.value.filter((c) => c.fixed)), l = y(() => a.value.filter((c) => !c.fixedPosition || c.fixedPosition === "left")), o = y(() => a.value.filter((c) => c.fixedPosition === "right")), s = y(() => l.value.length ? l.value[l.value.length - 1].value : ""), u = y(() => o.value.length ? o.value[0].value : ""), r = y(() => {
    if (!a.value.length) return [];
    const c = [];
    if (l.value.length) {
      const m = l.value.map((f) => f.width ?? 100);
      l.value.forEach((f, d) => {
        c.push({
          value: f.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: f.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: d === 0 ? 0 : m.reduce((p, x, I) => I < d ? p + x : p, 0)
        });
      });
    }
    if (o.value.length) {
      const m = o.value.map((f) => f.width ?? 100);
      o.value.forEach((f, d) => {
        c.push({
          value: f.value,
          fixed: !0,
          position: "right",
          width: f.width ?? 100,
          distance: d === o.value.length - 1 ? 0 : m.reduce((p, x, I) => I > d ? p + x : p, 0)
        });
      });
    }
    return c;
  }), n = _(!1);
  let i = null;
  return dt(() => {
    const c = t.value;
    if (c) {
      const m = () => {
        n.value = c.scrollLeft > 0;
      };
      m(), c.addEventListener("scroll", m), i = () => {
        c.removeEventListener("scroll", m);
      };
    }
  }), Ot(() => {
    i && (i(), i = null);
  }), {
    fixedHeaders: a,
    leftFixedHeaders: l,
    rightFixedHeaders: o,
    lastLeftFixedColumn: s,
    firstRightFixedColumn: u,
    fixedColumnsInfos: r,
    showShadow: n
  };
}
function oa(e, t, a, l, o, s, u, r, n, i, c, m, f, d, p, x, I, $, A, T) {
  const ee = y(() => u.value.length ? {
    hasFixedColumns: u.value.some((F) => F.fixed),
    fixedHeaders: u.value.filter((F) => F.fixed),
    unFixedHeaders: u.value.filter((F) => !F.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), H = _(
    na(p.value, x.value, I.value)
  ), { determineHeaderSortState: re } = ia(c, f, I, H), te = y(() => {
    const F = u.value.map((b) => ({
      ...b,
      sortType: b.sortable ? re(b.value) : void 0
    })), O = F.filter(
      (b) => b.fixed && (!b.fixedPosition || b.fixedPosition === "left")
    ), E = F.filter((b) => !b.fixed), z = F.filter(
      (b) => b.fixed && b.fixedPosition === "right"
    );
    return [
      ...Object.values(ve.value).filter(Boolean),
      ...O,
      ...E,
      ...z
    ];
  }), ve = y(() => ({
    checkbox: i.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: l.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value ?? 36
    },
    index: d.value && {
      text: e.value,
      value: "index",
      fixed: s.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: n.value
    },
    expand: r.value && !$.value && {
      text: "",
      value: "expand",
      fixed: o.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: a.value
    }
  })), ke = y(
    () => te.value.map((F) => F.value)
  ), ye = (F, O) => {
    const E = O === "none" ? "asc" : O === "asc" ? "desc" : m.value ? "asc" : null;
    if (c.value) {
      A(F, E);
      return;
    }
    const z = I.value ? sa(F, E, H.value) : ra(F, E);
    H.value = z, T("updateSort", { sortType: E, sortBy: F });
  }, U = y(() => (F) => {
    var E, z;
    const O = c.value ? (E = f.value) == null ? void 0 : E.sortBy : (z = H.value) == null ? void 0 : z.sortBy;
    return Array.isArray(O) && O.includes(F);
  }), be = y(() => (F) => {
    var E, z;
    const O = c.value ? (E = f.value) == null ? void 0 : E.sortBy : (z = H.value) == null ? void 0 : z.sortBy;
    return Array.isArray(O) ? O.indexOf(F) + 1 : !1;
  });
  return {
    clientSortOptions: H,
    headerColumns: ke,
    headersForRender: te,
    updateSortField: ye,
    isMultiSorting: U,
    getMultiSortNumber: be
  };
}
function na(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((l) => l === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const sa = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const l = a.sortBy.indexOf(e), o = [...a.sortBy], s = [...a.sortDesc];
  return l === -1 && t !== null ? (o.push(e), s.push(t === "desc")) : t === null ? (o.splice(l, 1), s.splice(l, 1)) : s[l] = t === "desc", { sortBy: o, sortDesc: s };
}, ra = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function ia(e, t, a, l) {
  const o = (r) => !e.value || !t.value ? s(r) : u(r), s = (r) => {
    if (!l.value) return "none";
    const { sortBy: n, sortDesc: i } = l.value;
    if (a.value && Array.isArray(n) && Array.isArray(i)) {
      const c = n.indexOf(r);
      return c !== -1 ? i[c] ? "desc" : "asc" : "none";
    }
    return r === n ? i ? "desc" : "asc" : "none";
  }, u = (r) => {
    const { sortBy: n, sortType: i } = t.value;
    if (a.value && Array.isArray(n) && Array.isArray(i)) {
      const c = n.indexOf(r);
      return c !== -1 ? i[c] : "none";
    }
    return r === n && i ? i : "none";
  };
  return {
    determineHeaderSortState: o
  };
}
class ua {
  constructor() {
    De(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    De(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: l, index: o, ...s } = t;
      a = Object.entries(s).sort(([u], [r]) => u.localeCompare(r)).map(([u, r]) => `${u}:${r}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ca(e, t, a, l, o, s, u, r, n, i) {
  const c = new ua(), m = y(
    () => (e.value - 1) * o.value + 1
  ), f = y(() => a.value ? Math.min(
    n.value,
    e.value * o.value
  ) : Math.min(
    r.value.length,
    e.value * o.value
  )), d = y(() => a.value ? l.value : r.value.slice(
    m.value - 1,
    f.value
  )), p = y(() => u.value ? d.value.map(($, A) => ({
    index: m.value + A,
    ...$
  })) : d.value), x = y(() => {
    if (s.value.length === 0)
      return "noneSelected";
    const $ = i ? r.value.filter((T) => !i(T)) : r.value;
    return s.value.length === $.length && s.value.every(
      (ee) => $.some(
        (H) => c.getItemKey(ee) === c.getItemKey(H)
      )
    ) ? "allSelected" : "partSelected";
  }), I = y(() => {
    if (!t.value)
      return p.value;
    switch (x.value) {
      case "allSelected":
        return p.value.map(($) => ({
          checkbox: !i || !i($),
          // 考慮禁用狀態
          ...$
        }));
      case "noneSelected":
        return p.value.map(($) => ({
          checkbox: !1,
          ...$
        }));
      default:
        return p.value.map(($) => ({
          checkbox: s.value.some(
            (T) => c.getItemKey($) === c.getItemKey(T)
          ) && (!i || !i($)),
          ...$
        }));
    }
  });
  return {
    currentPageFirstIndex: m,
    currentPageLastIndex: f,
    multipleSelectStatus: x,
    pageItems: I
  };
}
function da(e, t, a, l, o, s, u) {
  const r = _(s.value ? s.value.page : e.value), n = y(() => Math.ceil(l.value / o.value)), i = y(() => n.value === 0 || r.value === n.value), c = y(() => r.value === 1);
  return {
    currentPaginationNumber: r,
    maxPaginationNumber: n,
    isLastPage: i,
    isFirstPage: c,
    nextPage: () => {
      if (l.value !== 0 && !i.value && !a.value)
        if (t.value) {
          const x = r.value + 1;
          u(x);
        } else
          r.value += 1;
    },
    prevPage: () => {
      if (l.value !== 0 && !c.value && !a.value)
        if (t.value) {
          const x = r.value - 1;
          u(x);
        } else
          r.value -= 1;
    },
    updatePage: (x) => {
      a.value || (t.value ? u(x) : r.value = x);
    },
    updateCurrentPaginationNumber: (x) => {
      r.value = x;
    }
  };
}
function ga(e, t, a, l) {
  var r;
  const o = y(() => !e.value && t.value.findIndex((n) => n === l.value) === -1 ? [l.value, ...t.value] : t.value), s = _(((r = a.value) == null ? void 0 : r.rowsPerPage) ?? l.value);
  return {
    rowsItemsComputed: o,
    // 計算後的每頁行數選項
    rowsPerPageRef: s,
    // 每頁行數
    updateRowsPerPage: (n) => {
      s.value = n;
    }
    // 更新每頁行數
  };
}
function ha(e, t, a) {
  const l = y({
    get: () => {
      if (e.value) {
        const { page: r, rowsPerPage: n, sortBy: i, sortType: c } = e.value;
        return { page: r, rowsPerPage: n, sortBy: i ?? null, sortType: c ?? null };
      }
      return null;
    },
    set: (r) => {
      a("update:serverOptions", r);
    }
  });
  return {
    serverOptionsComputed: l,
    updateServerOptionsPage: (r) => {
      l.value && (l.value = {
        ...l.value,
        page: r
      });
    },
    updateServerOptionsSort: (r, n) => {
      if (l.value)
        if (t.value && Array.isArray(l.value.sortBy) && Array.isArray(l.value.sortType)) {
          const i = l.value.sortBy.findIndex((c) => c === r);
          i === -1 && n !== null && (l.value.sortBy.push(r), l.value.sortType.push(n)), n === null ? (l.value.sortBy.splice(i, 1), l.value.sortType.splice(i, 1)) : l.value.sortType[i] = n;
        } else
          l.value = {
            ...l.value,
            sortBy: n !== null ? r : null,
            sortType: n
          };
    },
    updateServerOptionsRowsPerPage: (r) => {
      l.value && (l.value = {
        ...l.value,
        page: 1,
        rowsPerPage: r
      });
    }
  };
}
function fa(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function pa(e) {
  return e.comparison === "in";
}
function ma(e) {
  return typeof e.comparison == "function";
}
function va(e) {
  return typeof e == "number" && !isNaN(e);
}
const Ol = {
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
function Y(e, t) {
  if (e.includes(".")) {
    const a = e.split(".");
    let l = t;
    for (const o of a)
      if (l && typeof l == "object")
        l = l[o];
      else
        return "";
    return l ?? "";
  }
  return t[e] ?? "";
}
function ka(e, t) {
  const a = Y(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const rt = 1e3, it = /* @__PURE__ */ new WeakMap(), Re = (e) => {
  let t = it.get(e);
  if (!t) {
    const { checkbox: a, index: l, ...o } = e;
    t = JSON.stringify(o), it.set(e, t);
  }
  return t;
};
function ya(e, t, a, l) {
  const o = _({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  ce(t, (c) => {
    if (c === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const m = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
    for (const d of c) {
      const p = Re(d);
      m.add(p), f.set(p, d);
    }
    o.value.selectedItems = m, o.value.itemsMap = f;
  }, { immediate: !0, deep: !0 });
  const s = async (c, m, f) => new Promise((d) => {
    requestAnimationFrame(() => {
      const p = new Set(o.value.selectedItems), x = new Map(o.value.itemsMap);
      for (let I = 0; I < c.length; I++) {
        const $ = c[I], A = Re($);
        m ? (p.add(A), x.set(A, $)) : p.delete(A), o.value.processedCount = f + I + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = p, o.value.itemsMap = x, d();
    });
  }), u = async (c) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = e.value.length, o.value.visualProgress = 0, !c) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), l("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const m = e.value;
        for (let f = 0; f < m.length; f += rt) {
          const p = m.slice(f, Math.min(f + rt, m.length)).filter((x) => !a(x));
          await s(p, c, f), await new Promise((x) => setTimeout(x, 0));
        }
        l("update:itemsSelected", n.value), c && l("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, r = (c) => {
    const m = Re(c), f = { ...c };
    delete f.checkbox, delete f.index;
    const d = new Set(o.value.selectedItems), p = new Map(o.value.itemsMap);
    d.has(m) ? (d.delete(m), l("deselectRow", f)) : (d.add(m), p.set(m, f), l("selectRow", f)), o.value.selectedItems = d, o.value.itemsMap = p, l("update:itemsSelected", Array.from(p.values()).filter((I) => d.has(Re(I))));
  }, n = y(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([c]) => o.value.selectedItems.has(c)).map(([, c]) => c)), i = y(() => o.value.visualProgress);
  return {
    selectedItems: n,
    toggleSelectAll: u,
    toggleSelectItem: r,
    isProcessing: y(() => o.value.selectionInProgress),
    selectionProgress: i
  };
}
function ba(e, t, a, l, o, s, u, r, n, i, c, m) {
  const f = /* @__PURE__ */ new WeakMap(), d = (v) => {
    let b = f.get(v);
    return b || (typeof s.value == "string" && s.value !== "" ? b = String(Y(s.value, v)) : Array.isArray(s.value) ? b = s.value.map((P) => String(Y(P, v))).join(" ") : b = Object.values(v).map(String).join(" "), f.set(v, b)), b;
  }, p = y(() => {
    if (!a.value && u.value !== "") {
      const v = new RegExp(u.value, "i");
      return l.value.filter((b) => v.test(d(b)));
    }
    return l.value;
  }), x = (v, b) => {
    const P = va(v) ? v : parseFloat(String(v));
    if (isNaN(P)) return !1;
    if (b.comparison === "between" && Array.isArray(b.criteria)) {
      const [ae, le] = b.criteria;
      return P >= ae && P <= le;
    }
    const R = b.criteria;
    switch (b.comparison) {
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
  }, I = y(() => {
    var v;
    return (v = t.value) != null && v.length ? p.value.filter(
      (b) => t.value.every((P) => {
        const R = Y(P.field, b);
        return ma(P) ? P.comparison(R, P.criteria) : fa(P) ? x(R, P) : pa(P) ? P.criteria.includes(R) : P.comparison === "=" ? R === P.criteria : R !== P.criteria;
      })
    ) : p.value;
  }), $ = (v, b, P) => v === b ? 0 : v == null ? 1 : b == null ? -1 : v < b ? P ? 1 : -1 : P ? -1 : 1, A = (v, b, P, R) => R < 0 ? v : A(v, b, P, R - 1).sort((ae, le) => {
    if (!b.slice(0, R).every((Pe) => Y(Pe, ae) === Y(Pe, le))) return 0;
    const fe = b[R], oe = Y(fe, ae), xe = Y(fe, le);
    return $(oe, xe, P[R]);
  }), T = y(() => {
    if (a.value) return l.value;
    if (!e.value) return I.value;
    const { sortBy: v, sortDesc: b } = e.value, P = [...I.value];
    return n.value && Array.isArray(v) && Array.isArray(b) ? v.length ? A(P, v, b, v.length - 1) : P : P.sort((R, ae) => {
      const le = Y(v, R), X = Y(v, ae);
      return $(le, X, b);
    });
  }), ee = y(() => a.value ? r.value : T.value.length), H = y(() => a.value ? !1 : (a.value ? r.value : l.value.length) >= i.value), {
    selectedItems: re,
    toggleSelectAll: te,
    toggleSelectItem: ve,
    isProcessing: ke,
    selectionProgress: ye
  } = ya(T, o, c, m), U = y({
    get: () => o.value ?? [],
    set: (v) => {
      m("update:itemsSelected", v);
    }
  }), be = (v) => v.filter((b) => !c(b)), F = (v) => {
    U.value = v ? be(T.value) : U.value = [], v && m("selectAll");
  }, O = (v) => {
    const b = v.checkbox;
    if (delete v.checkbox, delete v.index, b)
      U.value = U.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(v)
      ), m("deselectRow", v);
    else {
      const P = U.value;
      P.unshift(v), U.value = P, m("selectRow", v);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: U,
    totalItemsLength: ee,
    toggleSelectAll: (v) => {
      if (!T.value.every((P) => c(P)))
        if (H.value) {
          m("updateSelectionStatus", !0);
          try {
            te(v), m("update:itemsSelected", v ? Array.from(re.value) : []), v && m("selectAll");
          } finally {
            m("updateSelectionStatus", !1);
          }
        } else
          F(v);
    },
    toggleSelectItem: (v) => {
      c(v) || (H.value ? ve(v) : O(v));
    },
    isProcessing: y(() => H.value && ke.value),
    processProgress: ye
  };
}
const je = {
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
function ze(e) {
  return je[e];
}
function ht(e) {
  const t = e.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
  if (!t) return null;
  const [a, l, o, s] = t.map(Number);
  return { lightness: l, chroma: o, hue: s };
}
function xa(e) {
  e = e.replace(/^#/, ""), e.length === 3 && (e = e.split("").map((o) => o + o).join(""));
  const t = parseInt(e.slice(0, 2), 16) / 255, a = parseInt(e.slice(2, 4), 16) / 255, l = parseInt(e.slice(4, 6), 16) / 255;
  return { r: t, g: a, b: l };
}
function wa(e) {
  const { r: t, g: a, b: l } = e, o = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), s = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), u = l <= 0.04045 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4), r = 0.4124 * o + 0.3576 * s + 0.1805 * u, n = 0.2126 * o + 0.7152 * s + 0.0722 * u, i = 0.0193 * o + 0.1192 * s + 0.9505 * u, c = 0.95047, m = 1, f = 1.08883, d = r > 8856e-6 ? Math.pow(r / c, 1 / 3) : 7.787 * r / c + 16 / 116, p = n > 8856e-6 ? Math.pow(n / m, 1 / 3) : 7.787 * n / m + 16 / 116, x = i > 8856e-6 ? Math.pow(i / f, 1 / 3) : 7.787 * i / f + 16 / 116, I = 116 * p - 16, $ = 500 * (d - p), A = 200 * (p - x);
  return { l: I, a: $, b: A };
}
function Pa(e) {
  const { l: t, a, b: l } = e, o = Math.sqrt(a * a + l * l);
  let s = Math.atan2(l, a) * 180 / Math.PI;
  return s < 0 && (s += 360), { l: t, c: o, h: s };
}
function Ca(e) {
  const t = xa(e), a = wa(t), l = Pa(a);
  return {
    lightness: l.l,
    chroma: Math.min(l.c / 150, 0.4),
    // 限制在合理範圍內
    hue: l.h
  };
}
function Ve(e) {
  return e.startsWith("oklch(");
}
function We(e) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e);
}
function Sa(e, t) {
  const a = Math.min(
    Math.abs(e.hue - t.hue),
    360 - Math.abs(e.hue - t.hue)
  ), l = a > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((e.lightness - t.lightness) * 1.5, 2) + Math.pow((e.chroma - t.chroma) * 2, 2) + Math.pow(a / 360 * l, 2) * 100
  );
}
function ut(e, t) {
  let a = "indigo", l = "500", o = 1 / 0;
  for (const [s, u] of Object.entries(t))
    for (const [r, n] of Object.entries(u)) {
      if (!["300", "400", "500", "600", "700"].includes(r)) continue;
      const i = ht(n);
      if (!i) continue;
      const c = Sa(e, i);
      c < o && (o = c, a = s, l = r);
    }
  return { color: a, shade: l, distance: o };
}
function ft(e) {
  const t = "indigo";
  if (Ve(e)) {
    const a = ht(e);
    return a ? ut(a, je).color : t;
  }
  if (We(e)) {
    const a = Ca(e);
    return ut(a, je).color;
  }
  return e;
}
function Ia(e) {
  const t = ze(e), a = {};
  return Object.entries(t).forEach(([l, o]) => {
    a[`--vdt-theme-${l}`] = o;
  }), a;
}
function $a(e) {
  const t = typeof e == "string" && (We(e) || Ve(e)) ? ft(e) : e, a = Ia(t), l = document.documentElement;
  Object.entries(a).forEach(([o, s]) => {
    l.style.setProperty(o, s);
  });
}
function Na(e) {
  const t = typeof e == "string" && (We(e) || Ve(e)) ? ft(e) : e;
  return $a(t), {
    color: t,
    mainColor: ze(t)[500] || ze(t)[400]
  };
}
const Fa = {}, Ba = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ra(e, t) {
  return k(), w("svg", Ba, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ma = /* @__PURE__ */ he(Fa, [["render", Ra]]), Aa = {}, Ta = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function La(e, t) {
  return k(), w("svg", Ta, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ea = /* @__PURE__ */ he(Aa, [["render", La]]), Da = {}, Ha = { class: "px-3 py-1.5" };
function Oa(e, t) {
  return k(), w("span", Ha, t[0] || (t[0] = [
    C("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      C("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ja = /* @__PURE__ */ he(Da, [["render", Oa]]), za = {}, qa = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Va(e, t) {
  return k(), w("svg", qa, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Wa = /* @__PURE__ */ he(za, [["render", Va]]), Ka = {}, Ua = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ja(e, t) {
  return k(), w("svg", Ua, t[0] || (t[0] = [
    C("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Ga = /* @__PURE__ */ he(Ka, [["render", Ja]]), Za = /* @__PURE__ */ L({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (t, a) => (k(), w("span", {
      key: t.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        t.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      V(Ga, {
        class: S({ "transform rotate-180": t.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), Qa = ["checked", "disabled", "aria-checked"], Xa = {
  class: "h-4 w-4 text-white stroke-3",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Ya = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, _a = /* @__PURE__ */ L({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = y(() => t.checked), l = y(() => t.partial);
    return (o, s) => (k(), w("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !o.disabled && "cursor-pointer group",
        o.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: s[0] || (s[0] = qe((u) => !o.disabled && o.$emit("change"), ["stop", "prevent"]))
    }, [
      C("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: o.disabled,
        "aria-checked": a.value
      }, null, 8, Qa),
      C("div", {
        class: S(["h-4 w-4 rounded-sm transition-all duration-200 border", [
          // Base states
          a.value && !l.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          l.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          !a.value && !l.value && [
            "border-gray-300 bg-white",
            !o.disabled && "group-hover:border-vdt-primary-300"
          ],
          // Focus states
          !o.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50"
        ]])
      }, [
        He((k(), w("svg", Xa, s[1] || (s[1] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Oe, a.value && !l.value]
        ]),
        He((k(), w("svg", Ya, s[2] || (s[2] = [
          C("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Oe, l.value]
        ])
      ], 2)
    ], 2));
  }
}), pt = /* @__PURE__ */ L({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = t;
    return (l, o) => (k(), K(_a, {
      checked: l.checked,
      disabled: l.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (s) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), el = /* @__PURE__ */ L({
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
    const a = e, l = y(() => a.status === "allSelected"), o = y(() => a.status === "partSelected"), s = t;
    return (u, r) => (k(), K(pt, {
      checked: l.value,
      partial: o.value,
      disabled: e.disabled,
      onChange: r[0] || (r[0] = (n) => s("change", !l.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), tl = {
  key: 1,
  class: "items-center gap-2"
}, al = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, ll = /* @__PURE__ */ L({
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
    const a = t, l = gt(), o = (u) => [
      `header-${u.value}`,
      `header-${u.value.toLowerCase()}`,
      "header"
    ].find((n) => l[n]) || "header", s = (u) => {
      u.sortable && u.sortType && a("headerClick", u);
    };
    return (u, r) => (k(), w("th", {
      style: Me(e.fixedDistance),
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
      onClick: r[1] || (r[1] = qe((n) => s(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (k(), K(el, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: r[0] || (r[0] = (n) => u.$emit("toggleSelectAll", n))
      }, null, 8, ["disabled", "status"])) : (k(), w("div", tl, [
        N(u.$slots, o(e.header), j(ne({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          C("span", null, W(e.header.text), 1)
        ]),
        e.header.sortable ? (k(), K(h(Za), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (k(), w("span", al, W(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), ol = /* @__PURE__ */ L({
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
    const a = t, l = (s) => {
      a("headerClick", s);
    }, o = (s) => {
      a("toggleSelectAll", s);
    };
    return (s, u) => e.headers.length && !e.hideHeader ? (k(), w("thead", {
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
        (k(!0), w(se, null, Q(e.headers, (r, n) => (k(), K(ll, {
          key: n,
          header: r,
          index: n,
          "fixed-distance": e.getFixedDistance(r.value),
          "last-left-fixed-column": e.lastLeftFixedColumn,
          "first-right-fixed-column": e.firstRightFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: l,
          onToggleSelectAll: o
        }, ge({ _: 2 }, [
          Q(s.$slots, (i, c) => ({
            name: c,
            fn: G((m) => [
              N(s.$slots, c, Z({ ref_for: !0 }, m))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), nl = /* @__PURE__ */ L({
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
  setup(e, { emit: t }) {
    const a = e, l = t, o = y(() => a.isDisabled ?? !1), s = y(() => typeof a.bodyItemClassName == "function" ? a.bodyItemClassName(a.column, a.index) : a.bodyItemClassName), u = y(
      () => a.column === "expand" || a.column === a.expandColumn
    ), r = y(() => {
      if (a.getFixedDistance)
        return a.getFixedDistance(a.column, "td");
    }), n = y(() => a.getFixedColumnClasses ? a.getFixedColumnClasses(a.column) || [] : []), i = y(() => {
      let d = a.style || "";
      return r.value && (d += r.value), n.value.length > 0 && (d += " background-color: inherit;"), d;
    }), c = () => {
      u.value && a.expandColumn === "" && l("toggle-expand", event);
    }, m = (d) => {
      l("toggle-expand", d);
    }, f = () => {
      l("toggle-select");
    };
    return (d, p) => (k(), w("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": d.column === "expand" && d.expandColumn === "" },
        ...n.value,
        s.value
      ]]),
      style: Me(i.value),
      onClick: c
    }, [
      d.column === "checkbox" ? (k(), w(se, { key: 0 }, [
        d.column === "checkbox" ? N(d.$slots, "selection-checkbox", j(Z({ key: 0 }, { item: d.item, index: d.index, isDisabled: o.value, toggleSelectItem: f })), () => [
          V(pt, {
            checked: !!d.item.checkbox,
            disabled: o.value,
            onChange: f
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : u.value ? N(d.$slots, "expand-button", j(Z({ key: 1 }, { item: d.item, expanded: d.isExpanded, toggle: m })), () => [
        C("button", {
          onClick: qe(m, ["stop"]),
          class: "inline-flex items-center"
        }, [
          V(h(Wa), {
            class: S({ "transform rotate-90": d.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : N(d.$slots, `item-${d.column}`, j(Z({ key: 2 }, d.item)), () => [
        N(d.$slots, `item-${d.column.toLowerCase()}`, j(ne(d.item)), () => [
          N(d.$slots, "item", j(ne({ column: d.column, item: d.item })), () => [
            Ae(W(h(ka)(d.column, d.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), sl = /* @__PURE__ */ L({
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
  setup(e, { emit: t }) {
    const a = e, l = t, o = y(() => typeof a.bodyRowClassName == "function" ? a.bodyRowClassName(a.item, a.index) : a.bodyRowClassName), s = (n) => {
      l("click", n, a.item, a.index);
    }, u = (n) => {
      l("dblclick", n, a.item, a.index);
    }, r = (n) => {
      l("contextmenu", n, a.item);
    };
    return (n, i) => (k(), w("tr", {
      class: S(["vdt-tbody-tr transition-colors", [
        { "bg-white": n.alternating && n.index % 2 === 0 },
        { "bg-gray-50": !n.alternating || n.index % 2 === 1 },
        { "hover:bg-gray-100": !n.noHover },
        { "divide-x divide-gray-200": n.borderCell },
        { "border-b border-gray-200": n.borderRow },
        o.value
      ]]),
      onClick: s,
      onDblclick: u,
      onContextmenu: r
    }, [
      N(n.$slots, "prepend"),
      (k(!0), w(se, null, Q(n.columns, (c, m) => (k(), K(nl, {
        key: m,
        column: c,
        item: n.item,
        index: n.index,
        "get-fixed-distance": n.getFixedDistance,
        "get-fixed-column-classes": n.getFixedColumnClasses,
        "is-disabled": n.isDisabled,
        "expand-column": n.expandColumn,
        "is-expanded": n.isExpanded,
        "body-item-class-name": n.bodyItemClassName,
        onToggleExpand: i[0] || (i[0] = (f) => n.$emit("toggle-expand", f, n.index, n.item)),
        onToggleSelect: i[1] || (i[1] = () => n.$emit("toggle-select", n.item))
      }, ge({ _: 2 }, [
        Q(n.$slots, (f, d) => ({
          name: d,
          fn: G((p) => [
            N(n.$slots, d, Z({ ref_for: !0 }, p))
          ])
        }))
      ]), 1032, ["column", "item", "index", "get-fixed-distance", "get-fixed-column-classes", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]))), 128)),
      N(n.$slots, "append")
    ], 34));
  }
}), rl = {}, il = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" };
function ul(e, t) {
  return k(), w("div", il, t[0] || (t[0] = [
    C("div", { class: "absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500" }, null, -1)
  ]));
}
const cl = /* @__PURE__ */ he(rl, [["render", ul], ["__scopeId", "data-v-9ef81a40"]]), dl = ["colspan"], gl = { class: "overflow-hidden" }, hl = /* @__PURE__ */ L({
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
    return (l, o) => (k(), w("tr", {
      class: S(["vdt-expand-row border-0", [a.value, { "bg-gray-50": (l.index + 1) % 2 === 0, "border-t": l.isExpanded }]])
    }, [
      C("td", {
        colspan: l.columnsCount,
        class: "relative p-0"
      }, [
        l.loading ? (k(), K(cl, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        C("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": l.isExpanded }]])
        }, [
          C("div", gl, [
            N(l.$slots, "default")
          ])
        ], 2)
      ], 8, dl)
    ], 2));
  }
}), fl = { class: "flex items-center gap-2 text-sm text-gray-700" }, pl = { class: "relative inline-block min-w-[70px]" }, ml = ["aria-expanded"], vl = { class: "block truncate" }, kl = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, yl = ["aria-selected", "onClick"], bl = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-vdt-primary-600"
}, xl = /* @__PURE__ */ L({
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
    const a = e, l = t, o = _(!1), s = _(!1), u = y({
      get: () => a.modelValue,
      set: (f) => l("update:modelValue", f)
    }), r = jt("dataTable");
    ce(o, (f) => {
      if (f && (r != null && r.value)) {
        const d = window.innerHeight, p = r.value.getBoundingClientRect(), x = d - (p.height + p.top);
        s.value = x <= 100;
      }
    });
    const n = (f) => {
      u.value = f, o.value = !1;
    }, i = () => {
      o.value = !o.value;
    }, c = (f) => {
      f.target.closest(".relative") || (o.value = !1);
    }, m = (f) => {
      const d = f.relatedTarget;
      d != null && d.closest(".relative") || (o.value = !1);
    };
    return dt(() => {
      document.addEventListener("click", c);
    }), zt(() => {
      document.removeEventListener("click", c);
    }), (f, d) => (k(), w("div", fl, [
      Ae(W(e.message) + " ", 1),
      C("div", pl, [
        C("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-gray-300", [
            "focus:border-vdt-primary-500 focus:outline-hidden focus:ring-1 focus:ring-vdt-primary-500",
            o.value ? "ring-1 ring-vdt-primary-500 border-vdt-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: i,
          "aria-haspopup": "listbox",
          "aria-expanded": o.value
        }, [
          C("span", vl, W(u.value), 1),
          C("span", kl, [
            (k(), w("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": o.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, d[0] || (d[0] = [
              C("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, ml),
        V(qt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: G(() => [
            o.value ? (k(), w("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": s.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: m
            }, [
              (k(!0), w(se, null, Q(e.rowsItems, (p) => (k(), w("li", {
                key: p,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  p === u.value ? "text-vdt-primary-800 bg-vdt-primary-100 font-semibold" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": p === u.value,
                onClick: (x) => n(p)
              }, [
                C("span", {
                  class: S(["block", { "font-medium": p === u.value }])
                }, W(p), 3),
                p === u.value ? (k(), w("span", bl, d[1] || (d[1] = [
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
              ], 10, yl))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), wl = { class: "text-sm text-gray-700" }, Pl = /* @__PURE__ */ L({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (t, a) => (k(), w("div", wl, [
      N(t.$slots, "default", {
        firstIndex: t.currentPageFirstIndex,
        lastIndex: t.currentPageLastIndex,
        total: t.totalItemsLength,
        separator: t.rowsOfPageSeparatorMessage
      }, () => [
        Ae(W(`${t.currentPageFirstIndex}–${t.currentPageLastIndex}`) + " " + W(t.rowsOfPageSeparatorMessage) + " " + W(t.totalItemsLength), 1)
      ])
    ]));
  }
}), Cl = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Sl = ["disabled"], Il = ["disabled"], ct = /* @__PURE__ */ L({
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
    return (l, o) => (k(), w("div", Cl, [
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
        onClick: o[0] || (o[0] = (s) => a("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        V(h(Ea), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Sl),
      N(l.$slots, "buttonsPagination"),
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
        onClick: o[1] || (o[1] = (s) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        V(h(Ma), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Il)
    ]));
  }
}), $l = {
  class: "vdt-pagination inline-flex rounded-md shadow-xs",
  role: "navigation",
  "aria-label": "Pagination"
}, Nl = ["onClick"], de = 7, Fl = /* @__PURE__ */ L({
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
    const a = e, l = t, o = (u) => {
      u.type === "button" && !u.active && l("updatePage", u.page);
    }, s = y(() => {
      const u = [], { maxPaginationNumber: r, currentPaginationNumber: n } = a;
      if (r <= de) {
        for (let i = 1; i <= r; i += 1)
          u.push({
            type: "button",
            page: i,
            active: i === n,
            activePrev: i + 1 === n
          });
        return u;
      }
      if ([1, 2, r, r - 1].includes(n))
        for (let i = 1; i <= de; i += 1)
          if (i <= 3)
            u.push({
              type: "button",
              page: i,
              active: i === n,
              activePrev: i + 1 === n
            });
          else if (i === 4)
            u.push({ type: "omission" });
          else {
            const c = r - (de - i);
            u.push({
              type: "button",
              page: c,
              active: c === n,
              activePrev: c + 1 === n
            });
          }
      else if ([3, 4].includes(n))
        for (let i = 1; i <= de; i += 1)
          i <= 5 ? u.push({
            type: "button",
            page: i,
            active: i === n,
            activePrev: i + 1 === n
          }) : i === 6 ? u.push({ type: "omission" }) : u.push({
            type: "button",
            page: r,
            active: r === n,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(n))
        for (let i = 1; i <= de; i += 1)
          if (i === 1)
            u.push({
              type: "button",
              page: 1,
              active: n === 1,
              activePrev: !1
            });
          else if (i === 2)
            u.push({ type: "omission" });
          else {
            const c = r - (de - i);
            u.push({
              type: "button",
              page: c,
              active: c === n,
              activePrev: c + 1 === n
            });
          }
      else
        for (let i = 1; i <= de; i += 1)
          if (i === 1)
            u.push({
              type: "button",
              page: 1,
              active: n === 1,
              activePrev: !1
            });
          else if (i === 2 || i === 6)
            u.push({ type: "omission" });
          else if (i === 7)
            u.push({
              type: "button",
              page: r,
              active: r === n,
              activePrev: !1
            });
          else {
            const c = 4 - i, m = n - c;
            u.push({
              type: "button",
              page: m,
              active: m === n,
              activePrev: m + 1 === n
            });
          }
      return u;
    });
    return (u, r) => (k(), w("div", $l, [
      (k(!0), w(se, null, Q(s.value, (n, i) => (k(), w("div", {
        key: i,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          i === 0 && "rounded-l-md",
          // Last item styles
          i === s.value.length - 1 && "rounded-r-md",
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
            i !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          n.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            i !== 0 && "-ml-px"
          ]
        ]]),
        onClick: (c) => o(n)
      }, [
        n.type === "button" ? (k(), w("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": n.active }])
        }, W(n.page), 3)) : (k(), K(h(ja), { key: 1 }))
      ], 10, Nl))), 128))
    ]));
  }
}), Bl = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Rl = /* @__PURE__ */ L({
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
    const a = e, l = t, o = y(() => ({
      isFirstPage: a.isFirstPage,
      isLastPage: a.isLastPage,
      currentPaginationNumber: a.currentPaginationNumber,
      maxPaginationNumber: a.maxPaginationNumber,
      nextPage: () => l("nextPage"),
      prevPage: () => l("prevPage"),
      updatePage: (s) => l("updatePage", s)
    }));
    return (s, u) => s.hideFooter ? D("", !0) : (k(), w("div", {
      key: 0,
      class: S(["flex items-center justify-between px-4 py-3 bg-white border border-gray-200 border-t-0", [{ "shadow-xs": s.showShadow }, s.footerClassName]])
    }, [
      V(ct, {
        "is-first-page": s.isFirstPage,
        "is-last-page": s.isLastPage,
        onClickNextPage: u[0] || (u[0] = () => l("nextPage")),
        onClickPrevPage: u[1] || (u[1] = () => l("prevPage")),
        class: "sm:hidden flex flex-1"
      }, {
        buttonsPagination: G(() => u[6] || (u[6] = [
          C("div", { class: "grow" }, null, -1)
        ])),
        _: 1
      }, 8, ["is-first-page", "is-last-page"]),
      C("div", Bl, [
        s.hideRowsPerPage ? D("", !0) : (k(), K(xl, {
          key: 0,
          "model-value": s.rowsPerPage,
          "rows-items": s.rowsItems,
          message: s.rowsPerPageMessage,
          "onUpdate:modelValue": u[2] || (u[2] = (r) => l("update:rowsPerPage", r))
        }, null, 8, ["model-value", "rows-items", "message"])),
        s.hidePaginationInfo ? D("", !0) : (k(), K(Pl, {
          key: 1,
          "current-page-first-index": s.currentPageFirstIndex,
          "current-page-last-index": s.currentPageLastIndex,
          "total-items-length": s.totalItemsLength,
          "rows-of-page-separator-message": s.rowsOfPageSeparatorMessage
        }, ge({ _: 2 }, [
          s.$slots["pagination-info"] ? {
            name: "default",
            fn: G((r) => [
              N(s.$slots, "pagination-info", j(ne(r)))
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])),
        s.$slots.pagination ? N(s.$slots, "pagination", j(Z({ key: 2 }, o.value))) : (k(), K(ct, {
          key: 3,
          "is-first-page": s.isFirstPage,
          "is-last-page": s.isLastPage,
          onClickNextPage: u[4] || (u[4] = () => l("nextPage")),
          onClickPrevPage: u[5] || (u[5] = () => l("prevPage"))
        }, ge({ _: 2 }, [
          s.buttonsPagination ? {
            name: "buttonsPagination",
            fn: G(() => [
              V(Fl, {
                "current-pagination-number": s.currentPaginationNumber,
                "max-pagination-number": s.maxPaginationNumber,
                onUpdatePage: u[3] || (u[3] = (r) => l("updatePage", r))
              }, null, 8, ["current-pagination-number", "max-pagination-number"])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["is-first-page", "is-last-page"]))
      ])
    ], 2));
  }
}), Ml = ["id"], Al = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Tl = { class: "relative z-10" }, Ll = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, mt = /* @__PURE__ */ L({
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
    const l = e, {
      checkboxColumnWidth: o,
      expandColumnWidth: s,
      indexColumnWidth: u,
      rowsItems: r,
      showIndexSymbol: n,
      currentPage: i,
      filterOptions: c,
      headers: m,
      itemsSelected: f,
      loading: d,
      items: p,
      rowsPerPage: x,
      searchField: I,
      searchValue: $,
      serverItemsLength: A,
      showIndex: T,
      sortBy: ee,
      sortType: H,
      serverOptions: re,
      multiSort: te,
      mustSort: ve,
      clickEventType: ke,
      clickRowToExpand: ye,
      clickRowToSelect: U,
      fixedExpand: be,
      fixedCheckbox: F,
      fixedIndex: O,
      batchSelectionThreshold: E,
      expandColumn: z
    } = Vt(l);
    Na(l.theme);
    const v = gt(), b = y(() => !!v.expand), P = y(() => !!v.body), R = y(
      () => typeof l.expandTransition < "u" ? l.expandTransition : b.value
    ), ae = _(null), le = _(null);
    Wt("dataTable", ae);
    const X = a, fe = y(() => f.value !== null), oe = y(() => re.value !== null), {
      serverOptionsComputed: xe,
      updateServerOptionsPage: Pe,
      updateServerOptionsSort: vt,
      updateServerOptionsRowsPerPage: kt
    } = ha(
      re,
      te,
      X
    ), {
      clientSortOptions: Ke,
      headerColumns: Ue,
      headersForRender: pe,
      updateSortField: yt,
      isMultiSorting: bt,
      getMultiSortNumber: xt
    } = oa(
      n,
      o,
      s,
      F,
      be,
      O,
      m,
      b,
      u,
      fe,
      oe,
      ve,
      xe,
      T,
      ee,
      H,
      te,
      z,
      vt,
      X
    ), {
      rowsItemsComputed: Je,
      rowsPerPageRef: me,
      updateRowsPerPage: Ge
    } = ga(
      oe,
      r,
      re,
      x
    ), {
      totalItems: Ze,
      selectItemsComputed: wt,
      totalItemsLength: Ce,
      toggleSelectAll: Pt,
      toggleSelectItem: Qe,
      isProcessing: Ct,
      processProgress: St
    } = ba(
      Ke,
      c,
      oe,
      p,
      f,
      I,
      $,
      A,
      te,
      E,
      l.disabledRows,
      X
    ), {
      currentPaginationNumber: ie,
      maxPaginationNumber: Se,
      isLastPage: Ie,
      isFirstPage: $e,
      nextPage: Ne,
      prevPage: Fe,
      updatePage: we,
      updateCurrentPaginationNumber: It
    } = da(
      i,
      oe,
      d,
      Ce,
      me,
      re,
      Pe
    ), {
      currentPageFirstIndex: Xe,
      currentPageLastIndex: Ye,
      multipleSelectStatus: $t,
      pageItems: ue
    } = ca(
      ie,
      fe,
      oe,
      p,
      me,
      wt,
      T,
      Ze,
      Ce,
      l.disabledRows
    ), Be = y(() => ie.value === 0 ? 0 : (ie.value - 1) * me.value), {
      expandingItemIndexList: Te,
      updateExpandingItemIndexList: _e,
      clearExpandingItemIndexList: et
    } = aa(
      ue,
      Be,
      X
    ), {
      fixedHeaders: Le,
      lastLeftFixedColumn: tt,
      firstRightFixedColumn: at,
      fixedColumnsInfos: lt,
      showShadow: ot
    } = la(
      pe,
      le
    ), Nt = (g) => {
      const q = g.width ?? (Le.value.length ? 100 : null);
      if (q) return `width: ${q}px; min-width: ${q}px;`;
    }, nt = (g, q = "th") => {
      if (!Le.value.length) return;
      const B = lt.value.find((M) => M.value === g);
      if (B)
        return `
            position: sticky;
            ${B.position === "left" ? `left: ${B.distance}px;` : `right: ${B.distance}px;`}
            z-index: ${q === "th" ? 3 : 1};
        `;
    }, Ft = (g) => {
      if (!Le.value.length) return [];
      const q = [];
      return lt.value.find((M) => M.value === g) && (q.push("fixed-column"), g === tt.value ? q.push("fixed-left-shadow") : g === at.value && q.push("fixed-right-shadow")), q;
    }, Bt = (g) => {
      g.sortable && g.sortType && yt(g.value, g.sortType);
    }, Ee = (g) => typeof l.disabledRows == "function" ? l.disabledRows(g) : !1, Rt = y(() => ue.value.every((g) => l.disabledRows(g))), Mt = (g) => {
      Ee(g) || Qe(g);
    }, {
      handleRowClick: At,
      handleRowDoubleClick: Tt,
      handleRowContextMenu: Lt
    } = ta(
      ke,
      fe,
      T,
      Ee,
      ye,
      U,
      _e,
      Qe,
      X
    );
    return ce(d, (g, q) => {
      xe.value && g === !1 && q === !0 && (It(xe.value.page), et());
    }), ce(me, (g) => {
      oe.value ? kt(g) : we(1);
    }), ce([$, c], () => {
      oe.value || we(1);
    }), ce([ie, Ke, I, $, c], () => {
      et();
    }, { deep: !0 }), ce(ue, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), ce(Ze, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Xe,
      currentPageLastIndex: Ye,
      clientItemsLength: Ce,
      maxPaginationNumber: Se,
      currentPaginationNumber: ie,
      isLastPage: Ie,
      isFirstPage: $e,
      nextPage: Ne,
      prevPage: Fe,
      updatePage: we,
      rowsPerPageOptions: Je,
      rowsPerPageActiveOption: me,
      updateRowsPerPageActiveOption: Ge
    }), (g, q) => (k(), w("div", {
      ref_key: "tableWrapper",
      ref: ae,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      C("div", {
        ref_key: "tableContainer",
        ref: le,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-xs show-shadow": h(ot) }, g.containerClassName]])
      }, [
        C("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [g.tableClassName]])
        }, [
          C("colgroup", null, [
            (k(!0), w(se, null, Q(h(pe), (B, M) => (k(), w("col", {
              key: M,
              style: Me(Nt(B))
            }, null, 4))), 128))
          ]),
          h(v)["customize-headers"] ? N(g.$slots, "customize-headers", { key: 0 }) : D("", !0),
          V(ol, Z({
            headers: h(pe),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: h(tt),
            firstRightFixedColumn: h(at),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Rt.value,
            multipleSelectStatus: h($t),
            multiSort: h(te)
          }, {
            "is-multi-sorting": h(bt),
            "get-multi-sort-number": h(xt),
            "get-fixed-distance": nt,
            onHeaderClick: Bt,
            onToggleSelectAll: h(Pt)
          }), ge({ _: 2 }, [
            Q(g.$slots, (B, M) => ({
              name: M,
              fn: G((J) => [
                N(g.$slots, M, j(ne(J)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          P.value ? N(g.$slots, "body", j(Z({ key: 1 }, h(ue)))) : h(Ue).length ? (k(), w("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            N(g.$slots, "body-prepend", j(ne({
              items: h(ue),
              pagination: { isFirstPage: h($e), isLastPage: h(Ie), currentPaginationNumber: h(ie), maxPaginationNumber: h(Se), nextPage: h(Ne), prevPage: h(Fe) },
              headers: h(pe)
            }))),
            (k(!0), w(se, null, Q(h(ue), (B, M) => (k(), w(se, {
              key: B.key || M
            }, [
              V(sl, {
                item: B,
                index: M,
                columns: h(Ue),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "border-row": g.borderRow,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": h(Te).includes(M + Be.value),
                "is-disabled": Ee(B),
                "expand-column": h(z),
                "get-fixed-distance": nt,
                "get-fixed-column-classes": Ft,
                onClick: (J) => h(At)(J, B, M),
                onDblclick: (J) => h(Tt)(J, B, M),
                onContextmenu: (J) => h(Lt)(J, B),
                onToggleExpand: (J) => h(_e)(M, B, J),
                onToggleSelect: (J) => Mt(B)
              }, ge({ _: 2 }, [
                Q(g.$slots, (J, st) => ({
                  name: st,
                  fn: G((Et) => [
                    N(g.$slots, st, Z({ ref_for: !0 }, Et))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "border-row", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              R.value || h(Te).includes(M + Be.value) ? (k(), K(hl, {
                key: 0,
                item: B,
                index: M,
                "columns-count": h(pe).length,
                loading: B.expandLoading,
                "is-expanded": h(Te).includes(M + Be.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: G(() => [
                  N(g.$slots, "expand", Z({ ref_for: !0 }, B))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            N(g.$slots, "body-append", j(ne({
              items: h(ue),
              pagination: { isFirstPage: h($e), isLastPage: h(Ie), currentPaginationNumber: h(ie), maxPaginationNumber: h(Se), nextPage: h(Ne), prevPage: h(Fe), updatePage: h(we) },
              headers: h(pe)
            })))
          ], 2)) : D("", !0)
        ], 10, Ml),
        h(d) ? (k(), w("div", Al, [
          C("div", Tl, [
            N(g.$slots, "loading", {}, () => [
              V(Gt)
            ])
          ])
        ])) : D("", !0),
        !h(ue).length && !h(d) ? (k(), w("div", Ll, [
          N(g.$slots, "empty-message", {}, () => [
            Ae(W(g.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      V(Rl, Z({
        hideFooter: g.hideFooter,
        hideRowsPerPage: g.hideRowsPerPage,
        hidePaginationInfo: g.hidePaginationInfo,
        buttonsPagination: g.buttonsPagination,
        showShadow: h(ot),
        footerClassName: g.footerClassName,
        rowsPerPage: h(me),
        rowsItems: h(Je),
        rowsPerPageMessage: g.rowsPerPageMessage,
        rowsOfPageSeparatorMessage: g.rowsOfPageSeparatorMessage,
        currentPageFirstIndex: h(Xe),
        currentPageLastIndex: h(Ye),
        totalItemsLength: h(Ce),
        currentPaginationNumber: h(ie),
        maxPaginationNumber: h(Se),
        isFirstPage: h($e),
        isLastPage: h(Ie)
      }, {
        "onUpdate:rowsPerPage": h(Ge),
        onNextPage: h(Ne),
        onPrevPage: h(Fe),
        onUpdatePage: h(we)
      }), ge({ _: 2 }, [
        g.$slots["pagination-info"] ? {
          name: "pagination-info",
          fn: G((B) => [
            N(g.$slots, "pagination-info", j(ne(B)))
          ]),
          key: "0"
        } : void 0,
        g.$slots.pagination ? {
          name: "pagination",
          fn: G((B) => [
            N(g.$slots, "pagination", j(ne(B)))
          ]),
          key: "1"
        } : void 0
      ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]),
      He(V(ea, { progress: h(St) }, null, 8, ["progress"]), [
        [Oe, h(Ct)]
      ])
    ], 2));
  }
}), El = (e) => {
  e.component("DataTable", mt);
};
mt.install = El;
export {
  Ol as createFilter,
  mt as default,
  El as install
};
